import {
  AnchorProvider,
  BorshAccountsCoder,
  BorshEventCoder,
  BorshInstructionCoder,
  Idl,
  Program,
} from '@project-serum/anchor';
import { Commitment, Connection, PublicKey } from '@solana/web3.js';

import { Order, OrderSide } from '../models';
import { GmEventType, GmLogEvent, GmRegisteredCurrency } from '../types';
import { GmClientService } from './GmClientService';
import { getGmLogsIDL } from '../utils';
import { GmLogs } from '../types';

/**
 * Listens to events emitted by the Galactic Marketplace program and will call the registered
 * onEvent() callback function for each event.
 *
 * @param connection Solana connection
 * @param programId The Galactic Marketplace program PublicKey
 * @param commitment Optional Solana commitment level, defaults the `connection` commitment level
 */
export class GmEventService {
  protected connection: Connection;
  protected programId: PublicKey;
  protected commitment: Commitment;
  protected idl: Idl;
  protected provider: AnchorProvider;
  protected program: Program;
  protected registeredCurrencyInfo: {
    [key: string]: GmRegisteredCurrency;
  } = {};
  protected onEvent: (
    eventType: GmEventType,
    order: Order,
    slotContext: number
  ) => void;
  protected eventListeners: number[] = [];

  constructor(
    connection: Connection,
    programId: PublicKey,
    commitment?: Commitment
  ) {
    this.connection = connection;
    this.programId = programId;
    this.commitment = commitment || connection.commitment;

    this.handleOrderCreated = this.handleOrderCreated.bind(this);
    this.handleOrderExchanged = this.handleOrderExchanged.bind(this);
    this.handleOrderCanceled = this.handleOrderCanceled.bind(this);
  }

  async initialize(): Promise<void> {
    this.idl = getGmLogsIDL(this.programId) as Idl;

    this.provider = new AnchorProvider(this.connection, null, {
      commitment: this.commitment,
    });

    this.program = new Program(this.idl, this.programId, this.provider, {
      instruction: new BorshInstructionCoder(this.idl),
      accounts: new BorshAccountsCoder(this.idl),
      state: null,
      events: new BorshEventCoder(this.idl),
    });

    await this.setCurrencyInfo();

    const createId = this.program.addEventListener(
      GmLogs.InitializeMemo,
      this.handleOrderCreated
    );
    const exchangeId = this.program.addEventListener(
      GmLogs.ExchangeMemo,
      this.handleOrderExchanged
    );
    const cancelId = this.program.addEventListener(
      GmLogs.CancelOrderMemo,
      this.handleOrderCanceled
    );
    const registerCurrencyId = this.program.addEventListener(
      GmLogs.RegisterCurrencyMemo,
      this.handleCurrencyRegistered
    );

    this.eventListeners.push(
      createId,
      exchangeId,
      cancelId,
      registerCurrencyId
    );
  }

  async end(): Promise<void> {
    for (const listenerId of this.eventListeners) {
      await this.program.removeEventListener(listenerId);
    }

    this.eventListeners = [];
  }

  setEventHandler(
    handler: (eventType: GmEventType, order: Order, slotContext: number) => void
  ): void {
    this.onEvent = handler;
  }

  protected async setCurrencyInfo(): Promise<void> {
    const gmClientService = new GmClientService();

    const registeredCurrencyInfo =
      await gmClientService.getRegisteredCurrencies(
        this.connection,
        this.programId,
        true
      );

    for (const info of registeredCurrencyInfo) {
      this.registeredCurrencyInfo[info.mint] = info;
    }
  }

  protected getParsedOrderFromEvent(
    event: GmLogEvent,
    slotContext: number
  ): Order | null {
    const currencyInfo =
      this.registeredCurrencyInfo[event.currencyMint.toString()];

    if (!currencyInfo) return null;

    const { decimals: currencyDecimals } = currencyInfo;

    return new Order({
      id: event.orderId.toString(),
      orderType: event.orderSide === 0 ? OrderSide.Buy : OrderSide.Sell,
      orderMint: event.assetMint.toString(),
      currencyMint: event.currencyMint.toString(),
      currencyDecimals,
      price: event.price,
      orderQtyRemaining: event.orderRemainingQty.toNumber(),
      orderOriginationQty: event.orderOriginationQty.toNumber(),
      owner: event.orderInitializerPubkey.toString(),
      ownerAssetTokenAccount: event.initializerAssetTokenAccount.toString(),
      ownerCurrencyTokenAccount:
        event.initializerCurrencyTokenAccount.toString(),
      createdAt: event.createdAtTimestamp.toNumber(),
      slotContext,
    });
  }

  protected handleOrderCreated(event: GmLogEvent, slotContext: number): void {
    this.onEvent(
      GmEventType.orderAdded,
      this.getParsedOrderFromEvent(event, slotContext),
      slotContext
    );
  }

  protected handleOrderExchanged(event: GmLogEvent, slotContext: number): void {
    this.onEvent(
      GmEventType.orderModified,
      this.getParsedOrderFromEvent(event, slotContext),
      slotContext
    );
  }

  protected handleOrderCanceled(event: GmLogEvent, slotContext: number): void {
    this.onEvent(
      GmEventType.orderRemoved,
      this.getParsedOrderFromEvent(event, slotContext),
      slotContext
    );
  }

  protected async handleCurrencyRegistered(): Promise<void> {
    await this.setCurrencyInfo();
  }
}

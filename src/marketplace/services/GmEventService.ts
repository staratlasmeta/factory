import { AnchorProvider, BorshCoder, Idl, Program } from '@coral-xyz/anchor';
import { Commitment, Connection, PublicKey } from '@solana/web3.js';

import { Order, OrderSide } from '../models';
import { GmEventType, GmLogEvent, GmRegisteredCurrency } from '../types';
import { GmClientService } from './GmClientService';
import { getGmLogsIDL } from '../utils';
import { GmLogs } from '../types';

type BlockChainEvent = {
  eventType: GmEventType;
  order: Order;
  slotContext: number;
};

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
    slotContext: number,
  ) => void;
  protected eventListeners: number[] = [];

  protected queuedEvents: Array<BlockChainEvent> = [];

  constructor(
    connection: Connection,
    programId: PublicKey,
    commitment?: Commitment,
  ) {
    this.connection = connection;
    this.programId = programId;
    this.commitment = commitment || connection.commitment;

    this.handleOrderCreated = this.handleOrderCreated.bind(this);
    this.handleOrderExchanged = this.handleOrderExchanged.bind(this);
    this.handleOrderCanceled = this.handleOrderCanceled.bind(this);
    this.setCurrencyInfo = this.setCurrencyInfo.bind(this);
    this.handleCurrencyRegistered = this.handleCurrencyRegistered.bind(this);
  }

  async initialize(): Promise<void> {
    this.idl = getGmLogsIDL(this.programId) as Idl;

    this.provider = new AnchorProvider(this.connection, null, {
      commitment: this.commitment,
    });

    const coder = new BorshCoder(this.idl);

    this.program = new Program(this.idl, this.programId, this.provider, coder);

    await this.setCurrencyInfo();

    const createId = this.program.addEventListener(
      GmLogs.InitializeMemo,
      this.handleOrderCreated,
    );
    const exchangeId = this.program.addEventListener(
      GmLogs.ExchangeMemo,
      this.handleOrderExchanged,
    );
    const cancelId = this.program.addEventListener(
      GmLogs.CancelOrderMemo,
      this.handleOrderCanceled,
    );
    const registerCurrencyId = this.program.addEventListener(
      GmLogs.RegisterCurrencyMemo,
      this.handleCurrencyRegistered,
    );

    this.eventListeners.push(
      createId,
      exchangeId,
      cancelId,
      registerCurrencyId,
    );
  }

  async end(): Promise<void> {
    for (const listenerId of this.eventListeners) {
      await this.program.removeEventListener(listenerId);
    }

    this.eventListeners = [];

    this.onEvent = null;
  }

  setEventHandler(
    handler: (
      eventType: GmEventType,
      order: Order,
      slotContext: number,
    ) => void,
  ): void {
    this.onEvent = handler;
    for (const event of this.queuedEvents) {
      this.onEvent(event.eventType, event.order, event.slotContext);
    }
  }

  protected async setCurrencyInfo(): Promise<void> {
    const gmClientService = new GmClientService();

    const registeredCurrencyInfo =
      await gmClientService.getRegisteredCurrencies(
        this.connection,
        this.programId,
        true,
      );

    for (const info of registeredCurrencyInfo) {
      this.registeredCurrencyInfo[info.mint] = info;
    }
  }

  protected getParsedOrderFromEvent(
    event: GmLogEvent,
    slotContext: number,
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
    this.processEvent(
      GmEventType.orderAdded,
      this.getParsedOrderFromEvent(event, slotContext),
      slotContext,
    );
  }

  protected handleOrderExchanged(event: GmLogEvent, slotContext: number): void {
    this.processEvent(
      GmEventType.orderModified,
      this.getParsedOrderFromEvent(event, slotContext),
      slotContext,
    );
  }

  protected handleOrderCanceled(event: GmLogEvent, slotContext: number): void {
    this.processEvent(
      GmEventType.orderRemoved,
      this.getParsedOrderFromEvent(event, slotContext),
      slotContext,
    );
  }

  /**
   * Add this code to centralize specific error handling
   * @param eventType
   * @param order
   * @param slotContext
   * @protected
   */
  protected processEvent(
    eventType: GmEventType,
    order: Order,
    slotContext: number,
  ): void {
    if (!this.onEvent) {
      this.queuedEvents.push({
        eventType,
        order,
        slotContext,
      } as BlockChainEvent);
      return;
    }

    this.onEvent(eventType, order, slotContext);
  }

  protected async handleCurrencyRegistered(): Promise<void> {
    await this.setCurrencyInfo();
  }
}

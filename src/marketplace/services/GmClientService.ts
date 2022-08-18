import { BN } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';

import {
  createCancelOrderInstruction,
  createExchangeInstruction,
  createInitializeBuyOrderInstruction,
  createInitializeSellOrderInstruction,
} from '../instruction_builders';
import {
  getSingleOrder,
  getAllOpenOrders,
  getOpenOrdersForAsset,
  getOpenOrdersForCurrency,
  getOpenOrdersForPlayer,
  getOpenOrdersForPlayerAndAsset,
  getOpenOrdersForPlayerAndCurrency,
  getAllRegisteredCurrencies,
} from '../pda_getters';
import { OrderAccountItem } from '../types';
import { createTransactionFromInstructions } from './helpers';
import { getAssociatedTokenAddress } from '../../util';
import { Order, OrderSide } from '../models/Order';
import { GmRegisteredCurrency } from '../types';
import { ONE_MILLION } from './constants';
import { convertDecimalPriceToBn } from '../utils';

/**
 * Provides utility methods and transaction builders for interacting with the Galactic Marketplace.
 */
export class GmClientService {
  currencyInfo: GmRegisteredCurrency[] = [];

  /**
   * Returns information about all valid quote currencies registered with the Galactic Marketplace
   *
   * @param connection Solana Connection
   * @param programId Marketplace program PublicKey
   * @param invalidateCache Forces currency cache to be invalidated
   */
  async getRegisteredCurrencies(
    connection: Connection,
    programId: PublicKey,
    invalidateCache = false
  ): Promise<GmRegisteredCurrency[]> {
    if (this.currencyInfo?.length && !invalidateCache) return this.currencyInfo;

    const result: GmRegisteredCurrency[] = [];

    const currencyInfo = await getAllRegisteredCurrencies(
      connection,
      programId
    );

    for (const info of currencyInfo) {
      const { mint, royalty, saVault } = info;
      const tokenSupplylInformation = await connection.getTokenSupply(
        mint,
        'recent'
      );

      const { decimals } = tokenSupplylInformation.value;

      result.push({
        decimals,
        mint: mint.toString(),
        royaltyPercentageAsDecimal: royalty.toNumber() / ONE_MILLION,
        saVault: saVault.toString(),
      });
    }

    this.currencyInfo = result;

    return this.currencyInfo;
  }

  /**
   * Fetches all open orders from the Galactic Marketplace.
   *
   * @param connection Solana Connection
   * @param programId Marketplace program PublicKey
   */
  async getAllOpenOrders(
    connection: Connection,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getAllOpenOrders(connection, programId);
    const slotContext = await connection.getSlot();

    return this.accountItemsToOrders(
      connection,
      programId,
      openOrders,
      slotContext
    );
  }

  /**
   * Fetches all open orders for a player PublicKey.
   *
   * @param connection Solana Connection
   * @param playerPublicKey User PublicKey
   * @param programId Marketplace program PublicKey
   */
  async getOpenOrdersForPlayer(
    connection: Connection,
    playerPublicKey: PublicKey,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getOpenOrdersForPlayer(
      connection,
      playerPublicKey,
      programId
    );
    const slotContext = await connection.getSlot();

    return this.accountItemsToOrders(
      connection,
      programId,
      openOrders,
      slotContext
    );
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by currency.
   *
   * @param connection Solana Connection
   * @param currencyMint Currency mint - use `getAllGmRegisteredCurrencyInfo` for a list of valid currencies
   * @param programId Marketplace program PublicKey
   * @returns
   */
  async getOpenOrdersForCurrency(
    connection: Connection,
    currencyMint: PublicKey,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getOpenOrdersForCurrency(
      connection,
      currencyMint,
      programId
    );
    const slotContext = await connection.getSlot();

    return this.accountItemsToOrders(
      connection,
      programId,
      openOrders,
      slotContext
    );
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by asset.
   *
   * @param connection Solana Connection
   * @param assetMint The token PublicKey
   * @param programId Marketplace program PublicKey
   * @returns
   */
  async getOpenOrdersForAsset(
    connection: Connection,
    assetMint: PublicKey,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getOpenOrdersForAsset(
      connection,
      assetMint,
      programId
    );
    const slotContext = await connection.getSlot();

    return this.accountItemsToOrders(
      connection,
      programId,
      openOrders,
      slotContext
    );
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by asset.
   *
   * @param connection Solana Connection
   * @param playerPublicKey User PublicKey
   * @param currencyMint Currency mint - use `getAllGmRegisteredCurrencyInfo` for a list of valid currencies
   * @param programId Marketplace program PublicKey
   * @returns
   */
  async getOpenOrdersForPlayerAndCurrency(
    connection: Connection,
    playerPublicKey: PublicKey,
    currencyMint: PublicKey,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getOpenOrdersForPlayerAndCurrency(
      connection,
      playerPublicKey,
      currencyMint,
      programId
    );
    const slotContext = await connection.getSlot();

    return this.accountItemsToOrders(
      connection,
      programId,
      openOrders,
      slotContext
    );
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by asset.
   *
   * @param connection Solana Connection
   * @param playerPublicKey User PublicKey
   * @param assetMint The token PublicKey
   * @param programId Marketplace program PublicKey
   * @returns
   */
  async getOpenOrdersForPlayerAndAsset(
    connection: Connection,
    playerPublicKey: PublicKey,
    assetMint: PublicKey,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getOpenOrdersForPlayerAndAsset(
      connection,
      playerPublicKey,
      assetMint,
      programId
    );
    const slotContext = await connection.getSlot();

    return this.accountItemsToOrders(
      connection,
      programId,
      openOrders,
      slotContext
    );
  }

  /**
   * Fetch a single open order
   *
   * @param connection Solana Connection
   * @param orderAccount The `order.id` as PublicKey
   * @param programId Marketplace program PublicKey
   * @returns
   */
  async getOpenOrder(
    connection: Connection,
    orderAccount: PublicKey,
    programId: PublicKey
  ): Promise<Order> {
    const orderAccountInfo = await getSingleOrder(
      connection,
      orderAccount,
      programId
    );
    const orderAccountItem = {
      publicKey: orderAccount,
      account: orderAccountInfo,
    };
    const slotContext = await connection.getSlot();
    const [result] = await this.accountItemsToOrders(
      connection,
      programId,
      [orderAccountItem],
      slotContext
    );

    return result;
  }

  /**
   *
   * Get a Transaction to initialize either a buy or sell order
   *
   * @param connection Solana Connection
   * @param orderCreator Order creator
   * @param itemMint Item mint, e.g. Discovery of Iris
   * @param quoteMint The quote currency, e.g. ATLAS, USDC
   * @param quantity Self-explanatory
   * @param price The price of the item
   * @param programId Galactic Marketplace program ID
   * @param orderSide The order side from the perspective of the order creator
   */
  async getInitializeOrderTransaction(
    connection: Connection,
    orderCreator: PublicKey,
    itemMint: PublicKey,
    quoteMint: PublicKey,
    quantity: number,
    price: BN,
    programId: PublicKey,
    orderSide: OrderSide
  ): Promise<{
    transaction: Transaction;
    signers: Keypair[];
  }> {
    /** Default to sell order values */
    let orderMethod:
      | typeof createInitializeBuyOrderInstruction
      | typeof createInitializeSellOrderInstruction = createInitializeSellOrderInstruction;
    let depositMint: PublicKey = itemMint;
    let receiveMint: PublicKey = quoteMint;

    /** Overwrite with correct values if orderCreator is buying */
    if (orderSide === OrderSide.Buy) {
      orderMethod = createInitializeBuyOrderInstruction;
      depositMint = quoteMint;
      receiveMint = itemMint;
    }

    const initializerDepositTokenAccount = await getAssociatedTokenAddress(
      orderCreator,
      depositMint
    );

    const { ixSet } = await orderMethod({
      connection,
      depositMint,
      initializerDepositTokenAccount,
      initializerMainAccount: orderCreator,
      originationQty: quantity,
      price,
      programId,
      receiveMint,
    });

    const { signers, instructions } = ixSet;
    const transaction = createTransactionFromInstructions(instructions);

    return { transaction, signers };
  }

  async getBnPriceForCurrency(connection: Connection, uiPrice: number, quoteCurrency: PublicKey, programId: PublicKey): Promise<BN> {
    const allCurrencyInfo = await this.getRegisteredCurrencies(
      connection,
      programId
    );
    const { decimals } = allCurrencyInfo.find(
      (info) => info.mint.toString() === quoteCurrency.toString()
    );

    return convertDecimalPriceToBn(uiPrice, decimals);
  }

  /**
   *
   * @param connection Solana Connection
   * @param orderAccount The order account PublicKey (order ID)
   * @param orderInitializer The PublicKey which created the order
   * @param programId Galactic Marketplace program ID
   */
  async getCancelOrderTransaction(
    connection: Connection,
    orderAccount: PublicKey,
    orderInitializer: PublicKey,
    programId: PublicKey
  ): Promise<{
    transaction: Transaction;
    signers: Keypair[];
  }> {
    const { instructions, signers } = await createCancelOrderInstruction({
      connection,
      orderAccount,
      orderInitializer,
      programId,
    });

    const transaction = createTransactionFromInstructions(instructions);

    return { transaction, signers };
  }

  /**
   *
   * @param connection Solana Connection
   * @param orderAccount The order account PublicKey (order ID)
   * @param tokenMint The mint for the item being exchanged
   * @param purchaseQty Self-explanatory
   * @param orderTaker The PublicKey purchasing the order
   * @param programId Galactic Marketplace program ID
   */
  async getCreateExchangeTransaction(
    connection: Connection,
    order: Order,
    orderTaker: PublicKey,
    purchaseQty: number,
    programId: PublicKey,
    stakingProgramId: PublicKey,
    registeredStake: PublicKey,
    stakingAccount: PublicKey,
  ): Promise<{
    transaction: Transaction;
    signers: Keypair[];
  }> {
    const orderAccount = new PublicKey(order.id);
    const assetMint = new PublicKey(order.orderMint);
    const currencyMint = new PublicKey(order.currencyMint);
    const orderInitializer = new PublicKey(order.owner);

    const orderTakerDepositTokenAccount = await getAssociatedTokenAddress(
      orderTaker,
      order.orderType === OrderSide.Buy ? assetMint : currencyMint
    );

    const currencyInfo = await this.getRegisteredCurrencies(
      connection,
      programId
    );
    const { saVault } = currencyInfo.find(
      (curr) => curr.mint === order.currencyMint
    );

    const { instructions, signers } = await createExchangeInstruction({
      connection,
      orderAccount,
      purchaseQty,
      orderTaker,
      orderTakerDepositTokenAccount,
      programId,
      expectedPrice: order.price,
      orderType: order.orderType,
      assetMint,
      currencyMint,
      orderInitializer,
      saVault: new PublicKey(saVault),
      stakingProgramId,
      registeredStake,
      stakingAccount,
    });

    const transaction = createTransactionFromInstructions(instructions);

    return { transaction, signers };
  }

  async accountItemsToOrders(
    connection: Connection,
    programId: PublicKey,
    orderAccountItems: OrderAccountItem[],
    slotContext: number
  ): Promise<Order[]> {
    if (!orderAccountItems.length) return [];

    const currencyInfo = await this.getRegisteredCurrencies(
      connection,
      programId
    );

    return orderAccountItems.map((accountItem) => {
      const id = accountItem.publicKey.toString();
      const orderType =
        Object.keys(accountItem.account.orderSide)[0] === 'buy'
          ? OrderSide.Buy
          : OrderSide.Sell;
      const orderMint = accountItem.account.assetMint.toString();
      const currencyMint = accountItem.account.currencyMint.toString();
      const price = accountItem.account.price;
      const orderQtyRemaining =
        accountItem.account.orderRemainingQty.toNumber();
      const orderOriginationQty =
        accountItem.account.orderOriginationQty.toNumber();
      const owner = accountItem.account.orderInitializerPubkey.toString();
      const ownerAssetTokenAccount =
        accountItem.account.initializerAssetTokenAccount.toString();
      const ownerCurrencyTokenAccount =
        accountItem.account.initializerCurrencyTokenAccount.toString();
      const createdAt = accountItem.account.createdAtTimestamp.toNumber();

      const { decimals: currencyDecimals } = currencyInfo.find(
        (info) => info.mint.toString() === currencyMint
      );

      return new Order({
        id,
        orderType,
        orderMint,
        currencyMint,
        currencyDecimals,
        price,
        orderQtyRemaining,
        orderOriginationQty,
        owner,
        ownerAssetTokenAccount,
        ownerCurrencyTokenAccount,
        createdAt,
        slotContext,
      });
    });
  }
}

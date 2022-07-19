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

/**
 * Provides utility methods and transaction builders for interacting with the Galactic Marketplace.
 */
export class GmpClientService {
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
      const { mint, royalty } = info;
      const tokenSupplylInformation = await connection.getTokenSupply(
        mint,
        'recent'
      );

      const { decimals } = tokenSupplylInformation.value;

      result.push({
        decimals,
        mint: mint.toString(),
        royaltyPercentageAsDecimal: royalty.toNumber() / ONE_MILLION,
      });
    }

    this.currencyInfo = result;

    return this.currencyInfo;
  }

  /**
   * Fetches all open orders from the Galactic Marketplace.
   * Orders are automatically parsed to the `Order` class
   * and price information is converted into the "UI price" - no decimal adjustment needed.
   *
   * @param connection Solana Connection
   * @param programId Marketplace program PublicKey
   */
  async getAllOpenOrders(
    connection: Connection,
    programId: PublicKey
  ): Promise<Order[]> {
    const openOrders = await getAllOpenOrders(connection, programId);

    return this.accountItemsToOrders(connection, programId, openOrders);
  }

  /**
   * Fetches all open orders for a player PublicKey.
   * Orders are automatically parsed to the `Order` class
   * and price information is converted into the "UI price" - no decimal adjustment needed.
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

    return this.accountItemsToOrders(connection, programId, openOrders);
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by currency.
   * Orders are automatically parsed to the `Order` class
   * and price information is converted into the "UI price" - no decimal adjustment needed.
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

    return this.accountItemsToOrders(connection, programId, openOrders);
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by asset.
   * Orders are automatically parsed to the `Order` class
   * and price information is converted into the "UI price" - no decimal adjustment needed.
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

    return this.accountItemsToOrders(connection, programId, openOrders);
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by asset.
   * Orders are automatically parsed to the `Order` class
   * and price information is converted into the "UI price" - no decimal adjustment needed.
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

    return this.accountItemsToOrders(connection, programId, openOrders);
  }

  /**
   * Fetches all open orders from the Galactic Marketplace filtered by asset.
   * Orders are automatically parsed to the `Order` class
   * and price information is converted into the "UI price" - no decimal adjustment needed.
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

    return this.accountItemsToOrders(connection, programId, openOrders);
  }

  /**
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
    const [result] = await this.accountItemsToOrders(
      connection,
      programId,
      [orderAccountItem]
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
   * @param price The actual price of the item. Decimal places will be adjusted automatically for the currency.
   * @param programId Galactic Marketplace program ID
   * @param orderSide The order side from the perspective of the order creator
   */
  async getInitializeOrderTransaction(
    connection: Connection,
    orderCreator: PublicKey,
    itemMint: PublicKey,
    quoteMint: PublicKey,
    quantity: number,
    price: number,
    programId: PublicKey,
    orderSide: OrderSide
  ): Promise<{
    transaction: Transaction;
    signers: Keypair[];
  }> {
    const allCurrencyInfo = await this.getRegisteredCurrencies(
      connection,
      programId
    );
    const { decimals } = allCurrencyInfo.find(
      (info) => info.mint.toString() === quoteMint.toString()
    );

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
      price: new BN(price * 10 ** decimals),
      programId,
      receiveMint,
    });

    const { signers, instructions } = ixSet;
    const transaction = createTransactionFromInstructions(instructions);

    return { transaction, signers };
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
    programId: PublicKey
  ): Promise<{
    transaction: Transaction;
    signers: Keypair[];
  }> {
    const orderAccount = new PublicKey(order.id);
    const tokenMint = new PublicKey(order.orderMint);
    const currencyMint = new PublicKey(order.currencyMint);

    const orderTakerDepositTokenAccount = await getAssociatedTokenAddress(
      orderTaker,
      order.orderType === OrderSide.Buy ? tokenMint : currencyMint
    );

    const { instructions, signers } = await createExchangeInstruction({
      connection,
      orderAccount,
      purchaseQty,
      orderTaker,
      orderTakerDepositTokenAccount,
      programId,
    });

    const transaction = createTransactionFromInstructions(instructions);

    return { transaction, signers };
  }

  async accountItemsToOrders(
    connection: Connection,
    programId: PublicKey,
    orderAccountItems: OrderAccountItem[]
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
      const price = accountItem.account.price.toNumber();
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

      const { decimals } = currencyInfo.find(
        (info) => info.mint.toString() === currencyMint
      );

      return new Order({
        id,
        orderType,
        orderMint,
        currencyMint,
        price: price / 10 ** decimals,
        orderQtyRemaining,
        orderOriginationQty,
        owner,
        ownerAssetTokenAccount,
        ownerCurrencyTokenAccount,
        createdAt,
      });
    });
  }
}

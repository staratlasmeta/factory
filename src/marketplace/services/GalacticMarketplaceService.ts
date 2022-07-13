import { queueProcessor, IDisposer } from 'mobx-utils';
import { pull } from 'lodash';
import { Commitment, Connection, PublicKey } from '@solana/web3.js';

import { OrderCacheService } from './OrderCacheService';
import { Order } from '../models/Order';
import {
  GalacticMarketPlaceEventHandler,
  GalacticMarketPlaceEventType,
} from '../types';
import { GmpClientService } from './GmpClientService';
import { GmpEventService } from './GmpEventService';

/**
 * Establishes a connection to the Galactic Marketplace and maintains an up-to-date
 * real time snapshot of all open marketplace orders.
 *
 * @param rpcUrl Solana RPC Provider Url
 * @param programId The Galactic Marketplace program PublicKey
 * @param commitment Optional Solana commitment level, defaults to `confirmed`
 */
export class GalacticMarketplaceService {
  protected static commitment: Commitment = 'confirmed';

  protected connection: Connection;
  protected marketplaceProgramId: PublicKey;
  protected orderCacheService: OrderCacheService;
  protected gmpClientService: GmpClientService = new GmpClientService();
  protected gmpEventService: GmpEventService;
  protected eventCallBacks: Array<GalacticMarketPlaceEventHandler> = [];
  protected changeObserverDisposer: IDisposer = null;

  constructor(rpcUrl: string, programId: PublicKey, commitment?: Commitment) {
    this.orderCacheService = new OrderCacheService();
    this.gmpClientService = new GmpClientService();

    this.connection = new Connection(
      rpcUrl,
      commitment || GalacticMarketplaceService.commitment
    );
    this.marketplaceProgramId = programId;
    this.gmpEventService = new GmpEventService(
      this.connection,
      this.marketplaceProgramId
    );

    this.handleMarketplaceEvent = this.handleMarketplaceEvent.bind(this);
  }

  async initialize(): Promise<number> {
    await this.gmpEventService.initialize();

    this.changeObserverDisposer = queueProcessor(
      this.orderCacheService.orderChanges,
      (event) => {
        this.eventCallBacks.forEach((callBackHandler) =>
          callBackHandler.onEvent(event)
        );
      },
      250
    );

    this.gmpEventService.setEventHandler(this.handleMarketplaceEvent);

    await this.loadInitialOrders();

    return this.orderCacheService.mints.length;
  }

  async end(): Promise<boolean> {
    this.eventCallBacks = [];
    this.changeObserverDisposer = null;

    return true;
  }

  public addOnEventHandler(
    eventHandler: GalacticMarketPlaceEventHandler
  ): void {
    this.eventCallBacks.push(eventHandler);
  }

  public removeOnEventHandler(
    eventHandler: GalacticMarketPlaceEventHandler
  ): void {
    pull(this.eventCallBacks, eventHandler);
  }

  public async loadInitialOrders(): Promise<number> {
    try {
      const orders = await this.gmpClientService.getAllOpenOrders(
        this.connection,
        this.marketplaceProgramId
      );

      for (const order of orders) {
        this.addOrderToCache(order);
      }
    } catch (error) {
      console.log(error);
    }

    return this.orderCacheService.getAllOrdersCache().size;
  }

  addOrderToCache(order: Order): Order {
    return this.orderCacheService.addOrder(order);
  }

  removeOrderFromCache(order: Order): boolean {
    return this.orderCacheService.cancelOrder(order);
  }

  updateOrderInCache(order: Order): Order {
    return this.orderCacheService.updateOrder(order);
  }

  getBuyOrders(): Map<string, Map<string, Order>> {
    return this.orderCacheService.buyOrdersCache;
  }

  getBuyOrdersForMint(mint: string): Map<string, Order> {
    return this.orderCacheService.buyOrdersCache.get(mint);
  }

  getSellOrders(): Map<string, Map<string, Order>> {
    return this.orderCacheService.sellOrdersCache;
  }

  getSellOrdersForMint(mint: string): Map<string, Order> {
    return this.orderCacheService.sellOrdersCache.get(mint);
  }

  getOrdersByType(orderType: 'buy' | 'sell'): Map<string, Map<string, Order>> {
    return orderType === 'buy' ? this.getBuyOrders() : this.getSellOrders();
  }

  getBuyOrdersByCurrencyAndItem(
    currencyMint: string,
    itemMint: string
  ): Order[] {
    const ordersForMint = this.getBuyOrdersForMint(itemMint);

    if (!ordersForMint) return [];

    const orders = [...ordersForMint.values()];

    if (!orders.length) return [];

    return this.filterOrdersByCurrency(currencyMint, orders);
  }

  getSellOrdersByCurrencyAndItem(
    currencyMint: string,
    itemMint: string
  ): Order[] {
    const ordersForMint = this.getSellOrdersForMint(itemMint);

    if (!ordersForMint) return [];

    const orders = [...ordersForMint.values()];

    if (!orders.length) return [];

    return this.filterOrdersByCurrency(currencyMint, orders);
  }

  protected filterOrdersByCurrency(
    currencyMint: string,
    orders: Order[]
  ): Order[] {
    if (!orders.length) return [];

    return orders.filter((order) => order.currencyMint === currencyMint);
  }

  getOrdersById(id: string): Order {
    return { ...this.orderCacheService.getOrderById(id) };
  }

  getAllOrdersByItemMint(mint: string): Map<string, Order> {
    const map = new Map();

    const sellOrdersForMint = this.getSellOrdersForMint(mint);
    const buyOrdersForMint = this.getBuyOrdersForMint(mint);

    if (sellOrdersForMint) {
      for (const order of sellOrdersForMint.values()) {
        map.set(order.id, order);
      }
    }

    if (buyOrdersForMint) {
      for (const order of buyOrdersForMint.values()) {
        map.set(order.id, order);
      }
    }

    return map;
  }

  getAllMints(): string[] {
    return this.orderCacheService.mints;
  }

  getAllOrdersForUserAddress(publicKey: string): Order[] {
    const allOrders = this.orderCacheService.getAllOrdersCache();
    const allOrdersValues = Array.from(allOrders.values());
    const ordersFilteredByOwner = allOrdersValues.filter(
      (order) => order.owner === publicKey
    );

    return ordersFilteredByOwner;
  }

  protected handleOrderAddedEvent(order: Order): void {
    this.addOrderToCache(order);
  }

  protected handleOrderModifiedEvent(order: Order): void {
    if (order.orderQtyRemaining === 0) {
      this.removeOrderFromCache(order);
      return;
    }

    this.updateOrderInCache(order);
  }

  protected handleOrderCanceledEvent(order: Order): void {
    this.removeOrderFromCache(order);
  }

  protected handleMarketplaceEvent(
    eventType: GalacticMarketPlaceEventType,
    order: Order
  ): void {
    if (!order) return;

    switch (eventType) {
      case GalacticMarketPlaceEventType.orderAdded:
        this.handleOrderAddedEvent(order);
        break;
      case GalacticMarketPlaceEventType.orderModified:
        this.handleOrderModifiedEvent(order);
        break;
      case GalacticMarketPlaceEventType.orderRemoved:
        this.handleOrderCanceledEvent(order);
        break;
      default:
        break;
    }
  }
}

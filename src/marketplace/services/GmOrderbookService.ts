import { queueProcessor, IDisposer } from 'mobx-utils';
import { pull } from 'lodash';
import { Connection, PublicKey } from '@solana/web3.js';

import { OrderCacheService } from './OrderCacheService';
import { Order } from '../models';
import { GmEventHandler, GmEventType } from '../types';
import { GmClientService } from './GmClientService';
import { GmEventService } from './GmEventService';

/**
 * Establishes a connection to the Galactic Marketplace and maintains an up-to-date
 * real time snapshot of all open marketplace orders.
 *
 * @param rpcUrl Solana RPC Provider Url
 * @param programId The Galactic Marketplace program PublicKey
 * @param commitment Optional Solana commitment level, defaults to `confirmed`
 */
export class GmOrderbookService {
  private static HEALTH_CHECK_RATE = 5000;

  protected connection: Connection;
  protected marketplaceProgramId: PublicKey;
  protected orderCacheService: OrderCacheService;
  protected gmClientService: GmClientService = new GmClientService();
  protected gmEventService: GmEventService;
  protected eventCallBacks: Array<GmEventHandler> = [];
  protected changeObserverDisposer: IDisposer = null;

  protected healthcheckTimer: NodeJS.Timer;
  protected lastEventTimestamp = this.getNow();
  protected healthcheckThreshold: number;
  protected isReloading = false;

  constructor(
    connection: Connection,
    programId: PublicKey,
    healthcheckThresholdSeconds = 60
  ) {
    this.connection = connection;
    this.marketplaceProgramId = programId;
    this.healthcheckThreshold = healthcheckThresholdSeconds;

    this.orderCacheService = new OrderCacheService();
    this.gmClientService = new GmClientService();
    this.gmEventService = new GmEventService(
      this.connection,
      this.marketplaceProgramId
    );

    this.handleMarketplaceEvent = this.handleMarketplaceEvent.bind(this);
  }

  async initialize(): Promise<number> {
    await this.gmEventService.initialize();

    this.changeObserverDisposer = queueProcessor(
      this.orderCacheService.orderChanges,
      (event) => {
        this.eventCallBacks.forEach((callBackHandler) =>
          callBackHandler.onEvent(event)
        );
      },
      250
    );

    this.gmEventService.setEventHandler(this.handleMarketplaceEvent);

    await this.loadInitialOrders();

    this.healthcheckTimer = setInterval(() => {
      const isHealthy = this.getIsServiceHealthy();

      if (!isHealthy && !this.isReloading) this.resetOrdersData();
    }, GmOrderbookService.HEALTH_CHECK_RATE);

    return this.orderCacheService.mints.length;
  }

  async end(): Promise<boolean> {
    await this.gmEventService.end();

    this.eventCallBacks = [];
    this.changeObserverDisposer = null;

    return true;
  }

  protected getIsServiceHealthy(): boolean {
    const now = this.getNow();
    const secondsSinceLastEvent = now - this.lastEventTimestamp;

    return secondsSinceLastEvent <= this.healthcheckThreshold;
  }

  protected async resetOrdersData(): Promise<void> {
    if (this.isReloading) return;

    this.isReloading = true;

    await this.resetEventService();
    await this.refetchOrderData();

    this.lastEventTimestamp = this.getNow();
    this.isReloading = false;
  }

  protected async resetEventService(): Promise<void> {
    await this.gmEventService.end();

    this.gmEventService = new GmEventService(
      this.connection,
      this.marketplaceProgramId
    );

    this.gmEventService.setEventHandler(this.handleMarketplaceEvent);

    await this.gmEventService.initialize();
  }

  protected async refetchOrderData(): Promise<void> {
    const existingOrders = this.orderCacheService.getAllOrdersCache();

    try {
      const slot = await this.connection.getSlot("confirmed");
      const fetchedOffers = await this.gmClientService.getAllOpenOrders(
        this.connection,
        this.marketplaceProgramId
      );
      const fetchedOffersMap = new Map<string, Order>();

      for (const order of fetchedOffers) {
        /** Set new order values in a temporary map for faster read times */
        fetchedOffersMap.set(order.id, order);

        const existingOffer = existingOrders.get(order.id);

        if (!existingOffer) {
          this.addOrderToCache(order);
        } else if (
          existingOffer &&
          existingOffer.orderQtyRemaining !== order.orderQtyRemaining
        ) {
          this.updateOrderInCache(order);
        }
      }

      /** Remove offers which exist in the local cache, but not in the freshly fetched offers */
      for (const existingOffer of Array.from(existingOrders.values())) {
        if (
          existingOffer.slotContext < slot &&
          !fetchedOffersMap.get(existingOffer.id)
        ) {
          this.removeOrderFromCache(existingOffer);
        }
      }
    } catch (error) {
      console.log("There was an error refreshing all marketplace data", error);
    }
  }

  public addOnEventHandler(eventHandler: GmEventHandler): void {
    this.eventCallBacks.push(eventHandler);
  }

  public removeOnEventHandler(eventHandler: GmEventHandler): void {
    pull(this.eventCallBacks, eventHandler);
  }

  public async loadInitialOrders(): Promise<number> {
    try {
      const orders = await this.gmClientService.getAllOpenOrders(
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

  getOrdersByType(orderType: "buy" | "sell"): Map<string, Map<string, Order>> {
    return orderType === "buy" ? this.getBuyOrders() : this.getSellOrders();
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

  getOrderById(id: string): Order {
    return this.orderCacheService.getOrderById(id);
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

  protected handleMarketplaceEvent(eventType: GmEventType, order: Order): void {
    if (!order) return;

    this.lastEventTimestamp = this.getNow();

    switch (eventType) {
      case GmEventType.orderAdded:
        this.handleOrderAddedEvent(order);
        break;
      case GmEventType.orderModified:
        this.handleOrderModifiedEvent(order);
        break;
      case GmEventType.orderRemoved:
        this.handleOrderCanceledEvent(order);
        break;
      default:
        break;
    }
  }

  protected getNow(): number {
    return new Date().getTime() / 1000;
  }
}

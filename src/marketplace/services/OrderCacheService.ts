import { clone, union } from 'lodash';
import {
  makeObservable,
  makeAutoObservable,
  computed,
  observable,
  runInAction,
} from 'mobx';

import { Order, OrderSide } from '../models/Order';
import { GmChangeEvent, GmEventType } from '../types';

type OrderCache = Map<string, Map<string, Order>>;
type ObservableData = {
  buyOrdersCache: OrderCache;
  sellOrdersCache: OrderCache;
};

/**
 * An opinionated service to maintain a performant caching layer of Order data.
 * This is implemented by `GmOrderbookService`.
 */
export class OrderCacheService {
  protected endTriggered = false;
  protected observableData: ObservableData = {
    buyOrdersCache: new Map<string, Map<string, Order>>(),
    sellOrdersCache: new Map<string, Map<string, Order>>(),
  };
  public orderChanges = observable<GmChangeEvent>([]);

  constructor() {
    this.observableData = makeAutoObservable(this.observableData);

    makeObservable(this, {
      buyOrdersCache: computed,
      sellOrdersCache: computed,
      allOrdersCache: computed,
    });
  }

  get buyOrdersCache(): OrderCache {
    return this.observableData.buyOrdersCache;
  }

  get sellOrdersCache(): OrderCache {
    return this.observableData.sellOrdersCache;
  }

  get allOrdersCache(): Map<string, Order> {
    const map = new Map<string, Order>();

    this.buyOrdersCache.forEach((ordersForMint) => {
      ordersForMint.forEach((order, key) => {
        map.set(key, order);
      });
    });

    this.sellOrdersCache.forEach((ordersForMint) => {
      ordersForMint.forEach((order, key) => {
        map.set(key, order);
      });
    });

    return map;
  }

  get mints(): string[] {
    return union(
      Array.from(this.buyOrdersCache.keys()),
      Array.from(this.sellOrdersCache.keys())
    );
  }

  get orders(): Map<string, Order> {
    return this.allOrdersCache;
  }

  get buyOrders(): Map<string, Order> {
    const map = new Map<string, Order>();

    this.buyOrdersCache.forEach((ordersForMint) => {
      ordersForMint.forEach((order) => {
        map.set(order.id, order);
      });
    });

    return map;
  }

  get sellOrders(): Map<string, Order> {
    const map = new Map<string, Order>();

    this.sellOrdersCache.forEach((ordersForMint) => {
      ordersForMint.forEach((order) => {
        map.set(order.id, order);
      });
    });

    return map;
  }

  clearOrders(): void {
    const { allOrdersCache } = this;

    allOrdersCache.forEach((order) => {
      runInAction(() => {
        this.orderChanges.push({
          eventType: GmEventType.orderRemoved,
          order,
        });
      });
    });

    this.buyOrdersCache.clear();
    this.sellOrdersCache.clear();
  }

  getAllOrdersCache(): Map<string, Order> {
    return this.allOrdersCache;
  }

  getOrderCacheByType(type: OrderSide): OrderCache {
    return type === OrderSide.Buy
      ? this.getBuyOrderCache()
      : this.getSellOrderCache();
  }

  getBuyOrderCache(): OrderCache {
    return new Map(this.buyOrdersCache);
  }

  getSellOrderCache(): OrderCache {
    return new Map(this.sellOrdersCache);
  }

  getOrderById(id: string): Order {
    return this.allOrdersCache.get(id);
  }

  addOrder(order: Order): Order {
    const ordersForType = this.getOrdersForType(order.orderType);

    if (!ordersForType.get(order.orderMint)) {
      ordersForType.set(order.orderMint, new Map<string, Order>());
    }

    const ordersForMint = ordersForType.get(order.orderMint);
    const existingOrder = ordersForMint.get(order.id);

    if (existingOrder && existingOrder.slotContext > order.slotContext) {
      return existingOrder;
    }

    ordersForMint.set(order.id, order);

    runInAction(() => {
      this.orderChanges.push({
        eventType: GmEventType.orderAdded,
        order,
      });
    });

    return order;
  }

  updateOrder(order: Order): Order {
    const ordersForType = this.getOrdersForType(order.orderType);
    const ordersForMint = ordersForType.get(order.orderMint);
    const existingOrder = ordersForMint.get(order.id);

    if (!existingOrder) return;

    if (
      existingOrder.orderQtyRemaining !== order.orderQtyRemaining &&
      order.slotContext > existingOrder.slotContext
    ) {
      const orderClone = clone(existingOrder);

      orderClone.orderQtyRemaining = order.orderQtyRemaining;
      ordersForMint.set(order.id, orderClone);

      runInAction(() => {
        this.orderChanges.push({
          eventType: GmEventType.orderModified,
          order,
        });
      });
    }

    return order;
  }

  cancelOrder(order: Order): boolean {
    const ordersForType = this.getOrdersForType(order.orderType);
    const ordersForMint = ordersForType.get(order.orderMint);

    const removed = ordersForMint.delete(order.id);

    if (removed) {
      runInAction(() => {
        this.orderChanges.push({
          eventType: GmEventType.orderRemoved,
          order,
        });
      });

      return true;
    }

    return false;
  }

  protected getOrdersForType(orderType: OrderSide): OrderCache {
    if (orderType === OrderSide.Buy) {
      return this.buyOrdersCache;
    }

    return this.sellOrdersCache;
  }
}

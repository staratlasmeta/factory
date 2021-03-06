import { makeObservable, observable } from 'mobx';

export enum OrderSide {
  Buy = 'buy',
  Sell = 'sell',
}

export type OrderType = {
  id: string;
  orderType: OrderSide;
  orderMint: string;
  currencyMint: string;
  price: number;
  orderOriginationQty: number;
  orderQtyRemaining: number;
  owner: string;
  ownerAssetTokenAccount: string;
  ownerCurrencyTokenAccount: string;
  createdAt: number;
  slotContext: number;
};

export class Order implements OrderType {
  id = '';
  orderType: OrderSide = OrderSide.Buy;
  orderMint = '';
  currencyMint = '';
  price = 0;
  orderQtyRemaining = 0;
  orderOriginationQty = 0;
  owner = '';
  ownerAssetTokenAccount = '';
  ownerCurrencyTokenAccount = '';
  createdAt = 0;
  slotContext = 0;

  constructor(order?: OrderType) {
    if (order) {
      this.id = order.id;
      this.orderType = order.orderType;
      this.orderMint = order.orderMint;
      this.currencyMint = order.currencyMint;
      this.price = order.price;
      this.orderQtyRemaining = order.orderQtyRemaining;
      this.orderOriginationQty = order.orderOriginationQty;
      this.owner = order.owner;
      this.ownerAssetTokenAccount = order.ownerAssetTokenAccount;
      this.ownerCurrencyTokenAccount = order.ownerCurrencyTokenAccount;
      this.createdAt = order.createdAt;
      this.slotContext = order.slotContext;
    }

    makeObservable(this, {
      orderQtyRemaining: observable,
    });
  }
}

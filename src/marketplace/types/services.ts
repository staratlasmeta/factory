import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

import { Order } from '../models';

export enum GmEventType {
  orderAdded,
  orderRemoved,
  orderModified,
}

export interface GmChangeEvent {
  eventType: GmEventType;
  order: Order;
}

export interface GmEventHandler {
  onEvent: (orderEvent: GmChangeEvent) => void;
}

export type GmRegisteredCurrency = {
  mint: string;
  decimals: number;
  royaltyPercentageAsDecimal: number;
  saVault: string;
};

export type GmLogEvent = {
  orderInitializerPubkey: PublicKey;
  currencyMint: PublicKey;
  assetMint: PublicKey;
  initializerCurrencyTokenAccount: PublicKey;
  initializerAssetTokenAccount: PublicKey;
  orderSide: 0 | 1;
  price: BN;
  orderOriginationQty: BN;
  orderRemainingQty: BN;
  createdAtTimestamp: BN;
  orderId: PublicKey;
};

export type GmCurrencyLogEvent = {
  updateAuthorityAccount: PublicKey;
  registeredCurrency: PublicKey;
  currencyMint: PublicKey;
  saCurrencyVault: PublicKey;
  royalty: BN;
  timestamp: BN;
};

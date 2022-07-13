import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

import { Order } from '../models';

export enum GalacticMarketPlaceEventType {
  orderAdded,
  orderRemoved,
  orderModified,
}

export interface GalacticMarketPlaceChangeEvent {
  eventType: GalacticMarketPlaceEventType;
  order: Order;
}

export interface GalacticMarketPlaceEventHandler {
  onEvent: (orderEvent: GalacticMarketPlaceChangeEvent) => void;
}

export type RegisteredCurrency = {
  mint: string;
  decimals: number;
  royaltyPercentageAsDecimal: number;
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


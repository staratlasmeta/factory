import { BN, web3 } from '@project-serum/anchor';
import type { AnchorTypes } from '../../anchor/types';

export interface MarketVarsInfo {
  updateAuthorityMaster: web3.PublicKey;
}

import * as GM_TYPES from './gmIdl';

export type GM_PROGRAM = GM_TYPES.GmIdl;
export type GmTypes = AnchorTypes<GM_PROGRAM>;
type Account = GmTypes['Accounts'];

export type FeeExemptInfo = Account['FeeReduction'];
export type MarketVarsAccountInfo = Account['MarketVars'];
export type OpenOrdersCounterInfo = Account['OpenOrdersCounter'];
export type OrderAccountInfo = Account['OrderAccount'];
export type RegisteredCurrencyInfo = Account['RegisteredCurrency'];

export interface OrderAccountItem {
  publicKey: web3.PublicKey;
  account: OrderAccountInfo;
}

export type RegisteredCurrencyItem = {
  mint: web3.PublicKey;
  royalty: BN;
  saVault: web3.PublicKey;
};

export type RoyaltyTier = {
  stakeAmount: BN;
  discount: BN;
};

export type RoyaltyTiers = [RoyaltyTier];

export interface FeeExemptItem {
  publicKey: web3.PublicKey;
  account: FeeExemptInfo;
}

export enum GmLogs {
  CancelOrderMemo = 'CancelOrderMemo',
  ExchangeMemo = 'ExchangeMemo',
  InitializeMemo = 'InitializeMemo',
  RegisterCurrencyMemo = 'RegisterCurrencyMemo',
}

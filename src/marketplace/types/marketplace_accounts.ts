import { web3 } from '@project-serum/anchor';
import type { AnchorTypes } from '@saberhq/anchor-contrib';
export interface MarketVarsInfo {
updateAuthorityMaster: web3.PublicKey,
}
import * as GM_TYPES from './gmIdl';

export type GM_PROGRAM = GM_TYPES.GmIdl;
export type GmTypes = AnchorTypes<GM_PROGRAM>;
type Account = GmTypes['Accounts'];

export type MarketVarsAccountInfo = Account['MarketVars'];
export type OpenOrdersCounterInfo = Account['OpenOrdersCounter'];
export type OrderAccountInfo = Account['OrderAccount'];
export type RegisteredCurrencyInfo = Account['RegisteredCurrency'];

export interface OrderAccountItem {
    publicKey: web3.PublicKey;
    account: OrderAccountInfo;
}

export interface OrderSide {
    Buy,
    Sell
}

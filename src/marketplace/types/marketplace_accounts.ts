import {
    BN,
    web3,
} from '@project-serum/anchor';
export interface MarketVarsInfo {
updateAuthorityMaster: web3.PublicKey,
}

export interface RegisteredCurrencyInfo {
tokenMint: web3.PublicKey,
saCurrencyVault: web3.PublicKey,
royalty: BN,
}

export interface OrderAccountInfo {
    orderInitializerPubkey: web3.PublicKey,
    currencyMint: web3.PublicKey,
    assetMint: web3.PublicKey,
    initializerCurrencyTokenAccount: web3.PublicKey,
    initializerAssetTokenAccount: web3.PublicKey,
    orderSide: OrderSide,
    price: BN,
    orderOriginationQty: BN,
    orderRemainingQty: BN,
    createdAtTimestamp: BN,
}

export interface OrderSide {
    Buy,
    Sell
}

import {
    BN,
    web3
} from '@project-serum/anchor';
import {
    getMarketplaceProgram,
    getOrderSide,
} from '../utils';
import { getOrderVault } from '../pda_getters/pda_getters';
import { BaseParams } from './BaseParams';
import {
    getRegisteredCurrencyAccountInfo,
    getOpenOrdersCounter,
} from '../pda_getters';

/**  Params for Exchange instruction */
export interface exchangeOrderParams extends BaseParams {
    orderAccount: web3.PublicKey
    purchaseQty: number
    orderTaker: web3.PublicKey
    orderTakerDepositTokenAccount: web3.PublicKey
    orderTakerReceiveTokenAccount: web3.PublicKey
    openOrdersCounter: web3.PublicKey
}

/**
 * Creates an instruction which exchanges tokens between offer initializer and offer taker to satisfy the exchange detailed in offerAccount
 *
 * @param connection
 * @param orderAccount - an initialized orderAccount
 * @param purchaseQty - Number of items to be purchased
 * @param orderTaker - Public key of the order taker
 * @param orderTakerDepositTokenAccount - Public key of token account for token being sent by taker
 * @param orderTakerReceiveTokenAccount - Public key of token account for token being received by taker
 * @param programId - Deployed program ID for GM program
 */
export async function createExchangeInstruction ({
    connection,
    orderAccount,
    purchaseQty,
    orderTaker,
    orderTakerDepositTokenAccount,
    orderTakerReceiveTokenAccount,
    programId,
}: exchangeOrderParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getMarketplaceProgram({connection, programId})

    const orderAccountInfo = await program.account.orderAccount.fetch(orderAccount);
    const registeredCurrencyInfo = await getRegisteredCurrencyAccountInfo(connection, programId, orderAccountInfo.currencyMint);

    const orderSide = getOrderSide(orderAccountInfo);
    const depositMint = (orderSide === 'SellSide') ? orderAccountInfo.assetMint : orderAccountInfo.currencyMint;
    const initializerDepositTokenAccount = (orderSide === 'SellSide') ? orderAccountInfo.initializerAssetTokenAccount : orderAccountInfo.initializerCurrencyTokenAccount;
    const initializerReceiveTokenAccount = (orderSide === 'SellSide') ? orderAccountInfo.initializerCurrencyTokenAccount : orderAccountInfo.initializerAssetTokenAccount;
    const [orderVaultAccount] = await getOrderVault(orderAccountInfo.orderInitializerPubkey, depositMint, programId);
    const [openOrdersCounter] = await getOpenOrdersCounter(orderAccountInfo.orderInitializerPubkey, depositMint, programId);

    const instructions = [
        await program.methods
            .processExchange(new BN(purchaseQty))
            .accounts({
                orderTaker,
                orderTakerDepositTokenAccount,
                orderTakerReceiveTokenAccount,
                currencyMint: orderAccountInfo.currencyMint,
                assetMint: orderAccountInfo.assetMint,
                orderInitializer: orderAccountInfo.orderInitializerPubkey,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderVaultAccount,
                orderAccount,
                openOrdersCounter,
                saVault: registeredCurrencyInfo.saCurrencyVault,
            })
            .instruction()
    ];

    return {
        accounts: [],
        instructions
    }
}

import {
    BN,
    web3
} from '@project-serum/anchor';
import {
    getMarketplaceProgram,
    getOrderSide,
} from '../utils';
import { OrderAccountInfo } from '../types/marketplace_accounts';
import { getOrderVault } from '../pda_getters/pda_getters';
import { BaseParams } from './BaseParams';
import {
    getRegisteredCurrencyAccountInfo,
    getOpenOrdersCounter,
} from '../pda_getters';
import { FactoryReturn } from '../../types';
import { getTokenAccount } from '../../util';

/**  Params for Exchange instruction */
export interface ExchangeOrderParams extends BaseParams {
    orderAccount: web3.PublicKey
    purchaseQty: number
    orderTaker: web3.PublicKey
    orderTakerDepositTokenAccount: web3.PublicKey
    expectedPrice: number,
}

/**
 * Creates an instruction which exchanges tokens between order initializer and order taker to satisfy the exchange detailed in orderAccount
 *
 * @param connection
 * @param orderAccount - an initialized orderAccount
 * @param purchaseQty - Number of items to be purchased
 * @param orderTaker - Public key of the order taker
 * @param orderTakerDepositTokenAccount - Public key of token account for token being sent by taker
 * @param programId - Deployed program ID for GM program
 * @param expectedPrice - Expected price of the order
 */
export async function createExchangeInstruction ({
    connection,
    orderAccount,
    purchaseQty,
    orderTaker,
    orderTakerDepositTokenAccount,
    programId,
    expectedPrice,
}: ExchangeOrderParams): Promise<FactoryReturn> {
    const program = getMarketplaceProgram({connection, programId})
    const ixSet: FactoryReturn = {
        signers: [],
        instructions: []
    };

    // Get order account and info
    const orderAccountInfo = (await program.account.orderAccount.fetch(orderAccount)) as OrderAccountInfo;
    const registeredCurrencyInfo = await getRegisteredCurrencyAccountInfo(connection, programId, orderAccountInfo.currencyMint);
    const orderSide = getOrderSide(orderAccountInfo);
    const initializerDepositMint = (orderSide === 'SellSide') ? orderAccountInfo.assetMint : orderAccountInfo.currencyMint;
    const initializerReceiveMint  = (orderSide === 'SellSide') ? orderAccountInfo.currencyMint: orderAccountInfo.assetMint;

    // Get user's token accounts
    let tokenAccount: web3.PublicKey | web3.Keypair = null;
    let initializerDepositTokenAccount: web3.PublicKey = null;
    let initializerReceiveTokenAccount: web3.PublicKey = null;
    let orderTakerReceiveTokenAccount: web3.PublicKey = null;

    // Get initializer deposit mint token account
    let response = await getTokenAccount(
        connection,
        orderAccountInfo.orderInitializerPubkey,
        initializerDepositMint,
        orderTaker
    );
    tokenAccount = response.tokenAccount;
    if ('createInstruction' in response) {
        ixSet.instructions.push(response.createInstruction);
    }

    if (tokenAccount instanceof web3.Keypair) {
        initializerDepositTokenAccount = tokenAccount.publicKey;
        ixSet.signers.push(tokenAccount)
    } else {
        initializerDepositTokenAccount = tokenAccount;
    }

    // Get initializer receive mint token account
    response = await getTokenAccount(
        connection,
        orderAccountInfo.orderInitializerPubkey,
        initializerReceiveMint,
        orderTaker
    );
    tokenAccount = response.tokenAccount;
    if ('createInstruction' in response) {
        ixSet.instructions.push(response.createInstruction);
    }

    if (tokenAccount instanceof web3.Keypair) {
        initializerReceiveTokenAccount = tokenAccount.publicKey;
        ixSet.signers.push(tokenAccount)
    } else {
        initializerReceiveTokenAccount = tokenAccount;
    }

    const [orderVaultAccount] = await getOrderVault(orderAccountInfo.orderInitializerPubkey, initializerDepositMint, programId);
    const [openOrdersCounter] = await getOpenOrdersCounter(orderAccountInfo.orderInitializerPubkey, initializerDepositMint, programId);

    // Get order taker receive token account
    response = await getTokenAccount(
        connection,
        orderTaker,
        initializerDepositMint,
    );
    tokenAccount = response.tokenAccount;
    if ('createInstruction' in response) {
        ixSet.instructions.push(response.createInstruction);
    }

    if (tokenAccount instanceof web3.Keypair) {
        orderTakerReceiveTokenAccount = tokenAccount.publicKey;
        ixSet.signers.push(tokenAccount)
    } else {
        orderTakerReceiveTokenAccount = tokenAccount;
    }

    const exchangeIx =
        await program.methods
            .processExchange(new BN(purchaseQty), new BN(expectedPrice))
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
            .instruction();

    ixSet.instructions.push(exchangeIx);

    return ixSet;
}

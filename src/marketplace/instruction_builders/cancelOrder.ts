import { web3 } from '@project-serum/anchor';
import {
    getMarketplaceProgram,
    getOrderSide,
} from '../utils';
import { BaseParams } from './BaseParams';

/**  Params for Register Currency instruction */
export interface cancelOrderParams extends BaseParams {
    orderInitializer: web3.PublicKey,
    orderAccount: web3.PublicKey,
}

/**
 * Returns an instruction which cancels an open order, returns the balance in escrow to the order initializer, closes the orderAccount,
 * and refunds rent fees.
 *
 * @param connection
 * @param orderInitializer - Public key of order initializer
 * @param initializerDepositTokenAccount - Public key of token account for token being returned
 * @param orderAccount - Public key of orderAccount being closed
 * @param programId - Deployed program ID for GM program
 */
export async function createCancelOrderInstruction({
    connection,
    orderInitializer,
    orderAccount,
    programId
}: cancelOrderParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getMarketplaceProgram({connection, programId})

    const orderAccountInfo = await program.account.orderAccount.fetch(orderAccount);
    const orderSide = getOrderSide(orderAccountInfo);
    const depositMint = (orderSide === 'SellSide') ? orderAccountInfo.assetMint : orderAccountInfo.currencyMint;
    const initializerDepositTokenAccount = (orderSide === 'SellSide') ? orderAccountInfo.initializerAssetTokenAccount : orderAccountInfo.initializerCurrencyTokenAccount;
    const instructions = [
        await program.methods
            .processCancel()
            .accounts({
                depositMint,
                orderInitializer,
                initializerDepositTokenAccount,
                orderAccount
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions
    }
}

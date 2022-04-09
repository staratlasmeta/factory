import {
    BN,
    web3,
} from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';
import { getOpenOrdersCounter } from '../pda_getters';
import { createOrderCounterInstruction } from './createOrderCounter';

/**  Params for Register Currency instruction */
export interface InitializeOrderParameters extends BaseParams {
    initializerMainAccount: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    orderAccount: web3.Keypair,
    price: number,
    originationQty: number,
    depositMint: web3.PublicKey,
    receiveMint: web3.PublicKey,
}

/**
 * Returns an instruction which creates an offer to purchase originationQty of ReceiveToken at 'price' value per unit
 *
 * @param connection
 * @param initializerMainAccount - Public key of user creating order
 * @param initializerDepositTokenAccount - Public key of token account for token being offered
 * @param initializerReceiveTokenAccount - Public key of token account for token to be received
 * @param orderAccount - Keypair of an initialized orderAccount
 * @param price - Price of individual unit
 * @param originationQty - Number of units to purchase
 * @param depositMint - Mint address of token being offered
 * @param receiveMint - Mint address of token being purchased
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeBuyOrderInstruction({
    connection,
    initializerMainAccount,
    initializerDepositTokenAccount,
    initializerReceiveTokenAccount,
    orderAccount,
    price,
    originationQty,
    depositMint,
    receiveMint,
    programId
}: InitializeOrderParameters): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const instructions: web3.TransactionInstruction[] = [];
    const program = getMarketplaceProgram({connection, programId})

    const [counterAddress] = await getOpenOrdersCounter(
        initializerMainAccount,
        depositMint,
        programId
    );
    const orderCounter = await connection.getAccountInfo(counterAddress);
    if (orderCounter === null) {
        console.log('WE MUST INITIALIZE');
        const createCounterIx = await createOrderCounterInstruction({
            connection,
            initializerMainAccount,
            depositMint,
            programId
        });
        instructions.push(createCounterIx);
    } else {
        console.log('WE HAVE THE ACCOUNT');
    }


    const ix = await program.methods
            .processInitializeBuy(
                new BN(price),
                new BN(originationQty)
            )
            .accounts({
                orderInitializer: initializerMainAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderAccount: orderAccount.publicKey,
                depositMint,
                receiveMint,
            })
            .signers([orderAccount])
            .instruction();

    instructions.push(ix);
    return {
        accounts: [],
        instructions
    }
}

/**
 * Returns an instruction which creates an offer to sell originationQty of DepositToke;n at 'price' value per unit
 *
 * @param connection
 * @param orderInitializer - Public key of order initializer
 * @param initializerDepositTokenAccount - Public key of token account for token being offered
 * @param initializerReceiveTokenAccount - Public key of token account for token to be received
 * @param orderAccount - Keypair of an initialized orderAccount
 * @param price - Price of individual unit
 * @param originationQty - Number of units to purchase
 * @param depositMint - Mint address of token being offered
 * @param receiveMint - Mint address of token being purchased
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeSellOrderInstruction({
    connection,
    initializerMainAccount,
    initializerDepositTokenAccount,
    initializerReceiveTokenAccount,
    orderAccount,
    price,
    originationQty,
    depositMint,
    receiveMint,
    programId
    }: InitializeOrderParameters): Promise <{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const instructions: web3.TransactionInstruction[] = [];
    const program = getMarketplaceProgram({connection, programId})

    const [counterAddress] = await getOpenOrdersCounter(
        initializerMainAccount,
        depositMint,
        programId
    );
    const orderCounter = await connection.getAccountInfo(counterAddress);
    if (orderCounter === null) {
        console.log('WE MUST INITIALIZE');
        const createCounterIx = await createOrderCounterInstruction({
            connection,
            initializerMainAccount,
            depositMint,
            programId
        });
        instructions.push(createCounterIx);
    } else {
        console.log('WE HAVE THE ACCOUNT');
    }

    const ix = await program.methods
            .processInitializeSell(
                new BN(price),
                new BN(originationQty)
            )
            .accounts({
                orderInitializer: initializerMainAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderAccount: orderAccount.publicKey,
                depositMint,
                receiveMint,
            })
            .signers([orderAccount])
            .instruction()

    instructions.push(ix);
    return {
        accounts: [],
        instructions
    }

}

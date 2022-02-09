import {
    BN,
    Idl,
    Program,
    Provider,
    web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { baseIdl } from './util/gmIdl';
import { createAccountInstruction } from './util';
import { TransactionInstruction } from '@solana/web3.js';

/**
 * Returns the IDL for the Galactic Marketplace program with provided program ID stored in metadata.
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getGmIDL(
    programId: web3.PublicKey
): unknown {
    const _tmp = baseIdl;
    _tmp['metadata']['address'] = programId.toBase58();
    return _tmp;
}

/**
 * Returns the public key and bump seed for an order escrow account.
 *
 * @param programId
 */
export async function getOrderVault(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('order-vault-account')
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an order escrow authority.
 * @param programId
 */
export async function getOrderVaultAuth(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('order-vault-auth')
        ],
        programId,
    );
}

/**
 * Creates an instruction which exchanges tokens between offer initializer and offer taker to satisfy the exchange detailed in offerAccount
 *
 * @param connection
 * @param orderTaker - Public key of the order taker
 * @param orderTakerDepositTokenAccount - Public key of token account for token being sent by taker
 * @param orderTakerReceiveTokenAccount - Public key of token account for token being received by taker
 * @param orderInitializer - Public key of the order initializer's main wallet
 * @param initializerDepositTokenAccount - Publickey of token account for token being sent by initializer
 * @param initializerReceiveTokenAccount - Publickey of token account for token being received by initializer
 * @param orderAccount - an initialized orderAccount
 * @param programId - Deployed program ID for GM program
 */
export async function createExchangeInstruction(
    connection: web3.Connection,
    orderTaker: web3.PublicKey,
    orderTakerDepositTokenAccount: web3.PublicKey,
    orderTakerReceiveTokenAccount: web3.PublicKey,
    orderInitializer: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    orderAccount: web3.PublicKey,
    purchaseQty: number,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [orderVaultAccount, _orderVaultBump] = await getOrderVault(programId);
    const [orderVaultAuthority, _orderVaultAuthBump] = await getOrderVaultAuth(programId);

    const ix = program.instruction.processExchange(
        new BN(purchaseQty),
        {
            accounts: {
                orderTaker,
                orderTakerDepositTokenAccount,
                orderTakerReceiveTokenAccount,
                orderInitializer,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderVaultAccount,
                orderVaultAuthority,
                orderAccount,
                tokenProgram: TOKEN_PROGRAM_ID,
            }
        }
    );

    return ix;
}

/**
 * Returns an instruction which creates an offer to purchase originationQty of ReceiveToken at 'price' value per unit
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
export async function createInitializeBuyOrderInstruction(
    connection: web3.Connection,
    orderInitializer: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    orderAccount: web3.Keypair,
    price: number,
    originationQty: number,
    depositMint: web3.PublicKey,
    receiveMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [orderVaultAccount, orderVaultBump] = await getOrderVault(programId);

    const ix = program.instruction.processInitializeBuy(
        orderVaultBump,
        new BN(price),
        new BN(originationQty),
        {
            accounts: {
                orderInitializer,
                depositMint,
                receiveMint,
                orderVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderAccount: orderAccount.publicKey,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [orderAccount]
        }
    )

    return ix;
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
export async function createInitializeSellOrderInstruction(
    connection: web3.Connection,
    orderInitializer: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    orderAccount: web3.Keypair,
    price: number,
    originationQty: number,
    depositMint: web3.PublicKey,
    receiveMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [orderVaultAccount, orderVaultBump] = await getOrderVault(programId);

    const ix = program.instruction.processInitializeSell(
        orderVaultBump,
        new BN(price),
        new BN(originationQty),
        {
            accounts: {
                orderInitializer,
                depositMint,
                receiveMint,
                orderVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderAccount: orderAccount.publicKey,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [orderAccount]
        }
    )

    return ix;
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
export async function createCancelOrderInstruction(
    connection: web3.Connection,
    orderInitializer: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    orderAccount: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [orderVaultAccount, _orderVaultBump] = await getOrderVault(programId);
    const [orderVaultAuthority, _orderVaultAuthBump] = await getOrderVaultAuth(programId);

    const ix = program.instruction.processCancel(
        {
            accounts: {
                orderInitializer,
                initializerDepositTokenAccount,
                orderVaultAccount,
                orderVaultAuthority,
                orderAccount,
                tokenProgram: TOKEN_PROGRAM_ID
            },
        }
    );

    return ix;
}
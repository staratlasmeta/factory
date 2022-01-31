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
 * Returns the public key and bump seed for an offer escrow account.
 *
 * @param programId
 */
export async function getOfferVault(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('offer-vault-account')
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an offer escrow authority.
 * @param programId
 */
export async function getOfferVaultAuth(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('offer-vault-auth')
        ],
        programId,
    );
}

/**
 * Creates an instruction which exchanges tokens between offer initializer and offer taker to satisfy the exchange detailed in offerAccount
 *
 * @param connection
 * @param offerTakerMainAccount - PublicKey of the offer taker
 * @param offerTakerDepositTokenAccount - Token account for token being sent by taker
 * @param offerTakerReceiveTokenAccount - Token account for token being received by taker
 * @param offerInitializer - PublicKey of the offer initializer
 * @param offerAccount - an initialized offerAccount
 * @param programId - Deployed program ID for GM program
 */
export async function createExchangeInstruction(
    connection: web3.Connection,
    offerTakerMainAccount: web3.PublicKey,
    offerTakerDepositTokenAccount: web3.PublicKey,
    offerTakerReceiveTokenAccount: web3.PublicKey,
    offerInitializer: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    offerAccount: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [offerVaultAccount, _offerVaultBump] = await getOfferVault(programId);
    const [offerVaultAuthority, _offerVaultAuthBump] = await getOfferVaultAuth(programId);

    const ix = program.instruction.processExchange(
        {
            accounts: {
                offerTaker: offerTakerMainAccount,
                offerTakerDepositTokenAccount,
                offerTakerReceiveTokenAccount,
                offerInitializer,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                offerAccount,
                offerVaultAccount,
                offerVaultAuthority,
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
 * @param initializerPublicKey - PublicKey of offer initializer
 * @param initializerDepositTokenAccount - Token account for token being offered
 * @param initializerReceiveTokenAccount - Token account for token to be received
 * @param offerAccount - an initialized offerAccount
 * @param price - Price of individual unit
 * @param originationQty - Number of units to purchase
 * @param offerTokenMint - Mint address of token being offered
 * @param takerTokenMint - Mint address of token being purchased
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeBuyOrderInstruction(
    connection: web3.Connection,
    initializerPublicKey: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    offerAccount: web3.Keypair,
    price: number,
    originationQty: number,
    offerTokenMint: web3.PublicKey,
    takerTokenMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [offerVaultAccount, offerVaultBump] = await getOfferVault(programId);

    const ix = program.instruction.processInitializeBuy(
        offerVaultBump,
        new BN(price),
        new BN(originationQty),
        {
            accounts: {
                offerInitializer: initializerPublicKey,
                offerMint: offerTokenMint,
                takerMint: takerTokenMint,
                offerVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                offerAccount: offerAccount.publicKey,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [offerAccount]
        }
    )

    return ix;
}

/**
 * Returns an instruction which creates an offer to sell originationQty of DepositToke;n at 'price' value per unit
 *
 * @param connection
 * @param initializerPublicKey - PublicKey of offer initializer
 * @param initializerDepositTokenAccount - Token account for token being offered
 * @param initializerReceiveTokenAccount - Token account for token to be received
 * @param offerAccount - an initialized offerAccount
 * @param price - Price of individual unit
 * @param originationQty - Number of units to purchase
 * @param offerTokenMint - Mint address of token being offered
 * @param takerTokenMint - Mint address of token being purchased
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeSellOrderInstruction(
    connection: web3.Connection,
    initializerPublicKey: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    offerAccount: web3.Keypair,
    price: number,
    originationQty: number,
    offerTokenMint: web3.PublicKey,
    takerTokenMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [offerVaultAccount, offerVaultBump] = await getOfferVault(programId);

    const ix = program.instruction.processInitializeBuy(
        offerVaultBump,
        new BN(price),
        new BN(originationQty),
        {
            accounts: {
                offerInitializer: initializerPublicKey,
                offerMint: offerTokenMint,
                takerMint: takerTokenMint,
                offerVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                offerAccount: offerAccount.publicKey,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [offerAccount]
        }
    )

    return ix;
}
export async function createCancelOfferInstruction(
    connection: web3.Connection,
    offerInitializer: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    offerAccount: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [offerVaultAccount, _offerVaultBump] = await getOfferVault(programId);
    const [offerVaultAuthority, _offerVaultAuthBump] = await getOfferVaultAuth(programId);

    const ix = program.instruction.processCancel(
        {
            accounts: {
                offerInitializer,
                initializerDepositTokenAccount,
                offerVaultAccount,
                offerVaultAuthority,
                offerAccount,
                tokenProgram: TOKEN_PROGRAM_ID
            },
        }
    );

    return ix;
}
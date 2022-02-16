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

export interface MarketVarsInfo {
    updateAuthorityMaster: web3.PublicKey,
}

export interface RegisteredCurrencyInfo {
    tokenMint: web3.PublicKey,
    saCurrencyVault: web3.PublicKey,
    royalty: BN,
}

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
 * Returns the public key and bump seed for the market variables account
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export async function getMarketVarsAccount(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('market-vars')
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an order escrow account.
 *
 * @param programId - Deployed program ID for Galactic Marketplace
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
 *
 * @param programId - Deployed program ID for Galactic Marketplace
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
 * Returns the public key and bump seed for a registered currency account
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 * @param currencyMint - Mint address for registered currency
 */
export async function getRegisteredCurrencyAccount(
    programId: web3.PublicKey,
    currencyMint: web3.PublicKey,
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('registered-currency'),
            currencyMint.toBuffer()
        ],
        programId,
    )
}

export async function getMarketVarsAccountInfo(
    connection: web3.Connection,
    programId: web3.PublicKey,
): Promise<MarketVarsInfo> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);

    const [marketVarsAccount] = await getMarketVarsAccount(programId);
    const marketVarsInfo = await program.account.marketVars.fetch(marketVarsAccount);
    return marketVarsInfo as MarketVarsInfo;
}

export async function getRegisteredCurrencyAccountInfo(
    connection: web3.Connection,
    programId: web3.PublicKey,
    currencyMint: web3.PublicKey,
): Promise<RegisteredCurrencyInfo> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);

    const [registeredCurrencyAccount] = await getRegisteredCurrencyAccount(programId, currencyMint);
    const registeredCurrencyInfo = await program.account.registeredCurrency.fetch(registeredCurrencyAccount);
    return registeredCurrencyInfo as RegisteredCurrencyInfo;
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

    const [orderVaultAccount] = await getOrderVault(programId);
    const [orderVaultAuthority] = await getOrderVaultAuth(programId);

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
    orderDuration: number,
    depositMint: web3.PublicKey,
    receiveMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [marketVarsAccount] = await getMarketVarsAccount(programId);
    const [orderVaultAccount] = await getOrderVault(programId);
    const [registeredMintAccount] = await getRegisteredCurrencyAccount(programId, depositMint);

    const ix = program.instruction.processInitializeBuy(
        new BN(price),
        new BN(originationQty),
        new BN(orderDuration),
        {
            accounts: {
                orderInitializer,
                marketVarsAccount,
                depositMint,
                receiveMint,
                orderVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderAccount: orderAccount.publicKey,
                registeredCurrency: registeredMintAccount,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [orderAccount]
        }
    )

    return ix;
}

export async function createInitializeMarketInstruction(
    connection: web3.Connection,
    updateAuthorityAccount: web3.PublicKey,
    maxOrderDuration: number,
    programId: web3.PublicKey,
): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [marketVarsAccount] = await getMarketVarsAccount(programId);

    const ix = program.instruction.initializeMarket(
        new BN(maxOrderDuration),
        {
            accounts: {
               updateAuthorityAccount,
               marketVarsAccount,
               systemProgram: web3.SystemProgram.programId,
            },
            signers: [],
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
    orderDuration: number,
    depositMint: web3.PublicKey,
    receiveMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [marketVarsAccount] = await getMarketVarsAccount(programId);
    const [orderVaultAccount] = await getOrderVault(programId);
    const [registeredMintAccount] = await getRegisteredCurrencyAccount(programId, receiveMint);

    const ix = program.instruction.processInitializeSell(
        new BN(price),
        new BN(originationQty),
        new BN(orderDuration),
        {
            accounts: {
                orderInitializer,
                marketVarsAccount,
                depositMint,
                receiveMint,
                orderVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderAccount: orderAccount.publicKey,
                registeredCurrency: registeredMintAccount,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [orderAccount]
        }
    )

    return ix;
}

export async function createRegisterCurrencyInstruction(
    connection: web3.Connection,
    updateAuthorityAccount: web3.PublicKey,
    royalty: number,
    saCurrencyVault: web3.PublicKey,
    currencyMint: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [registeredCurrency] = await getRegisteredCurrencyAccount(programId, currencyMint);
    const [marketVarsAccount] = await getMarketVarsAccount(programId);

    const ix = program.instruction.registerCurrency(
        new BN(royalty),
        {
            accounts: {
                updateAuthorityAccount,
                marketVarsAccount,
                registeredCurrency,
                currencyMint,
                saCurrencyVault,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [],
        }
    )
    return ix;
}
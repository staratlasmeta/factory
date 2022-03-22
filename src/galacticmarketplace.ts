import {
    BN,
    Idl,
    Program,
    Provider,
    web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { baseIdl } from './util/gmIdl';
import { createAccountInstruction, getOrderSide } from './util';
import { TransactionInstruction } from '@solana/web3.js';

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

interface OrderSide {
    Buy,
    Sell
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
    orderInitializer: web3.PublicKey,
    tokenMint: web3.PublicKey,
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from('order-vault-account'),
            orderInitializer.toBuffer(),
            tokenMint.toBuffer(),
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

/**
 * Returns the contents of the market vars account as detailed in the MarketVarsInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for Galactic Marketplace
 */
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

/**
 * Returns the contents of a registered currency account as detailed in the RegisteredCurrencyInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for Galactic Marketplace
 * @param currencyMint - Mint address of currency
 */
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
 * Get an array of all open orders
 * @param connection
 * @param programId - Deployed program ID for GM program
 */
export async function getAllOpenOrders(
    connection: web3.Connection,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();

    const orders = orderAccounts
        .map(order => order.account as OrderAccountInfo);

    return orders;
}

/**
 * Get an array of open orders for a player
 * @param connection
 * @param playerPublicKey - Public key of player
 * @param programId - Deployed program ID for GM program
 */
export async function getOpenOrdersForPlayer(
    connection: web3.Connection,
    playerPublicKey: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();
    const filtered = orderAccounts
        .map(order => order.account as OrderAccountInfo)
        .filter(order => order.orderInitializerPubkey.toString() === playerPublicKey.toString());

    return filtered;
}

/**
 * Get an array of open orders for a given currency
 * @param connection
 * @param currencyMint - Public key of mint
 * @param programId - Deployed program ID for GM program
 */
export async function getOpenOrdersForCurrency(
    connection: web3.Connection,
    currencyMint: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();
    const filtered = orderAccounts
        .map(order => order.account as OrderAccountInfo)
        .filter(order => order.currencyMint.toString() === currencyMint.toString());

    return filtered;
}

/**
 * Get an array of open orders for a given asset
 * @param connection
 * @param assetMint - Public key of mint
 * @param programId - Deployed program ID for GM program
 */
export async function getOpenOrdersForAsset(
    connection: web3.Connection,
    assetMint: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();
    const filtered = orderAccounts
        .map(order => order.account as OrderAccountInfo)
        .filter(order => order.assetMint.toString() === assetMint.toString());

    return filtered;
}

/**
 * Get an array of open orders for a given player and currency
 * @param connection
 * @param playerPublicKey - Public key of player
 * @param currencyMint - Public key of mint
 * @param programId - Deployed program ID for GM program
 */
export async function getOpenOrdersForPlayerAndCurrency(
    connection: web3.Connection,
    playerPublicKey: web3.PublicKey,
    currencyMint: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();
    const filtered = orderAccounts
        .map(order => order.account as OrderAccountInfo)
        .filter(order => order.orderInitializerPubkey.toString() === playerPublicKey.toString()
        && order.currencyMint.toString() === currencyMint.toString());

    return filtered;
}

/**
 * Get an array of open orders for a given player and asset
 * @param connection
 * @param playerPublicKey - Public key of player
 * @param assetMint - Public key of mint
 * @param programId - Deployed program ID for GM program
 */
export async function getOpenOrdersForPlayerAndAsset(
    connection: web3.Connection,
    playerPublicKey: web3.PublicKey,
    assetMint: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new Provider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();
    const filtered = orderAccounts
        .map(order => order.account as OrderAccountInfo)
        .filter(order => order.orderInitializerPubkey.toString() === playerPublicKey.toString()
        && order.assetMint.toString() === assetMint.toString());

    return filtered;
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

    const orderAccountInfo = await program.account.orderAccount.fetch(orderAccount);
    const orderSide = getOrderSide(orderAccountInfo.orderSide);
    const depositMint = (orderSide === 'SellSide') ? orderAccountInfo.assetMint : orderAccountInfo.currencyMint;

    const [orderVaultAccount] = await getOrderVault(orderInitializer, depositMint, programId);
    const [orderVaultAuthority] = await getOrderVaultAuth(programId);

    const ix = program.instruction.processCancel(
        {
            accounts: {
                orderInitializer,
                depositMint,
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
 * Closes a registered currency account and returns the rent to the update authority
 * @param connection
 * @param updateAuthorityAccount - Public key of update authority specified in market vars account
 * @param currencyMint - Mint address of currency being deregistered
 * @param programId - Deployed program ID for GM program
 */
export async function createDeregisterCurrencyInstruction(
    connection: web3.Connection,
    updateAuthorityAccount: web3.PublicKey,
    currencyMint: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [registeredCurrency] = await getRegisteredCurrencyAccount(programId, currencyMint);
    const [marketVarsAccount] = await getMarketVarsAccount(programId);

    const ix = program.instruction.deregisterCurrency(
        {
            accounts: {
                updateAuthorityAccount,
                marketVarsAccount,
                registeredCurrency,
                currencyMint,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [],
        }
    )
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
 * @param saVault - Public key of Star Atlas token account designated in registered currency account
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
    saVault: web3.PublicKey,
    purchaseQty: number,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const orderAccountInfo = await program.account.orderAccount.fetch(orderAccount);

    const orderSide = getOrderSide(orderAccountInfo.orderSide);
    const depositMint = (orderSide === 'SellSide') ? orderAccountInfo.assetMint : orderAccountInfo.currencyMint;
    const currencyMint = orderAccountInfo.currencyMint;
    const assetMint = orderAccountInfo.assetMint;

    const [orderVaultAccount] = await getOrderVault(orderInitializer, depositMint, programId);
    const [orderVaultAuthority] = await getOrderVaultAuth(programId);
    const _orderAccount = await program.account.orderAccount.fetch(orderAccount);
    const _currencyMint = _orderAccount.currencyMint;
    const [registeredCurrency] = await getRegisteredCurrencyAccount(programId, _currencyMint);

    const ix = program.instruction.processExchange(
        new BN(purchaseQty),
        {
            accounts: {
                orderTaker,
                orderTakerDepositTokenAccount,
                orderTakerReceiveTokenAccount,
                currencyMint,
                assetMint,
                orderInitializer,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderVaultAccount,
                orderVaultAuthority,
                orderAccount,
                saVault,
                registeredCurrency,
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

    const [marketVarsAccount] = await getMarketVarsAccount(programId);
    const [orderVaultAccount] = await getOrderVault(orderInitializer, depositMint, programId);
    const [orderVaultAuthority] = await getOrderVaultAuth(programId);
    const [registeredMintAccount] = await getRegisteredCurrencyAccount(programId, depositMint);

    const ix = program.instruction.processInitializeBuy(
        new BN(price),
        new BN(originationQty),
        {
            accounts: {
                orderInitializer,
                marketVarsAccount,
                depositMint,
                receiveMint,
                orderVaultAccount,
                orderVaultAuthority,
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

/**
 * Returns an instruction which initializes a market with a specified update authority
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of desired update authority
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeMarketInstruction(
    connection: web3.Connection,
    updateAuthorityAccount: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [marketVarsAccount] = await getMarketVarsAccount(programId);

    const ix = program.instruction.initializeMarket(
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
    depositMint: web3.PublicKey,
    receiveMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [marketVarsAccount] = await getMarketVarsAccount(programId);
    const [orderVaultAccount] = await getOrderVault(orderInitializer, depositMint, programId);
    const [orderVaultAuthority] = await getOrderVaultAuth(programId);
    const [registeredMintAccount] = await getRegisteredCurrencyAccount(programId, receiveMint);

    const ix = program.instruction.processInitializeSell(
        new BN(price),
        new BN(originationQty),
        {
            accounts: {
                orderInitializer,
                marketVarsAccount,
                depositMint,
                receiveMint,
                orderVaultAccount,
                orderVaultAuthority,
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

/**
 * Returns an instruction which registers a valid currency with the market. Update authority must match marketVarsAccount.
 *
 * @param connection
 * @param updateAuthorityAccount - Signer must be update authority registered in marketVars
 * @param royalty - Associated royalty fee with 1,000,000 equaling 100%
 * @param saCurrencyVault - Star Atlas token account which will receive royalties
 * @param currencyMint - Mint address of currency being registered
 * @param programId - Deployed program ID for GM program
 */
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

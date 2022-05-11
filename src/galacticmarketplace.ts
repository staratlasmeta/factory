import {
    Idl,
    Program,
    AnchorProvider,
    web3
} from '@project-serum/anchor';
import {
    OrderAccountInfo,
} from './marketplace/types/marketplace_accounts';
import { getGmIDL } from './marketplace/utils/getMarketplaceProgram'




/**
 * Get an array of all open orders
 * @param connection
 * @param programId - Deployed program ID for GM program
 */
export async function getAllOpenOrders(
    connection: web3.Connection,
    programId: web3.PublicKey,
): Promise<OrderAccountInfo[]> {
    const provider = new AnchorProvider(connection, null, null);
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
    programId: web3.PublicKey,): Promise<OrderAccountInfo[]> {
    const provider = new AnchorProvider(connection, null, null);
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
    const provider = new AnchorProvider(connection, null, null);
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
    const provider = new AnchorProvider(connection, null, null);
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
    const provider = new AnchorProvider(connection, null, null);
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
    const provider = new AnchorProvider(connection, null, null);
    const idl = getGmIDL(programId);
    const program = new Program(idl as Idl, programId, provider);
    const orderAccounts = await program.account.orderAccount.all();
    const filtered = orderAccounts
        .map(order => order.account as OrderAccountInfo)
        .filter(order => order.orderInitializerPubkey.toString() === playerPublicKey.toString()
        && order.assetMint.toString() === assetMint.toString());

    return filtered;
}

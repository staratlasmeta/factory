import { Idl, Program, AnchorProvider, web3 } from '@coral-xyz/anchor';
import { GetProgramAccountsFilter } from '@solana/web3.js';
import {
  OrderAccountInfo,
  OrderAccountItem,
} from './../types/marketplace_accounts';
import { getGmIDL } from './../utils/getMarketplaceProgram';

/**
 * Get an array of all open orders
 * @param connection
 * @param programId - Deployed program ID for GM program
 */
export async function getAllOpenOrders(
  connection: web3.Connection,
  programId: web3.PublicKey,
): Promise<OrderAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 201,
    },
  ];
  const orderAccounts = await program.account.orderAccount.all(filter);

  return orderAccounts as OrderAccountItem[];
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
): Promise<OrderAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 201,
    },
    {
      memcmp: {
        offset: 8,
        bytes: playerPublicKey.toBase58(),
      },
    } as GetProgramAccountsFilter,
  ];
  const orderAccounts = await program.account.orderAccount.all(filter);

  return orderAccounts as OrderAccountItem[];
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
): Promise<OrderAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 201,
    },
    {
      memcmp: {
        offset: 40,
        bytes: currencyMint.toBase58(),
      },
    } as GetProgramAccountsFilter,
  ];
  const orderAccounts = await program.account.orderAccount.all(filter);

  return orderAccounts as OrderAccountItem[];
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
): Promise<OrderAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 201,
    },
    {
      memcmp: {
        offset: 72,
        bytes: assetMint.toBase58(),
      },
    } as GetProgramAccountsFilter,
  ];
  const orderAccounts = await program.account.orderAccount.all(filter);

  return orderAccounts as OrderAccountItem[];
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
): Promise<OrderAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 201,
    },
    {
      memcmp: {
        offset: 40,
        bytes: currencyMint.toBase58(),
      },
    },
    {
      memcmp: {
        offset: 8,
        bytes: playerPublicKey.toBase58(),
      },
    },
  ];
  const orderAccounts = await program.account.orderAccount.all(filter);

  return orderAccounts as OrderAccountItem[];
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
): Promise<OrderAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 201,
    },
    {
      memcmp: {
        offset: 72,
        bytes: assetMint.toBase58(),
      },
    },
    {
      memcmp: {
        offset: 8,
        bytes: playerPublicKey.toBase58(),
      },
    },
  ];
  const orderAccounts = await program.account.orderAccount.all(filter);

  return orderAccounts as OrderAccountItem[];
}

/**
 * Takes an order account's public key as a parameter and returns the deserialized contents of the data account.
 * @param connection
 * @param orderAccount - Public key of order account to be deserialized
 * @param programId - Deployed program ID for GM program
 */
export async function getSingleOrder(
  connection: web3.Connection,
  orderAccount: web3.PublicKey,
  programId: web3.PublicKey,
): Promise<OrderAccountInfo> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const obj = await program.account.orderAccount.fetch(orderAccount);

  return obj as OrderAccountInfo;
}

import { AnchorProvider, Idl, Program, web3 } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { FeeExemptItem, RegisteredCurrencyItem } from '../types';
import * as Seeds from './seeds';
import { getGmIDL } from './../utils/getMarketplaceProgram';

/**
 * Returns the public key and bump seed for the market variables account
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getMarketVarsAccount(
  programId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Seeds.MARKET_VARS_SEED], programId);
}

/**
 * Returns the public key and bump seed for an order escrow account.
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getOrderVault(
  orderInitializer: PublicKey,
  tokenMint: PublicKey,
  programId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Seeds.ORDER_VAULT_SEED, orderInitializer.toBuffer(), tokenMint.toBuffer()],
    programId,
  );
}

/**
 * Returns the public key and bump seed for an order escrow authority.
 *
 * @param playerPubkey - Pubkey of order initializer
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getOrderVaultAuth(
  playerPubkey: PublicKey,
  programId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Seeds.ORDER_VAULT_AUTH_SEED, playerPubkey.toBuffer()],
    programId,
  );
}

/**
 * Returns the public key and bump seed for a registered currency account
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 * @param currencyMint - Mint address for registered currency
 */
export function getRegisteredCurrencyAccount(
  programId: PublicKey,
  currencyMint: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Seeds.REGISTERED_CURRENCY_SEED, currencyMint.toBuffer()],
    programId,
  );
}

export async function getAllRegisteredCurrencies(
  connection: web3.Connection,
  programId: web3.PublicKey,
): Promise<RegisteredCurrencyItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 1686,
    },
  ];
  const registeredCurrencies =
    await program.account.registeredCurrency.all(filter);
  const currencyInfo = [];

  for (const currency of registeredCurrencies) {
    const someCurrency = {
      mint: currency.account.tokenMint,
      royalty: currency.account.royalty,
      saVault: currency.account.saCurrencyVault,
    };

    currencyInfo.push(someCurrency);
  }

  return currencyInfo as RegisteredCurrencyItem[];
}

export function getOpenOrdersCounter(
  playerPubkey: PublicKey,
  depositMint: PublicKey,
  programId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Seeds.OPEN_ORDERS_COUNTER,
      playerPubkey.toBuffer(),
      depositMint.toBuffer(),
    ],
    programId,
  );
}

export function getFeeExemptAccount(
  targetAccount: PublicKey,
  programId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Seeds.FEE_EXEMPT_SEED, targetAccount.toBuffer()],
    programId,
  );
}

export async function getAllFeeExemptAccounts(
  connection: web3.Connection,
  programId: web3.PublicKey,
): Promise<FeeExemptItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getGmIDL(programId);
  const program = new Program(idl as Idl, programId, provider);
  const feeExemptAccounts = await program.account.feeReduction.all();

  return feeExemptAccounts as FeeExemptItem[];
}

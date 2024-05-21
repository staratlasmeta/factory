import { BN, web3 } from '@coral-xyz/anchor';
import {
  getFeeExemptAccount,
  getMarketVarsAccount,
  getRegisteredCurrencyAccount,
} from './pda_getters';
import { getMarketplaceProgram } from '../utils';
import {
  FeeExemptInfo,
  MarketVarsAccountInfo,
  RegisteredCurrencyInfo,
  RoyaltyTiers,
} from '../types';
import { getStakingAccount, getStakingAccountInfo } from '../../atlas-staking';

/**
 * Returns the contents of the market vars account as detailed in the MarketVarsInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export async function getMarketVarsAccountInfo(
  connection: web3.Connection,
  programId: web3.PublicKey,
): Promise<MarketVarsAccountInfo> {
  const program = getMarketplaceProgram({
    connection: connection,
    programId: programId,
  });

  const [marketVarsAccount] = getMarketVarsAccount(programId);
  const marketVarsInfo =
    await program.account.marketVars.fetch(marketVarsAccount);
  return marketVarsInfo as MarketVarsAccountInfo;
}

export async function getFeeExemptAccountInfo(
  connection: web3.Connection,
  targetAccount: web3.PublicKey,
  programId: web3.PublicKey,
): Promise<FeeExemptInfo> {
  const program = getMarketplaceProgram({
    connection: connection,
    programId: programId,
  });

  const [feeExemptAccount] = getFeeExemptAccount(targetAccount, programId);
  const feeExemptInfo = await program.account.feeExempt.fetch(feeExemptAccount);
  return feeExemptInfo as FeeExemptInfo;
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
  const program = getMarketplaceProgram({
    connection: connection,
    programId: programId,
  });

  const [registeredCurrencyAccount] = getRegisteredCurrencyAccount(
    programId,
    currencyMint,
  );
  const registeredCurrencyInfo = await program.account.registeredCurrency.fetch(
    registeredCurrencyAccount,
  );
  return registeredCurrencyInfo as RegisteredCurrencyInfo;
}

/**
 * Retursn the contents of a registered currency info for a provided RegisteredCurrency pubkey
 *
 * @param connection
 * @param programId - Deployed program ID for Galactic Marketplace
 * @param registeredCurrency - Public key for a RegisteredCurrency
 * @returns
 */
export async function getRegisteredCurrencyInfoFromPubkey(
  connection: web3.Connection,
  programId: web3.PublicKey,
  registeredCurrency: web3.PublicKey,
): Promise<RegisteredCurrencyInfo> {
  const program = getMarketplaceProgram({
    connection,
    programId,
  });

  const registeredCurrencyInfo =
    await program.account.registeredCurrency.fetch(registeredCurrency);
  return registeredCurrencyInfo as RegisteredCurrencyInfo;
}

export async function getRoyaltyReductionForUserAndMint(
  connection: web3.Connection,
  gmProgramId: web3.PublicKey,
  stakingProgramId: web3.PublicKey,
  playerPubkey: web3.PublicKey,
  registeredCurrency: web3.PublicKey,
  registeredStake: web3.PublicKey,
): Promise<number> {
  let formattedDiscount = 0;
  // Find registered currency info
  const registeredCurrencyInfo = await getRegisteredCurrencyInfoFromPubkey(
    connection,
    gmProgramId,
    registeredCurrency,
  );

  // Find user's staking account
  const [stakingAccount] = getStakingAccount(
    stakingProgramId,
    playerPubkey,
    registeredStake,
  );
  const stakingAccountInfo = await getStakingAccountInfo(
    connection,
    stakingAccount,
    stakingProgramId,
  );

  if (stakingAccountInfo.unstakedTs.eq(new BN(0))) {
    // Match user's total stake with the correct royalty tier
    const tiers: RoyaltyTiers =
      registeredCurrencyInfo.royaltyTiers as RoyaltyTiers;
    let discount = new BN(0);
    for (const tier of tiers) {
      if (stakingAccountInfo.totalStake.gte(tier.stakeAmount)) {
        discount = tier.discount;
      }
    }
    // Format discount rate
    formattedDiscount = discount.toNumber() / 10_000;
  }

  // Return discount rate
  return formattedDiscount;
}

export async function getRoyaltyReductionForStakingAccount(
  connection: web3.Connection,
  gmProgramId: web3.PublicKey,
  stakingProgramId: web3.PublicKey,
  stakingAccount: web3.PublicKey,
  registeredCurrency: web3.PublicKey,
): Promise<number> {
  let formattedDiscount = 0;
  // Find registered currency info
  const registeredCurrencyInfo = await getRegisteredCurrencyInfoFromPubkey(
    connection,
    gmProgramId,
    registeredCurrency,
  );

  // Find user's atlas staking account info
  const stakingAccountInfo = await getStakingAccountInfo(
    connection,
    stakingAccount,
    stakingProgramId,
  );

  if (stakingAccountInfo.unstakedTs.eq(new BN(0))) {
    // Match user's total stake with the correct royalty tier
    const tiers: RoyaltyTiers =
      registeredCurrencyInfo.royaltyTiers as RoyaltyTiers;
    let discount = new BN(0);
    for (const tier of tiers) {
      if (stakingAccountInfo.totalStake.gte(tier.stakeAmount)) {
        discount = tier.discount;
      }
    }
    // Format discount rate
    formattedDiscount = discount.toNumber() / 10_000;
  }

  // Return discount rate
  return formattedDiscount;
}

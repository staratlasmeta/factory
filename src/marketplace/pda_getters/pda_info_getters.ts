import { web3 } from '@project-serum/anchor';
import {
    getMarketVarsAccount,
    getRegisteredCurrencyAccount,
} from './pda_getters';
import { getMarketplaceProgram } from './../utils/getMarketplaceProgram'
import {
    MarketVarsAccountInfo,
    RegisteredCurrencyInfo
} from '../types/marketplace_accounts';

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
    const program = getMarketplaceProgram({connection: connection, programId: programId})

    const [marketVarsAccount] = await getMarketVarsAccount(programId);
    const marketVarsInfo = await program.account.marketVars.fetch(marketVarsAccount);
    return marketVarsInfo as MarketVarsAccountInfo;
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
    const program = getMarketplaceProgram({connection: connection, programId: programId});

    const [registeredCurrencyAccount] = await getRegisteredCurrencyAccount(programId, currencyMint);
    const registeredCurrencyInfo = await program.account.registeredCurrency.fetch(registeredCurrencyAccount);
    return registeredCurrencyInfo as RegisteredCurrencyInfo;
}

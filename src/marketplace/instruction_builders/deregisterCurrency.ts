import { web3 } from '@coral-xyz/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';

/**  Params for Register Currency instruction */
export interface deregisterCurrencyParams extends BaseParams {
  updateAuthorityAccount: web3.PublicKey;
  currencyMint: web3.PublicKey;
}

/**
 * Returns an instruction which registers a valid currency with the market. Update authority must match marketVarsAccount.
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of registered update authority
 * @param currencyMint - Mint address of currency being registered
 * @param programId - Deployed program ID for GM program
 */
export async function createDeregisterCurrencyInstruction({
  connection,
  updateAuthorityAccount,
  currencyMint,
  programId,
}: deregisterCurrencyParams): Promise<{
  accounts: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> {
  const program = getMarketplaceProgram({ connection, programId });

  const instructions = [
    await program.methods
      .deregisterCurrency()
      .accounts({
        updateAuthorityAccount,
        currencyMint,
      })
      .instruction(),
  ];
  return {
    accounts: [],
    instructions,
  };
}

import { BN, web3 } from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';

/**  Params for Register Currency instruction */
export interface RegisterCurrencyParams extends BaseParams {
  updateAuthorityAccount: web3.PublicKey;
  royalty: number;
  saCurrencyVault: web3.PublicKey;
  currencyMint: web3.PublicKey;
}

/**
 * Returns an instruction which registers a valid currency with the market. Update authority must match marketVarsAccount.
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of registered update authority
 * @param royalty - Associated royalty fee with 1,000,000 equaling 100%
 * @param saCurrencyVault - Star Atlas token account which will receive royalties
 * @param currencyMint - Mint address of currency being registered
 * @param programId - Deployed program ID for GM program
 */
export async function createRegisterCurrencyInstruction({
  connection,
  updateAuthorityAccount,
  royalty,
  saCurrencyVault,
  currencyMint,
  programId,
}: RegisterCurrencyParams): Promise<{
  accounts: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> {
  const program = getMarketplaceProgram({ connection, programId });

  const instructions = [
    await program.methods
      .registerCurrency(new BN(royalty))
      .accounts({
        updateAuthorityAccount,
        saCurrencyVault,
        currencyMint,
      })
      .instruction(),
  ];
  return {
    accounts: [],
    instructions,
  };
}

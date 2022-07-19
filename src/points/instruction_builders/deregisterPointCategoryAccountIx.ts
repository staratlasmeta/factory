import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Deregister Point Category Account instruction */
export interface DeregisterPointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  domainKey: PublicKey /** the domain account pubkey */;
  pointCategoryKey: PublicKey /** The Pubkey of the Point Category Account */;
}

/**
 * De-registers a Point Category Account
 * @param admin - the admin public key
 * @param domainKey - The domain account pubkey
 * @param pointCategoryKey - The Pubkey of the Point Category Account
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterPointCategoryAccountIx = async ({
  admin,
  domainKey,
  pointCategoryKey,
  connection,
  programId,
}: DeregisterPointCategoryAccountParams): Promise<{
  signers?: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .deregisterPointCategoryAccount()
      .accounts({
        admin,
        domainAccount: domainKey,
        pointCategoryAccount: pointCategoryKey,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

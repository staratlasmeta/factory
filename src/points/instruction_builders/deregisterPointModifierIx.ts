import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Deregister Point Modifier instruction */
export interface DeregisterPointModifierParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  modifierKey: PublicKey /** the modifier public key */;
  domainAccount: PublicKey /** The related Domain Account PublicKey */;
  pointCategoryAccount: PublicKey /** The Point Category Account PublicKey */;
}

/**
 * De-registers a Point Modifier
 * @param admin - the admin public key
 * @param domainAccount, - The related Domain Account PublicKey
 * @param pointCategoryAccount, - The Point Category Account PublicKey
 * @param modifierKey - the modifier public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterPointModifierIx = async ({
  admin,
  domainAccount,
  pointCategoryAccount,
  modifierKey,
  connection,
  programId,
}: DeregisterPointModifierParams): Promise<{
  accounts: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .deregisterPointModifier()
      .accounts({
        admin,
        domainAccount,
        pointCategoryAccount,
        modifier: modifierKey,
      })
      .instruction(),
  ];

  return {
    accounts: [],
    instructions,
  };
};

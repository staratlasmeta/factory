import { PublicKey, Keypair } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Deregister Point Modifier instruction */
export interface DeregisterPointModifierParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  modifierKey: PublicKey /** the modifier public key */;
  domainKey: PublicKey /** The related Domain Account PublicKey */;
  pointCategoryKey: PublicKey /** The Point Category Account PublicKey */;
}

/**
 * De-registers a Point Modifier
 * @param admin - the admin public key
 * @param domainKey, - The related Domain Account PublicKey
 * @param pointCategoryKey, - The Point Category Account PublicKey
 * @param modifierKey - the modifier public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterPointModifierIx = async ({
  admin,
  domainKey,
  pointCategoryKey,
  modifierKey,
  connection,
  programId,
}: DeregisterPointModifierParams): Promise<{
  signers?: Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .deregisterPointModifier()
      .accounts({
        admin,
        domainAccount: domainKey,
        pointCategoryAccount: pointCategoryKey,
        modifier: modifierKey,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

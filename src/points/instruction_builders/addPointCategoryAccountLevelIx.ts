import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Add Point Category Account Level instruction */
export interface AddPointCategoryAccountLevelParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  domainKey: PublicKey /** the domain account public key */;
  pointCategoryKey: PublicKey /** the point category account public key */;
  newLevel: BN /** The new level to add */;
}

/**
 * Adds a Point Category Account Level
 * @param admin - the admin public key
 * @param domainKey - the admin public key
 * @param pointCategoryKey - the admin public key
 * @param newLevel - The new level to add
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const addPointCategoryAccountLevelIx = async ({
  admin,
  domainKey,
  pointCategoryKey,
  newLevel,
  connection,
  programId,
}: AddPointCategoryAccountLevelParams): Promise<{
  signers: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .addPointCategoryAccountLevel(newLevel)
      .accounts({
        admin,
        domainAccount: domainKey,
        pointCategoryAccount: pointCategoryKey,
      })
      .instruction(),
  ];

  return {
    signers: [],
    instructions,
  };
};

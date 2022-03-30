import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Deregister Point Category Account instruction */
export interface DeregisterPointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
}

/**
 * De-registers a Point Category Account
 * @param admin - the admin public key 
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterPointCategoryAccountIx = async ({
  admin,
  connection,
  programId,
}: DeregisterPointCategoryAccountParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    program.methods
      .deregisterPointCategoryAccount()
      .accounts({ admin })
      .instruction()
  ];

  return {
    accounts: [],
    instructions,
  };
};
import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Init instruction */
export interface initializeDomainParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
}

/**
 * Initialize a Domain Account
 * @param admin - the admin public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const initializeDomainIx = async ({
  admin,
  connection,
  programId
}: initializeDomainParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    program.methods
      .initializeDomain('domain1')
      .accounts({admin})
      .instruction()
  ];

  return {    
    accounts: [],
    instructions,
  };
};
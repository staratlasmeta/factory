import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Init instruction */
export interface initializeDomainParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  domain: string  /**the label of the domain account */
}

/**
 * Initialize a Domain Account
 * @param admin - the admin public key
 * @param domain - the label of the domain account
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const initializeDomainIx = async ({
  admin,
  domain,
  connection,
  programId
}: initializeDomainParams): Promise<{ accounts: web3.PublicKey[], instructions: web3.TransactionInstruction[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .initializeDomain(domain)
      .accounts({admin})
      .instruction()
  ];

  return {    
    accounts: [],
    instructions,
  };
};
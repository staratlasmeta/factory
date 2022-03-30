import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Create User Point Account instruction */
export interface CreateUserPointAccountParams extends BaseParams {
  user: PublicKey /** the user public key */;
}

/**
 * Creates a user Point Account
 * @param user - the user public key
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const createUserPointAccountIx = async ({
  user,
  connection,
  programId,
}: CreateUserPointAccountParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    program.methods
      .createUserPointAccount()
      .accounts({ user })
      .instruction()
  ];

  return {
    accounts: [],
    instructions,
  };
};
import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { CreateUserPointAccountParams } from './createUserPointAccountIx'
import { getPointsProgram } from '../utils'
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

/** Params for Create User Point Account instruction with license */
export interface CreateUserPointAccountWithLicenseParams
  extends CreateUserPointAccountParams {
  licenseTokenAccountKey: PublicKey /** the token account for the license to burn */;
  licenseMintAccountKey: PublicKey /** the mint of the license token account */;
}

/**
 * Creates a user Point Account when a license is required
 * @param user - the user public key
 * @param licenseTokenAccountKey - the token account for the license to burn 
 * @param licenseMintAccountKey - the mint of the license token account
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const createUserPointAccountWithLicenseIx = async ({
  user,
  licenseTokenAccountKey,
  licenseMintAccountKey,
  connection,
  programId,
}: CreateUserPointAccountWithLicenseParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    program.methods
      .createUserPointAccountWithLicense()
      .accounts({
        user,
        userTokenAccount: licenseTokenAccountKey,
        licenseMintAccount: licenseMintAccountKey,
        // tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()
  ];

  return {
    accounts: [],
    instructions,
  };
};
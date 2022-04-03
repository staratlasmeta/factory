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
  pointCategoryAccount: PublicKey /** the Point Category Account PublicKey */
}

/**
 * Creates a user Point Account when a license is required
 * @param user - the user public key
 * @param licenseTokenAccountKey - the token account for the license to burn 
 * @param licenseMintAccountKey - the mint of the license token account
 * @param pointCategoryAccount - the Point Category Account PublicKey
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const createUserPointAccountWithLicenseIx = async ({
  user,
  licenseTokenAccountKey,
  licenseMintAccountKey,
  pointCategoryAccount,
  connection,
  programId,
}: CreateUserPointAccountWithLicenseParams): Promise<{ accounts: web3.PublicKey[], instructions: web3.TransactionInstruction[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .createUserPointAccountWithLicense()
      .accounts({
        user,
        pointCategoryAccount,
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
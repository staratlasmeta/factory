import { PublicKey, Keypair } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { CreateUserPointAccountParams } from './createUserPointAccountIx';
import { getPointsProgram } from '../utils';

/** Params for Create User Point Account instruction with license */
export interface CreateUserPointAccountWithLicenseParams
  extends CreateUserPointAccountParams {
  licenseTokenAccountKey: PublicKey /** the token account for the license to burn/transfer */;
  vaultTokenAccountKey?: PublicKey /** the vault token account */;
  licenseMintAccountKey: PublicKey /** the mint of the license token account */;
  pointCategoryKey: PublicKey /** the Point Category Account PublicKey */;
}

/**
 * Creates a user Point Account when a license is required
 * @param user - the user public key
 * @param licenseTokenAccountKey - the token account for the license to burn/transfer
 * @param vaultTokenAccountKey - the vault token account
 * @param licenseMintAccountKey - the mint of the license token account
 * @param pointCategoryKey - the Point Category Account PublicKey
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const createUserPointAccountWithLicenseIx = async ({
  user,
  licenseTokenAccountKey,
  licenseMintAccountKey,
  pointCategoryKey,
  vaultTokenAccountKey,
  connection,
  programId,
}: CreateUserPointAccountWithLicenseParams): Promise<{
  signers?: Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const remainingAccounts = [];
  if (vaultTokenAccountKey) {
    remainingAccounts.push({
      pubkey: vaultTokenAccountKey,
      isWritable: true,
      isSigner: false,
    });
  }

  const instructions = [
    await program.methods
      .createUserPointAccountWithLicense()
      .accounts({
        user,
        pointCategoryAccount: pointCategoryKey,
        userTokenAccount: licenseTokenAccountKey,
        licenseMintAccount: licenseMintAccountKey,
      })
      .remainingAccounts(remainingAccounts)
      .instruction(),
  ];

  return {
    instructions,
  };
};

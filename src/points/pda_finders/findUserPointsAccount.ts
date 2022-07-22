import { PublicKey } from '@solana/web3.js';
import { POINTS_USER_POINTS_ACCOUNT_SEED } from './seeds';

/**
 * Returns the public key and bump seed for the User Points Account
 *
 * @param pointsCategoryAccountKey - Points Category Account public key
 * @param userAccountKey - User's Account public key
 * @param programId - deployed program ID for Points program
 * @returns [User Points Account public key, bump seed]
 */
export async function findUserPointsAccount(
  pointsCategoryAccountKey: PublicKey,
  userAccountKey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      POINTS_USER_POINTS_ACCOUNT_SEED,
      pointsCategoryAccountKey.toBuffer(),
      userAccountKey.toBuffer(),
    ],
    programId
  );
}

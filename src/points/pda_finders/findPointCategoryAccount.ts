import { PublicKey } from '@solana/web3.js';
import { POINT_CATEGORY_ACCOUNT_SEED } from './seeds'

/**
 * Returns the public key and bump seed for the Point Category Account
 *
 * @param label - Point Category Account label
 * @param programId - deployed program ID for Points program
 * @returns [Point Category Account public key, bump seed]
 */
 export async function findPointCategoryAccount(
  label: string,
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [POINT_CATEGORY_ACCOUNT_SEED, Buffer.from(label)],
    programId
  );
}
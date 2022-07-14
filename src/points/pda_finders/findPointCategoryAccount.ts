import { PublicKey } from '@solana/web3.js';
import { POINT_CATEGORY_ACCOUNT_SEED } from './seeds';

/**
 * Returns the public key and bump seed for the Point Category Account
 *
 * @param namespace - Point Category Account namespace
 * @param programId - deployed program ID for Points program
 * @returns [Point Category Account public key, bump seed]
 */
export async function findPointCategoryAccount(
  namespace: number[],
  domainKey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      POINT_CATEGORY_ACCOUNT_SEED,
      domainKey.toBuffer(),
      Buffer.from(Uint8Array.from(namespace)),
    ],
    programId
  );
}

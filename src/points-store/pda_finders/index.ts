import { PublicKey } from '@solana/web3.js';

export const POINTS_STORE_SIGNER_SEED = Buffer.from('store_signer');

/**
 * Returns the public key and bump seed for the PointsStore Signer
 *
 * @param pointsStoreKey - Points Store Account pubkey
 * @param programId - deployed program ID for Points program
 * @returns [PointsStore account public key, bump seed]
 */
export async function findPointsStoreSigner(
  pointsStoreKey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [POINTS_STORE_SIGNER_SEED, pointsStoreKey.toBuffer()],
    programId
  );
}

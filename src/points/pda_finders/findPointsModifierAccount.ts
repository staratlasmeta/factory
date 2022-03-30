import { PublicKey } from '@solana/web3.js';
import { POINT_MODIFIER_SEED } from './seeds'

/**
 * Returns the public key and bump seed for the Points Modifier Account
 *
 * @param pointsCategoryAccountKey - Points Category Account public key
 * @param modifierKey - Modifier public key
 * @param programId - deployed program ID for XP program
 * @returns [Points Modifier Account public key, bump seed]
 */
 export async function findPointsModifierAccount(
  pointsCategoryAccountKey: PublicKey,
  modifierKey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [POINT_MODIFIER_SEED, pointsCategoryAccountKey.toBuffer(), modifierKey.toBuffer()],
    programId
  );
}
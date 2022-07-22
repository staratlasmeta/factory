import { PublicKey } from '@solana/web3.js';
import { POINTS_DOMAIN_ACCOUNT_SEED } from './seeds';

/**
 * Returns the public key and bump seed for the Domain Account
 *
 * @param namespace - Point Category Account name
 * @param programId - deployed program ID for Points program
 * @returns [Domain account public key, bump seed]
 */
export async function findDomainAccount(
  namespace: number[],
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [POINTS_DOMAIN_ACCOUNT_SEED, Buffer.from(Uint8Array.from(namespace))],
    programId
  );
}

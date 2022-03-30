import { PublicKey } from '@solana/web3.js';
import { DOMAIN_ACCOUNT_SEED } from './seeds'

/**
 * Returns the public key and bump seed for the Domain Account
 *
 * @param programId - deployed program ID for Points program
 * @returns [Domain account public key, bump seed]
 */
 export async function findDomainAccount (
    programId: PublicKey
  ): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddress([DOMAIN_ACCOUNT_SEED], programId);
  }
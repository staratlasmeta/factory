import { PublicKey } from '@solana/web3.js';
import {REGISTERED_STAKE} from './seeds';

/**
 * Returns the public key and bump seed for a registered stake account
 * */
export async function getRegisteredStake(
    programId: PublicKey
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
            REGISTERED_STAKE
        ],
        programId,
    );
}

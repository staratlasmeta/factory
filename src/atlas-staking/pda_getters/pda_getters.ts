import { PublicKey } from '@solana/web3.js';
import {REGISTERED_STAKE, STAKING_ACCOUNT} from './seeds';

/**
 * Returns the public key and bump seed for a registered stake account
 * */
export async function getRegisteredStake(
    programId: PublicKey,
    authority: PublicKey,
    stakeToken: PublicKey,
    rewardToken: PublicKey
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
            REGISTERED_STAKE,
            authority.toBuffer(),
            stakeToken.toBuffer(),
            rewardToken.toBuffer(),
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for a staking account
 * */
export async function getStakingAccount(
    programId: PublicKey,
    user: PublicKey,
    stakeToken: PublicKey,
    rewardToken: PublicKey
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
            STAKING_ACCOUNT,
            user.toBuffer(),
            stakeToken.toBuffer(),
            rewardToken.toBuffer(),
        ],
        programId,
    );
}

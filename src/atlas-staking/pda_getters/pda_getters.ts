import { PublicKey } from '@solana/web3.js';
import {
  REGISTERED_STAKE,
  REWARD_AUTH,
  STAKING_ACCOUNT,
  STAKING_ESCROW,
  STAKING_VARS
} from './seeds';

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
    programId
  );
}

/**
 * Returns the public key and bump seed for a staking account
 * */
export async function getStakingAccount(
  programId: PublicKey,
  user: PublicKey,
  registeredStake: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [STAKING_ACCOUNT, user.toBuffer(), registeredStake.toBuffer()],
    programId
  );
}

/**
 * Returns the public key and bump seed for the staking program variables account
 *
 * @param programId - Deployed program ID for the Staking Program 
 */
export async function getStakingVarsAccount(
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([STAKING_VARS], programId);
}

/**
 * Returns the public key and bump seed for a user's token escrow
 * */
export async function getTokenEscrow(
  programId: PublicKey,
  user: PublicKey,
  registeredStake: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [STAKING_ESCROW, user.toBuffer(), registeredStake.toBuffer()],
    programId
  );
}

/**
 * Returns the public key and bump seed for a registered stake's reward vault authority
 * */
export async function getRewardAuth(
  programId: PublicKey,
  registeredStake: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [REWARD_AUTH, registeredStake.toBuffer()],
    programId
  );
}

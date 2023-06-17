import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { Idl } from '@project-serum/anchor/dist/esm';
import { PublicKey } from '@solana/web3.js';
import { StakingAccountItem } from '../types';
import { getStakingIdl } from '../utils';
import {
  REGISTERED_STAKE,
  REWARD_AUTH,
  STAKING_ACCOUNT,
  STAKING_ESCROW,
  STAKING_VARS,
} from './seeds';

/**
 * Returns the public key and bump seed for a registered stake account
 * */
export function getRegisteredStake(
  programId: PublicKey,
  authority: PublicKey,
  stakeToken: PublicKey,
  rewardToken: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
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
export function getStakingAccount(
  programId: PublicKey,
  user: PublicKey,
  registeredStake: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [STAKING_ACCOUNT, user.toBuffer(), registeredStake.toBuffer()],
    programId
  );
}

export async function getStakingAccountsForRegisteredStake(
  connection: web3.Connection,
  programId: PublicKey,
  registeredStake: PublicKey
): Promise<StakingAccountItem[]> {
  const provider = new AnchorProvider(connection, null, null);
  const idl = getStakingIdl(programId);
  const program = new Program(idl as Idl, programId, provider);
  const filter = [
    {
      dataSize: 171,
    },
    {
      memcmp: {
        offset: 40,
        bytes: registeredStake.toBase58(),
      },
    },
  ];
  const stakingAccounts = await program.account.stakingAccount.all(filter);

  return stakingAccounts as StakingAccountItem[];
}

/**
 * Returns the public key and bump seed for the staking program variables account
 *
 * @param programId - Deployed program ID for the Staking Program
 */
export function getStakingVarsAccount(
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync([STAKING_VARS], programId);
}

/**
 * Returns the public key and bump seed for a user's token escrow
 * */
export function getTokenEscrow(
  programId: PublicKey,
  user: PublicKey,
  registeredStake: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [STAKING_ESCROW, user.toBuffer(), registeredStake.toBuffer()],
    programId
  );
}

/**
 * Returns the public key and bump seed for a registered stake's reward vault authority
 * */
export function getRewardAuth(
  programId: PublicKey,
  registeredStake: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [REWARD_AUTH, registeredStake.toBuffer()],
    programId
  );
}

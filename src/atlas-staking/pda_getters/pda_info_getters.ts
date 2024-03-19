import { web3 } from '@coral-xyz/anchor';
import { getStakingProgram } from './../utils/getStakingProgram';
import {
  RegisteredStakeAccountInfo,
  StakingAccountInfo,
  StakingVarsAccountInfo,
} from './../types/stakingProgramAccounts';
import { getStakingVarsAccount } from './pda_getters';

/**
 * Returns the contents of the Registered Stake account as detailed in the RegisteredStakeAccountInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for Staking Program
 * */
export async function getRegisteredStakeAccountInfo(
  connection: web3.Connection,
  registeredStake: web3.PublicKey,
  programId: web3.PublicKey,
): Promise<RegisteredStakeAccountInfo> {
  const program = getStakingProgram({ connection, programId });

  const registeredStakeAccountInfo =
    await program.account.registeredStake.fetch(registeredStake);
  return registeredStakeAccountInfo as RegisteredStakeAccountInfo;
}

/**
 * Returns the contents of the Staking account as detailed in the StakingAccount interface
 *
 * @param connection
 * @param programId - Deployed program ID for Staking Program
 * */
export async function getStakingAccountInfo(
  connection: web3.Connection,
  stakingAccount: web3.PublicKey,
  programId: web3.PublicKey,
): Promise<StakingAccountInfo> {
  const program = getStakingProgram({ connection, programId });

  const stakingAccountInfo =
    await program.account.stakingAccount.fetch(stakingAccount);
  return stakingAccountInfo as StakingAccountInfo;
}

/**
 * Returns the contents of the staking vars account as detailed in the StakingVarsInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for the Staking Program
 */
export async function getStakingVarsAccountInfo(
  connection: web3.Connection,
  programId: web3.PublicKey,
): Promise<StakingVarsAccountInfo> {
  const program = getStakingProgram({
    connection: connection,
    programId: programId,
  });

  const [stakingVarsAccount] = await getStakingVarsAccount(programId);
  const stakingVarsInfo =
    await program.account.stakingVars.fetch(stakingVarsAccount);
  return stakingVarsInfo as StakingVarsAccountInfo;
}

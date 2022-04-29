import { web3 } from '@project-serum/anchor';
import { getRegisteredStake, getStakingAccount } from './pda_getters';
import { getStakingProgram } from './../utils/getStakingProgram';
import { RegisteredStakeAccountInfo, StakingAccountInfo } from './../types/stakingProgramAccounts';

/**
 * Returns the contents of the Registered Stake account as detailed in the RegisteredStakeAccountInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for Staking Program
 * */
export async function getRegisteredStakeAccountInfo(
    connection: web3.Connection,
    programId: web3.PublicKey,
    authority: web3.PublicKey,
    stakeToken: web3.PublicKey,
    rewardToken: web3.PublicKey,
): Promise<RegisteredStakeAccountInfo> {
    const program = getStakingProgram({connection, programId});

    const [registeredStakeAccount] = await getRegisteredStake(programId, authority, stakeToken, rewardToken);
    const registeredStakeAccountInfo = await program.account.registeredStake.fetch(registeredStakeAccount);
    return registeredStakeAccountInfo as RegisteredStakeAccountInfo
}

/**
 * Returns the contents of the Staking account as detailed in the StakingAccount interface
 *
 * @param connection
 * @param programId - Deployed program ID for Staking Program
 * */
export async function getStakingAccountInfo(
    connection: web3.Connection,
    programId: web3.PublicKey,
    user: web3.PublicKey,
    stakeToken: web3.PublicKey,
    rewardToken: web3.PublicKey,
): Promise<StakingAccountInfo> {
    const program = getStakingProgram({connection, programId});

    const [stakingAccount] = await getStakingAccount(programId, user, stakeToken, rewardToken);
    const stakingAccountInfo = await program.account.stakingAccount.fetch(stakingAccount);
    return stakingAccountInfo as StakingAccountInfo
}

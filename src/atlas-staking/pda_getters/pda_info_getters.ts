import { web3 } from '@project-serum/anchor';
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
    registeredStake: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<RegisteredStakeAccountInfo> {
    const program = getStakingProgram({connection, programId});

    const registeredStakeAccountInfo = await program.account.registeredStake.fetch(registeredStake);
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
    stakingAccount: web3.PublicKey,
    programId: web3.PublicKey,
): Promise<StakingAccountInfo> {
    const program = getStakingProgram({connection, programId});

    const stakingAccountInfo = await program.account.stakingAccount.fetch(stakingAccount);
    return stakingAccountInfo as StakingAccountInfo
}

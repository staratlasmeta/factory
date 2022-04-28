import { web3 } from '@project-serum/anchor';
import { getRegisteredStake } from './pda_getters';
import { getStakingProgram } from './../utils/getStakingProgram';
import { RegisteredStakeAccountInfo } from './../types/stakingProgramAccounts';

/**
 * Returns the contents of the Registered Stake account as detailed in the RegisteredStakeAccountInfo interface
 *
 * @param connection
 * @param programId - Deployed program ID for Staking Program
 * */
export async function getRegisteredStakeAccountInfo(
    connection: web3.Connection,
    programId: web3.PublicKey,
): Promise<RegisteredStakeAccountInfo> {
    const program = getStakingProgram({connection, programId});

    const [registeredStakeAccount] = await getRegisteredStake(programId);
    const registeredStakeAccountInfo = await program.account.registeredStake.fetch(registeredStakeAccount);
    return registeredStakeAccountInfo as RegisteredStakeAccountInfo
}

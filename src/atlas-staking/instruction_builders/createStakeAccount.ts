import { web3 } from '@project-serum/anchor';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface createStakingAccount extends BaseParams {
    user: web3.PublicKey,
    registeredStake: web3.PublicKey
}

/**
 * Returns an instruction which creates a Staking Account to hold a user's staked token information
 *
 * @param connection
 * @param user - Public key of user creating the staking account
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param programId - Deployed program ID for Staking program
 */
export async function createStakingAccountInstruction({
    connection,
    user,
    registeredStake,
    programId
}: createStakingAccount): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    const instructions = [
        await program.methods
            .createStakingAccount()
            .accounts({
                user,
                registeredStake
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

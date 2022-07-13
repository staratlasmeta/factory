import { web3 } from '@project-serum/anchor';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface CancelUnstakeParams extends BaseStakingParams {
    user: web3.PublicKey,
    registeredStake: web3.PublicKey,
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param user - Public key of user creating the staking account
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param programId - Deployed program ID for Staking program
 */
export async function cancelUnstakeInstruction({
    connection,
    user,
    registeredStake,
    programId
}: CancelUnstakeParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    const instructions = [
        await program.methods
            .cancelUnstake()
            .accounts({
                user,
                registeredStake,
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}


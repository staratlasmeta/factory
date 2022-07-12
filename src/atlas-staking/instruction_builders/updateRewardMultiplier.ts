import { BN, web3 } from '@project-serum/anchor';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface updateRewardMultiplierParams extends BaseParams {
    authority: web3.PublicKey
    registeredStake: web3.PublicKey,
    rewardMultiplier: number,
    newStakingPeriod: number,
}

/**
 * Returns an instruction which updates the reward multiplier associated with a registered stake
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param rewardMultiplier - New reward rate multiplier
 * @param programId - Deployed program ID for Staking program
 */
export async function updateRewardMultiplierInstruction({
    connection,
    authority,
    rewardMultiplier,
    registeredStake,
    newStakingPeriod,
    programId
}: updateRewardMultiplierParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    const instructions = [
        await program.methods
            .updateRewardMultiplier(
                new BN(rewardMultiplier),
                newStakingPeriod,
            )
            .accounts({
                authority,
                registeredStake
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

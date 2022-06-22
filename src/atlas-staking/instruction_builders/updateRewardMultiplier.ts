import { BN, web3 } from '@project-serum/anchor';
import { getRegisteredStake } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface updateRewardMultiplierParams extends BaseParams {
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
    rewardMultiplier: number,
    newStakingPeriod: number,
}

/**
 * Returns an instruction which updates the reward multiplier associated with a registered stake
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param rewardMultiplier - New reward rate multiplier
 * @param stakeMint - Public key of token mint associated with stake
 * @param rewardMint - Public key of token mint being rewarded by stake
 * @param programId - Deployed program ID for Staking program
 */
export async function updateRewardMultiplierInstruction({
    connection,
    authority,
    rewardMultiplier,
    stakeMint,
    rewardMint,
    newStakingPeriod,
    programId
}: updateRewardMultiplierParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});
    const [registeredStake] = await getRegisteredStake(programId, authority, stakeMint, rewardMint);

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

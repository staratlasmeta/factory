import { BN, web3 } from '@project-serum/anchor';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface updateStakeParams extends BaseParams {
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
    rewardMultiplier: number,
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
export async function updateStakeInstruction({
    connection,
    authority,
    rewardMultiplier,
    stakeMint,
    rewardMint,
    programId
}: updateStakeParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    const instructions = [
        await program.methods
            .updateStake(
                new BN(rewardMultiplier),
            )
            .accounts({
                authority,
                stakeMint,
                rewardMint,
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

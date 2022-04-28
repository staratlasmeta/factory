import { BN, web3 } from '@project-serum/anchor';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface registerStakeParams extends BaseParams {
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
    rewardMultiplier: number,
    cooldownPeriod: number,
}

/**
 * Returns an instruction which registers a token for staking
 *
 * @param connection
 * @param authorityAccount - Public key of account which will be set as the staking program authority
 * @param programId - Deployed program ID for Staking program
 */
export async function registerStakeInstruction({
    connection,
    authority,
    rewardMultiplier,
    stakeMint,
    rewardMint,
    cooldownPeriod,
    programId
}: registerStakeParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    const instructions = [
        await program.methods
            .registerStake(
                new BN(rewardMultiplier),
                new BN(cooldownPeriod),
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

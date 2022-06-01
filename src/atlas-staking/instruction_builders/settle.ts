import { web3 } from '@project-serum/anchor';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface SettleParams extends BaseParams {
    authority: web3.PublicKey,
    user: web3.PublicKey,
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
    updatedStakingPeriod: number,
}

/**
 * Returns an instruction which settles a user's staking account, updating the active stake to match total stake, calculating pending rewards, and updating
 * corresponding timestamps
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param user - Public key of user whose staking account is being updated
 * @param stakeMint - Public key for mint of tokens being staked
 * @param rewardMint - Public key for mint of tokens being received in reward
 * @param programId - Deployed program ID for Staking program
 */
export async function createSettleStakingAccountInstruction({
    connection,
    authority,
    user,
    stakeMint,
    rewardMint,
    updatedStakingPeriod,
    programId
}: SettleParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    const instructions = [
        await program.methods
            .settle(
                updatedStakingPeriod
            )
            .accounts({
                user,
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

import { web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface HarvestRewardsParams extends BaseStakingParams {
    user: web3.PublicKey,
    rewardMint: web3.PublicKey,
    registeredStake: web3.PublicKey,
    stakingAccount: web3.PublicKey,
}

/**
 * Returns an instruction which transfers a user's pending rewards to their wallet
 *
 * @param connection
 * @param user - Public key of user creating the staking account
 * @param rewardMint - Public key for mint of tokens being received in reward
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param stakingAccount - Public key of user's `StakingAccount` associated with the provided `RegisteredStake`
 * @param programId - Deployed program ID for Staking program
 */
export async function harvestRewardsInstruction({
    connection,
    user,
    rewardMint,
    registeredStake,
    stakingAccount,
    programId
}: HarvestRewardsParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    // Derive ATA for user's reward account
    const userRewardAccount = await associatedAddress({owner: user, mint: rewardMint}); // TODO: Use token account getter here
    const rewardAta = await associatedAddress({owner: registeredStake, mint: rewardMint}); 

    const instructions = [
        await program.methods
            .harvest()
            .accounts({
                user,
                rewardMint,
                registeredStake,
                stakingAccount,
                userRewardAccount,
                rewardAta
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

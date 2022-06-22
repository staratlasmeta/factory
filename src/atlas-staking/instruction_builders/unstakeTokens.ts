import { web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { getRegisteredStake } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface unstakeTokensParams extends BaseParams {
    user: web3.PublicKey,
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param user - Public key of user creating the staking account
 * @param stakeMint - Public key for mint of tokens being staked
 * @param rewardMint - Public key for mint of tokens being received in reward
 * @param programId - Deployed program ID for Staking program
 */
export async function unstakeTokensInstruction({
    connection,
    authority,
    user,
    stakeMint,
    rewardMint,
    programId
}: unstakeTokensParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});

    // Derive ATA for user's reward account
    const userRewardAccount = await associatedAddress({owner: user, mint: rewardMint});
    const [registeredStake] = await getRegisteredStake(programId, authority, stakeMint, rewardMint);
    const rewardAta = await associatedAddress({owner: registeredStake, mint: rewardMint});

    const instructions = [
        await program.methods
            .unstakeTokens()
            .accounts({
                user,
                authority,
                stakeMint,
                rewardMint,
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

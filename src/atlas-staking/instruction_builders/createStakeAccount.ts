import { web3 } from '@project-serum/anchor';
import { getRegisteredStake } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface createStakingAccount extends BaseParams {
    user: web3.PublicKey,
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
}

/**
 * Returns an instruction which creates a Staking Account to hold a user's staked token information
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param user - Public key of user creating the staking account
 * @param stakeMint - Public key for mint of tokens being staked
 * @param rewardMint - Public key for mint of tokens being received in reward
 * @param programId - Deployed program ID for Staking program
 */
export async function createStakingAccountInstruction({
    connection,
    authority,
    user,
    stakeMint,
    rewardMint,
    programId
}: createStakingAccount): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});
    const [registeredStake] = await getRegisteredStake(programId, authority, stakeMint, rewardMint);

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

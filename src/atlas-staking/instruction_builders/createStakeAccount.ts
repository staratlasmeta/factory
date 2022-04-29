import { web3 } from '@project-serum/anchor';
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
 * @param authorityAccount - Public key of account which will be set as the staking program authority
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

    const instructions = [
        await program.methods
            .createStakingAccount()
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

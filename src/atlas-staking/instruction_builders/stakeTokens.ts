import { BN, web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { getRegisteredStake, getStakingAccount } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseParams } from './baseParams';

export interface stakeTokensParams extends BaseParams {
    user: web3.PublicKey,
    tokenSource: web3.PublicKey,
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    rewardMint: web3.PublicKey,
    stakeQuantity: number
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param authority - Public key of account which registered the stake
 * @param user - Public key of user creating the staking account
 * @param tokenSource - Public key for token which user is depositing from
 * @param stakeMint - Public key for mint of tokens being staked
 * @param rewardMint - Public key for mint of tokens being received in reward
 * @param stakeQuantity - Number of tokens to be staked
 * @param programId - Deployed program ID for Staking program
 */
export async function stakeTokensInstruction({
    connection,
    authority,
    user,
    stakeMint,
    rewardMint,
    tokenSource,
    stakeQuantity,
    programId
}: stakeTokensParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});
    const [registeredStake] = await getRegisteredStake(programId, authority, stakeMint, rewardMint);
    const [stakingAccount] = await getStakingAccount(programId, user, registeredStake);
    const tokenEscrow = await associatedAddress({ owner: stakingAccount, mint: stakeMint});

    const instructions = [
        await program.methods
            .stakeTokens(new BN(stakeQuantity))
            .accounts({
                user,
                authority,
                stakeMint,
                tokenSource,
                registeredStake,
                tokenEscrow,
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

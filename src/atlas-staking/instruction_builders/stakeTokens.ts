import { BN, web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface StakeTokensParams extends BaseStakingParams {
    user: web3.PublicKey,
    tokenSource: web3.PublicKey,
    stakeMint: web3.PublicKey,
    registeredStake: web3.PublicKey,
    stakingAccount: web3.PublicKey,
    stakeQuantity: number
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param user - Public key of user creating the staking account
 * @param stakeMint - Public key for mint of tokens being staked
 * @param tokenSource - Public key for token which user is depositing from
 * @param stakeQuantity - Number of tokens to be staked
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param stakingAccount - Public key of user's `StakingAccount` associated with the provided `RegisteredStake`
 * @param programId - Deployed program ID for Staking program
 */
export async function stakeTokensInstruction({
    connection,
    user,
    stakeMint,
    tokenSource,
    stakeQuantity,
    registeredStake,
    stakingAccount,
    programId
}: StakeTokensParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});
    const tokenEscrow = await associatedAddress({ owner: stakingAccount, mint: stakeMint});

    const instructions = [
        await program.methods
            .stakeTokens(new BN(stakeQuantity))
            .accounts({
                user,
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

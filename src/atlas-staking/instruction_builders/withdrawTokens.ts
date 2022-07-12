import { BaseParams } from './baseParams';
import { web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from  '@solana/spl-token';
import { getStakingProgram } from '../utils';

export interface withdrawTokensParams extends BaseParams {
    user: web3.PublicKey,
    tokenSource: web3.PublicKey,
    authority: web3.PublicKey
    stakeMint: web3.PublicKey,
    registeredStake: web3.PublicKey,
    stakingAccount: web3.PublicKey,
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param authority - Public key of account which registered the stake
 * @param user - Public key of user creating the staking account
 * @param tokenSource - Public key for token which user is depositing from
 * @param stakeMint - Public key for mint of tokens being staked
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param stakingAccount - Public key of user's `StakingAccount` associated with the provided `RegisteredStake`
 * @param programId - Deployed program ID for Staking program
 */
export async function withdrawTokensInstruction({
    connection,
    authority,
    user,
    stakeMint,
    registeredStake,
    stakingAccount,
    tokenSource,
    programId
}: withdrawTokensParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});
    const tokenEscrow = await associatedAddress({ owner: stakingAccount, mint: stakeMint});

    const instructions = [];
    const possibleTokenSource = await connection.getParsedTokenAccountsByOwner(
        user,
        {
            mint: stakeMint,
        }
    );

    if (possibleTokenSource.value.length === 0) {
        tokenSource = await associatedAddress({owner: user, mint: stakeMint});
        instructions.push(
            Token.createAssociatedTokenAccountInstruction(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                stakeMint,
                tokenSource,
                user,
                user
            )
        )
    }

    const ix = await program.methods
            .withdrawTokens()
            .accounts({
                user,
                authority,
                stakeMint,
                tokenSource,
                registeredStake,
                stakingAccount,
                tokenEscrow,
            })
            .instruction();

    instructions.push(ix);

    return {
        accounts: [],
        instructions,
    };
}

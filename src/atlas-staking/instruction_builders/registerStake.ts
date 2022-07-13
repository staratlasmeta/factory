import { BN, web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { getRegisteredStake } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface RegisterStakeParams extends BaseStakingParams {
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
}: RegisterStakeParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getStakingProgram({connection, programId});
    const [registeredStake] = await getRegisteredStake(programId, authority, stakeMint, rewardMint);
    const rewardAta = await associatedAddress({owner: registeredStake, mint: rewardMint});

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
                rewardAta
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

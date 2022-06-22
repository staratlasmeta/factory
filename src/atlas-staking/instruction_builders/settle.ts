import { web3 } from '@project-serum/anchor';
import { getRegisteredStake, getStakingAccount } from '../pda_getters';
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
    const [registeredStake] = await getRegisteredStake(programId, authority, stakeMint, rewardMint);
    const [stakingAccount] = await getStakingAccount(programId, user, registeredStake);

    const instructions = [
        await program.methods
            .settle(
                updatedStakingPeriod
            )
            .accounts({
                authority,
                registeredStake,
                stakingAccount,
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

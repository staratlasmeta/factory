import { web3 } from '@project-serum/anchor';
import { FactoryReturn } from '../../types';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface SettleParams extends BaseStakingParams {
    authority: web3.PublicKey,
    registeredStake: web3.PublicKey,
    stakingAccount: web3.PublicKey,
    updatedStakingPeriod: number,
}

/**
 * Returns an instruction which settles a user's staking account, updating the active stake to match total stake, calculating pending rewards, and updating
 * corresponding timestamps
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param user - Public key of user whose staking account is being updated
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param stakingAccount - Public key of user's `StakingAccount` associated with the provided `RegisteredStake`
 * @param updatedStakingPeriod - The staking period which the target staking account should be migrated to
 * @param programId - Deployed program ID for Staking program
 */
export async function createSettleStakingAccountInstruction({
    connection,
    authority,
    registeredStake,
    stakingAccount,
    updatedStakingPeriod,
    programId
}: SettleParams): Promise<FactoryReturn> {
    const program = getStakingProgram({connection, programId});

    const ixSet: FactoryReturn = {
        instructions: [],
        signers: []
    }

    const ix = await program.methods
            .settle(
                updatedStakingPeriod
            )
            .accounts({
                authority,
                registeredStake,
                stakingAccount,
            })
            .instruction();

    ixSet.instructions.push(ix);

    return ixSet;
}

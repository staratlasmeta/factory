import { BN, web3 } from '@coral-xyz/anchor';
import { FactoryReturn } from '../../types';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface UpdateRewardMultiplierParams extends BaseStakingParams {
  authority: web3.PublicKey;
  registeredStake: web3.PublicKey;
  rewardMultiplier: number;
  newStakingPeriod: number;
}

/**
 * Returns an instruction which updates the reward multiplier associated with a registered stake
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param rewardMultiplier - New reward rate multiplier
 * @param programId - Deployed program ID for Staking program
 */
export async function updateRewardMultiplierInstruction({
  connection,
  authority,
  rewardMultiplier,
  registeredStake,
  newStakingPeriod,
  programId,
}: UpdateRewardMultiplierParams): Promise<FactoryReturn> {
  const program = getStakingProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    instructions: [],
    signers: [],
  };

  const ix = await program.methods
    .updateRewardMultiplier(new BN(rewardMultiplier), newStakingPeriod)
    .accounts({
      authority,
      registeredStake,
    })
    .instruction();

  ixSet.instructions.push(ix);

  return ixSet;
}

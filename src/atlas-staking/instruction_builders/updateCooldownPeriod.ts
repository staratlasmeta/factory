import { BN, web3 } from '@coral-xyz/anchor';
import { FactoryReturn } from '../../types';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface UpdateCooldownPeriodParams extends BaseStakingParams {
  authority: web3.PublicKey;
  registeredStake: web3.PublicKey;
  cooldownPeriod: number;
}

/**
 * Returns an instruction which updates the cooldown period associated with a registered stake
 *
 * @param connection
 * @param authority- Public key of account which registered the stake
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param cooldownPeriod - Time in seconds that a user must wait to withdraw
 * @param programId - Deployed program ID for Staking program
 */
export async function updateCooldownPeriodInstruction({
  connection,
  authority,
  registeredStake,
  cooldownPeriod,
  programId,
}: UpdateCooldownPeriodParams): Promise<FactoryReturn> {
  const program = getStakingProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    instructions: [],
    signers: [],
  };

  const ix = await program.methods
    .updateCooldownPeriod(new BN(cooldownPeriod))
    .accounts({
      authority,
      registeredStake,
    })
    .instruction();

  ixSet.instructions.push(ix);

  return ixSet;
}

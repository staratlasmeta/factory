import { web3 } from '@project-serum/anchor';
import { FactoryReturn } from '../../types';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface CreateStakingAccount extends BaseStakingParams {
  user: web3.PublicKey;
  registeredStake: web3.PublicKey;
}

/**
 * Returns an instruction which creates a Staking Account to hold a user's staked token information
 *
 * @param connection
 * @param user - Public key of user creating the staking account
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param programId - Deployed program ID for Staking program
 */
export async function createStakingAccountInstruction({
  connection,
  user,
  registeredStake,
  programId,
}: CreateStakingAccount): Promise<FactoryReturn> {
  const program = getStakingProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    instructions: [],
    signers: [],
  };

  const ix = await program.methods
    .createStakingAccount()
    .accounts({
      user,
      registeredStake,
    })
    .instruction();

  ixSet.instructions.push(ix);

  return ixSet;
}

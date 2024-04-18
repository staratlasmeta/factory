import { web3 } from '@coral-xyz/anchor';
import { FactoryReturn } from '../../types';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface InitStakingParameters extends BaseStakingParams {
  updateAuthorityAccount: web3.PublicKey;
}

/**
 * Returns an instruction which initializes a staking program with a specified update authority
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of account which will be set as the program's upddate authority
 * @param programId - Deployed program ID for staking program
 */
export async function createInitializeStakingInstruction({
  connection,
  updateAuthorityAccount,
  programId,
}: InitStakingParameters): Promise<FactoryReturn> {
  const program = getStakingProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  const ix = await program.methods
    .initializeStaking()
    .accounts({ updateAuthorityAccount })
    .instruction();

  ixSet.instructions.push(ix);
  return ixSet;
}

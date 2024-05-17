import { BN, web3 } from '@coral-xyz/anchor';
import { associatedAddress } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { FactoryReturn } from '../../types';
import { getRegisteredStake } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface RegisterStakeParams extends BaseStakingParams {
  authority: web3.PublicKey;
  stakeMint: web3.PublicKey;
  rewardMint: web3.PublicKey;
  rewardMultiplier: number;
  cooldownPeriod: number;
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
  programId,
}: RegisterStakeParams): Promise<FactoryReturn> {
  const program = getStakingProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    instructions: [],
    signers: [],
  };

  const [registeredStake] = getRegisteredStake(
    programId,
    authority,
    stakeMint,
    rewardMint,
  );

  const rewardAta = await associatedAddress({
    owner: registeredStake,
    mint: rewardMint,
  });

  const ix = await program.methods
    .registerStake(new BN(rewardMultiplier), new BN(cooldownPeriod))
    .accounts({
      authority,
      stakeMint,
      rewardMint,
      rewardAta,
    })
    .instruction();

  ixSet.instructions.push(ix);
  return ixSet;
}

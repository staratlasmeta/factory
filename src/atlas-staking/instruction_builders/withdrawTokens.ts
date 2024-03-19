import { BaseStakingParams } from './baseParams';
import { web3 } from '@coral-xyz/anchor';
import { associatedAddress } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { getStakingProgram } from '../utils';
import { FactoryReturn } from '../../types';
import { getTokenAccount } from '../../util';

export interface WithdrawTokensParams extends BaseStakingParams {
  user: web3.PublicKey;
  authority: web3.PublicKey;
  stakeMint: web3.PublicKey;
  registeredStake: web3.PublicKey;
  stakingAccount: web3.PublicKey;
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param authority - Public key of account which registered the stake
 * @param user - Public key of user creating the staking account
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
  programId,
}: WithdrawTokensParams): Promise<FactoryReturn> {
  const program = getStakingProgram({ connection, programId });
  const tokenEscrow = await associatedAddress({
    owner: stakingAccount,
    mint: stakeMint,
  });

  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  let tokenAccount: web3.PublicKey | web3.Keypair = null;
  let tokenSource: web3.PublicKey = null;

  const response = await getTokenAccount(connection, user, stakeMint);
  tokenAccount = response.tokenAccount;
  if ('createInstruction' in response) {
    ixSet.instructions.push(...response.createInstruction);
  }

  if (tokenAccount instanceof web3.Keypair) {
    tokenSource = tokenAccount.publicKey;
    ixSet.signers.push(tokenAccount);
  } else {
    tokenSource = tokenAccount;
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

  ixSet.instructions.push(ix);

  return ixSet;
}

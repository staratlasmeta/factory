import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for XP Modify instruction */
export interface ModifyPointsParams extends BaseParams {
  user: PublicKey /** the admin public key */;
  newXpValue: BN /** the new XP value */;
  modifierKey: PublicKey /** the modifier public key */;
}

/**
 * Modifies a user XP account
 * @param param - the input parameters
 */
export const modifyPointsIx = async ({
  user,
  newXpValue,
  modifierKey,
  connection,
  programId,
}: ModifyPointsParams) => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .modifyPoints(newXpValue)
      .accounts({
        userPointsAccount: user,
        modifier: modifierKey,
      })
      .instruction(),
  ];

  return {
    accounts: [],
    instructions,
  };
};

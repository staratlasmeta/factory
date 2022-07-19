import { PublicKey, Keypair, TransactionInstruction } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram, getUserPointsAccount } from '../utils';

/** Params for XP Modify instruction */
export interface SpendPointsParams extends BaseParams {
  userPointsAccountKey: PublicKey /** the user points account public key */;
  pointCategoryKey?: PublicKey /** the point category account public key */;
  pointsValue: BN /** the amount of points to spend */;
  modifierKey: PublicKey /** the modifier public key */;
  pointsModifierAccountKey: PublicKey /** the points modifier account public key */;
}

/**
 * Spends a user XP account points
 * @param userPointsAccountKey - the user points account public key
 * @param pointCategoryKey - the admin public key
 * @param pointsValue - the amount of points to spend
 * @param modifierKey - the modifier public key
 * @param pointsModifierAccountKey - the points modifier account public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const spendPointsIx = async ({
  userPointsAccountKey,
  pointCategoryKey,
  pointsValue,
  modifierKey,
  pointsModifierAccountKey,
  connection,
  programId,
}: SpendPointsParams): Promise<{
  signers?: Keypair[];
  instructions: TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  let thisPointCategoryKey = pointCategoryKey;

  if (thisPointCategoryKey == null) {
    const userPointsAcc = await getUserPointsAccount({
      userPointsAccountKey,
      connection,
      programId,
    });
    thisPointCategoryKey = userPointsAcc.pointCategory;
  }

  if (!thisPointCategoryKey) {
    throw new Error('Points Category Account not found');
  }

  const instructions = [
    await program.methods
      .spendPoints(pointsValue)
      .accounts({
        userPointsAccount: userPointsAccountKey,
        pointCategoryAccount: thisPointCategoryKey,
        pointsModifierAccount: pointsModifierAccountKey,
        spender: modifierKey,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

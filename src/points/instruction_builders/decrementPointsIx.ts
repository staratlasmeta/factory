import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import {
  getPointsProgram,
  getPointCategoryAccount,
  getUserPointsAccount,
} from '../utils';

/** Params for XP Modify instruction */
export interface DecrementPointsParams extends BaseParams {
  userPointsAccountKey: PublicKey /** the user points account public key */;
  pointCategoryKey?: PublicKey /** the point category account public key */;
  pointsValue: BN /** the amount of points to decrement */;
  modifierKey: PublicKey /** the modifier public key */;
  pointsModifierAccountKey: PublicKey /** the points modifier account public key */;
}

/**
 * Decrements a user XP account points
 * @param userPointsAccountKey - the user points account public key
 * @param pointCategoryKey - the admin public key
 * @param pointsValue - the amount of points to decrement
 * @param modifierKey - the modifier public key
 * @param pointsModifierAccountKey - the points modifier account public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const decrementPointsIx = async ({
  userPointsAccountKey,
  pointCategoryKey,
  pointsValue,
  modifierKey,
  pointsModifierAccountKey,
  connection,
  programId,
}: DecrementPointsParams) => {
  const program = getPointsProgram(connection, programId);

  const userPointsAcc = await getUserPointsAccount({
    userPointsAccountKey,
    connection,
    programId,
  });

  const thisPointCategoryKey = pointCategoryKey || userPointsAcc.pointCategory;

  if (!thisPointCategoryKey) {
    throw new Error('Points Category Account not found');
  }

  const pointsCategoryAcc = await getPointCategoryAccount({
    pointCategoryAccountKey: thisPointCategoryKey,
    connection,
    programId,
  });

  const newPointsValue = userPointsAcc.earnedPoints.sub(pointsValue);
  let newLevel = 0;

  for (let index = 0; index < pointsCategoryAcc.levels.length; index++) {
    const levelPoints = pointsCategoryAcc.levels[index];
    if (levelPoints.gt(newPointsValue)) {
      break;
    }
    newLevel += 1;
  }

  const instructions = [
    await program.methods
      .decrementPoints(pointsValue, newLevel)
      .accounts({
        userPointsAccount: userPointsAccountKey,
        pointCategoryAccount: thisPointCategoryKey,
        pointsModifierAccount: pointsModifierAccountKey,
        modifier: modifierKey,
      })
      .instruction(),
  ];

  return {
    signers: [],
    instructions,
  };
};

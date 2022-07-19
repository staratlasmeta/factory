import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsStoreProgram } from '../utils';
import { findPointsStoreSigner } from '../pda_finders';

/** Params for Buy From Point Store instruction */
export interface BuyFromPointsStoreParams extends BaseParams {
  amount: BN /** the quantity of tokens to buy */;
  bank: PublicKey /** the public key of the bank for this points store */;
  tokensTo: PublicKey /** Where the remaining store items are sent */;
  pointsCategoryKey: PublicKey /** the Points Category public key */;
  pointsModifierKey: PublicKey /** the Points Modifier public key */;
  pointsProgramId: PublicKey /** the Points Program public key */;
  store: PublicKey /** the Points Store Account public key */;
  user: PublicKey /** the user public key */;
  userPointsCategoryKey: PublicKey /** the user's point category account public key */;
}

/**
 * Buys an item from a Point Store
 * @param params - The expected input params
 */
export const buyFromPointsStoreIx = async (
  params: BuyFromPointsStoreParams
): Promise<{
  signers?: web3.Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const {
    amount,
    bank,
    tokensTo,
    pointsCategoryKey,
    pointsModifierKey,
    pointsProgramId,
    connection,
    store,
    user,
    userPointsCategoryKey,
    programId,
  } = params;
  const program = getPointsStoreProgram(connection, programId);

  const storeSigner = await findPointsStoreSigner(store, programId);

  const instructions = [
    await program.methods
      .buy(amount)
      .accounts({
        bank,
        tokensTo,
        pointCategory: pointsCategoryKey,
        pointsModifierAccount: pointsModifierKey,
        pointsProgram: pointsProgramId,
        store,
        storeSigner: storeSigner[0],
        user,
        userPointsAccount: userPointsCategoryKey,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsStoreProgram } from '../utils';
import { findPointsStoreSigner } from '../pda_finders';

/** Params for Close Point Store instruction */
export interface ClosePointsStoreParams extends BaseParams {
  authority: PublicKey /** the public key of the authority for this points store */;
  bank: PublicKey /** the public key of the bank for this points store */;
  fundsTo: PublicKey /** Where the store's funds will be sent */;
  tokensTo: PublicKey /** Where the remaining store items are sent */;
  pointsAdminKey: PublicKey /** the Points Domain Admin public key */;
  pointsCategoryKey: PublicKey /** the Points Category public key */;
  pointsDomainKey: PublicKey /** the Points Domain public key */;
  pointsModifierKey: PublicKey /** the Points Modifier public key */;
  pointsProgramId: PublicKey /** the Points Program public key */;
  store: PublicKey /** the Points Store Account public key */;
}

/**
 * Closes a Point Store Account
 * @param params - The expected input params
 */
export const closePointsStoreIx = async (
  params: ClosePointsStoreParams
): Promise<{
  signers?: web3.Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const {
    authority,
    bank,
    fundsTo,
    tokensTo,
    pointsAdminKey,
    pointsCategoryKey,
    pointsDomainKey,
    pointsModifierKey,
    pointsProgramId,
    connection,
    store,
    programId,
  } = params;
  const program = getPointsStoreProgram(connection, programId);

  const storeSigner = await findPointsStoreSigner(
    store,
    programId
  )[0];

  const instructions = [
    await program.methods
      .closeStore()
      .accounts({
        authority,
        bank,
        fundsTo,
        tokensTo,
        pointsAdmin: pointsAdminKey,
        pointCategory: pointsCategoryKey,
        pointsDomain: pointsDomainKey,
        pointsModifierAccount: pointsModifierKey,
        pointsProgram: pointsProgramId,
        store,
        storeSigner,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

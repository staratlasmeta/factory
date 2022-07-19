import { PublicKey, Keypair } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsStoreProgram } from '../utils';
import { findPointsStoreSigner } from '../pda_finders';

/** Params for Create Point Store Account instruction */
export interface CreatePointsStoreAccountParams extends BaseParams {
  authority: PublicKey /** the public key of the authority for this points store */;
  bank: PublicKey /** the public key of the bank for this points store */;
  funder: PublicKey /** the public key of the funder for this points store */;
  pointsAdminKey: PublicKey /** the Points Domain Admin public key */;
  pointsCategoryKey: PublicKey /** the Points Category public key */;
  pointsDomainKey: PublicKey /** the Points Domain public key */;
  pointsModifierKey: PublicKey /** the Points Modifier public key */;
  pointsProgramId: PublicKey /** the Points Program public key */;
  price: BN /** the price of the store item */;
  store?: Keypair /** the Points Store Account Keypair */;
}

/**
 * Creates a Point Store Account
 * @param params - The expected input params
 */
export const createPointsStoreAccountIx = async (
  params: CreatePointsStoreAccountParams
): Promise<{
  signers?: web3.Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const {
    authority,
    bank,
    funder,
    pointsAdminKey,
    pointsCategoryKey,
    pointsDomainKey,
    pointsModifierKey,
    price,
    connection,
    pointsProgramId,
    programId,
  } = params;
  const program = getPointsStoreProgram(connection, programId);

  const store = params.store || Keypair.generate();

  const [storeSigner, signerBump] = await findPointsStoreSigner(
    store.publicKey,
    programId
  );

  const instructions = [
    await program.methods
      .createPointsStore(signerBump, price)
      .accounts({
        authority,
        bank,
        funder,
        pointsAdmin: pointsAdminKey,
        pointCategory: pointsCategoryKey,
        pointsDomain: pointsDomainKey,
        pointsModifierAccount: pointsModifierKey,
        pointsProgram: pointsProgramId,
        store: store.publicKey,
        storeSigner,
      })
      .instruction(),
  ];

  return {
    instructions,
    signers: [store],
  };
};

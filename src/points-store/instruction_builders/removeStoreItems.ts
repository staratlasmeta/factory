import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsStoreProgram } from '../utils';
import { findPointsStoreSigner } from '../pda_finders';

/** Params for Remove Item From Point Store instruction */
export interface RemovePointsStoreItemParams extends BaseParams {
  authority: PublicKey /** the public key of the authority for this points store */;
  amount: BN /** the quantity of tokens to remove */;
  bank: PublicKey /** the public key of the bank for this points store */;
  tokensTo: PublicKey /** Where the remaining store items are sent */;
  store: PublicKey /** the Points Store Account public key */;
}

/**
 * Removes items from a store without paying for them
 * @param params - The expected input params
 */
export const removePointsStoreItemIx = async (
  params: RemovePointsStoreItemParams
): Promise<{
  signers?: web3.Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const {
    authority,
    amount,
    bank,
    tokensTo,
    connection,
    store,
    programId,
  } = params;
  const program = getPointsStoreProgram(connection, programId);

  const storeSigner = await findPointsStoreSigner(store, programId)[0];

  const instructions = [
    await program.methods
      .removeStoreItems(amount)
      .accounts({
        authority,
        bank,
        tokensTo,
        store,
        storeSigner,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

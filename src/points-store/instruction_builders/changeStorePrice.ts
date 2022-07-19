import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsStoreProgram } from '../utils';

/** Params for Change Point Store Price instruction */
export interface ChangePointsStorePriceParams extends BaseParams {
  authority: PublicKey /** the public key of the authority for this points store */;
  newPrice: BN /** the price of the store item */;
  store: PublicKey /** the Points Store Account public key */;
}

/**
 * Changes a Point Store Price
 * @param params - The expected input params
 */
export const changePointsStorePriceIx = async (
  params: ChangePointsStorePriceParams
): Promise<{
  signers?: web3.Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const {
    authority,
    newPrice,
    connection,
    store,
    programId,
  } = params;
  const program = getPointsStoreProgram(connection, programId);

  const instructions = [
    await program.methods
      .changeStorePrice(newPrice)
      .accounts({
        authority,
        store,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

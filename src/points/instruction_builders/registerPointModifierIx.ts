import { PublicKey, Keypair } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Register Point Modifier instruction */
export interface RegisterPointModifierParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  canIncrement: boolean /** whether the modifier can increment Points */;
  canDecrement?: boolean /** whether the modifier can decrement Points */;
  canSpend?: boolean /** whether the modifier can spend Points (in case points are spendable) */;
  modifierKey: PublicKey /** the modifier public key */;
  domainKey: PublicKey /** The related Domain Account PublicKey */;
  pointCategoryKey: PublicKey /** The Point Category Account PublicKey */;
}

/**
 * Registers an Point modifier
 * @param admin - the admin public key
 * @param domainKey, - The related Domain Account PublicKey
 * @param pointCategoryKey, - The Point Category Account PublicKey
 * @param canIncrement - whether the modifier can increment Points
 * @param canDecrement - whether the modifier can decrement Points
 * @param canSpend - whether the modifier can spend Points (in case points are spendable)
 * @param modifierKey - the modifier public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const registerPointModifierIx = async ({
  admin,
  domainKey,
  pointCategoryKey,
  canIncrement,
  canDecrement = false,
  canSpend = false,
  modifierKey,
  connection,
  programId,
}: RegisterPointModifierParams): Promise<{
  signers?: Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .registerPointModifier(canIncrement, canDecrement, canSpend)
      .accounts({
        admin,
        domainAccount: domainKey,
        pointCategoryAccount: pointCategoryKey,
        modifier: modifierKey,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

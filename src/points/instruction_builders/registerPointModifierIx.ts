import { PublicKey } from '@solana/web3.js';
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
  domainAccount: PublicKey /** The related Domain Account PublicKey */;
  pointCategoryAccount: PublicKey /** The Point Category Account PublicKey */;
}

/**
 * Registers an Point modifier
 * @param admin - the admin public key
 * @param domainAccount, - The related Domain Account PublicKey
 * @param pointCategoryAccount, - The Point Category Account PublicKey
 * @param canIncrement - whether the modifier can increment Points
 * @param canDecrement - whether the modifier can decrement Points
 * @param canSpend - whether the modifier can spend Points (in case points are spendable)
 * @param modifierKey - the modifier public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const registerPointModifierIx = async ({
  admin,
  domainAccount,
  pointCategoryAccount,
  canIncrement,
  canDecrement = false,
  canSpend = false,
  modifierKey,
  connection,
  programId,
}: RegisterPointModifierParams): Promise<{
  accounts: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .registerPointModifier(canIncrement, canDecrement, canSpend)
      .accounts({
        admin,
        domainAccount,
        pointCategoryAccount,
        modifier: modifierKey,
      })
      .instruction(),
  ];

  return {
    accounts: [],
    instructions,
  };
};

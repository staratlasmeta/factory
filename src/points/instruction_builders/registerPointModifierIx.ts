import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Register Point Modifier instruction */
export interface RegisterPointModifierParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  canIncrement: boolean /** whether the modifier can increment XP */;
  canDecrement: boolean /** whether the modifier can decrement XP */;
  modifierKey: PublicKey /** the modifier public key */;
}

/**
 * Registers an Point modifier
 * @param admin - the admin public key
 * @param canIncrement - whether the modifier can increment XP
 * @param canDecrement - whether the modifier can decrement XP
 * @param modifierKey - the modifier public key
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const registerPointModifierIx = async ({
  admin,
  canIncrement,
  canDecrement,
  modifierKey,
  connection,
  programId,
}: RegisterPointModifierParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    program.methods
      .registerPointModifier(canIncrement, canDecrement)
      .accounts({
        admin,
        modifier: modifierKey,
      })
      .instruction()
  ];

  return {
    accounts: [],
    instructions,
  };
};
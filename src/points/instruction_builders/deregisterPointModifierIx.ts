import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Deregister Point Modifier instruction */
export interface DeregisterPointModifierParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  modifierKey: PublicKey /** the modifier public key */;
}

/**
 * De-registers a Point Modifier
 * @param admin - the admin public key
 * @param modifierKey - the modifier public key
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterPointModifierIx = async ({
  admin,
  modifierKey,
  connection,
  programId,
}: DeregisterPointModifierParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    program.methods
      .deregisterPointModifier()
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
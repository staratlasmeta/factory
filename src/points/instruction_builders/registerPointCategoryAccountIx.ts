import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Register Point Category Account instruction */
export interface RegisterPointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  label: string /** The XP account label */;
  pointLimit: BN /** The XP limit */;
  tokenRequired: boolean /** Whether a token is required */;
  tokenQty: BN /** The token quantity to burn*/;
  tokenMintKey?: PublicKey /** The required token mint */;
  isSpendable: boolean /** Deployed program ID for the Points program */
}

/**
 * Registers a Point Category Account
 * @param admin - the admin public key 
 * @param label - The XP account label 
 * @param pointLimit - The XP limit 
 * @param tokenRequired - Whether a token is required 
 * @param tokenQty - The token quantity to burn
 * @param tokenMintKey - The required token mint 
 * @param isSpendable - Wheter the type of point is spendable or not
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const registerPointCategoryAccountIx = async ({
  admin,
  label,
  pointLimit,
  tokenRequired,
  tokenQty,
  tokenMintKey,
  isSpendable,
  connection,
  programId,
}: RegisterPointCategoryAccountParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);
  let remainingAccounts = []

  if (tokenRequired && !tokenMintKey) {
    throw new Error('The token mint is required');
  }else if(tokenRequired && tokenMintKey){
    remainingAccounts = [{ pubkey: tokenMintKey, isWritable: false, isSigner: false }]
  }
  
  const instructions = [
    program.methods
      .registerPointCategoryAccount(
        label,
        tokenRequired,
        tokenQty,
        pointLimit,
        isSpendable
      ).accounts({ admin })
      .remainingAccounts(remainingAccounts)
      .instruction()
  ]

  return {
    accounts: [],
    instructions,
  };
};
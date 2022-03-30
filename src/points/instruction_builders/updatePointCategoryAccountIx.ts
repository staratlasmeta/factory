import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'

/** Params for Update Point Category Account instruction */
export interface UpdatePointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  pointLimit?: BN /** The XP limit */;
  tokenRequired?: boolean /** Whether a token is required */;
  tokenQty?: BN /** The required token quantity */;
  tokenMintKey?: PublicKey /** The required token mint */;
}

/**
 * Updates a Point Category Account
 * @param admin - the admin public key 
 * @param pointLimit - The XP limit 
 * @param tokenRequired - Whether a token is required 
 * @param tokenQty - The token quantity to burn
 * @param tokenMintKey - The required token mint 
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const updatePointCategoryAccountIx = async ({
  admin,
  pointLimit,
  tokenRequired,
  tokenQty,
  tokenMintKey,
  connection,
  programId,
}: UpdatePointCategoryAccountParams): Promise<{ accounts: web3.PublicKey[], instructions: Promise<web3.TransactionInstruction>[] }> => {
  const program = getPointsProgram(connection, programId);
  let remainingAccounts = []

  if (tokenRequired && !tokenMintKey) {
    throw new Error('The token mint is required');
  }else if(tokenRequired && tokenMintKey){
    remainingAccounts = [{ pubkey: tokenMintKey, isWritable: false, isSigner: false }]
  }
  
  const instructions = [
    program.methods
      .updatePointCategoryAccount(
        pointLimit,
        tokenQty,
        tokenRequired,
      ).accounts({ admin })
      .remainingAccounts(remainingAccounts)
      .instruction()
  ]

  return {
    accounts: [],
    instructions,
  };
};
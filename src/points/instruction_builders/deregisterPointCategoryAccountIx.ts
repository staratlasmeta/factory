import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from './BaseParams'
import { getPointsProgram } from '../utils'
import { findDomainAccount } from '../pda_finders';

/** Params for Deregister Point Category Account instruction */
export interface DeregisterPointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  domain: string /** The class of the related domain */
  pointCategoryAccount: PublicKey /** The Pubkey of the Point Category Account */
}

/**
 * De-registers a Point Category Account
 * @param admin - the admin public key 
 * @param domain - The class of the related domain
 * @param pointCategoryAccount - The Pubkey of the Point Category Account
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterPointCategoryAccountIx = async ({
  admin,
  domain,
  pointCategoryAccount,
  connection,
  programId,
}: DeregisterPointCategoryAccountParams): Promise<{ 
  accounts: web3.PublicKey[], 
  instructions: web3.TransactionInstruction[], 
  domainAccount: PublicKey 
}> => {
  const program = getPointsProgram(connection, programId);
  const [domainAccount] = await findDomainAccount(domain, programId)

  const instructions = [
    await program.methods
      .deregisterPointCategoryAccount()
      .accounts({ 
        admin,
        domainAccount,
        pointCategoryAccount
      })
      .instruction()
  ];

  return {
    accounts: [],
    instructions,
    domainAccount
  };
};
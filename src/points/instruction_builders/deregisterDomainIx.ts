import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Init instruction */
export interface deregisterDomainParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  domainKey: PublicKey /** the domain account public key */;
}

/**
 * Deregister a Domain Account
 * @param admin - the admin public key
 * @param domainKey - the domain account public key
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const deregisterDomainIx = async ({
  admin,
  domainKey,
  connection,
  programId,
}: deregisterDomainParams): Promise<{
  signers?: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .deregisterDomain()
      .accounts({
        admin,
        domainAccount: domainKey
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

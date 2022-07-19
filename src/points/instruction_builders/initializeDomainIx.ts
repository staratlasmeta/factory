import { PublicKey, Keypair } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';
import { findDomainAccount } from '../pda_finders';

/** Params for Init instruction */
export interface initializeDomainParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  namespace: number[] /** the namespace (exactly 32 elements) */;
}

/**
 * Initialize a Domain Account
 * @param admin - the admin public key
 * @param namespace - the namespace of the domain account
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const initializeDomainIx = async ({
  admin,
  namespace,
  connection,
  programId,
}: initializeDomainParams): Promise<{
  signers?: Keypair[];
  instructions: web3.TransactionInstruction[];
}> => {
  if (namespace.length != 32) {
    throw new Error('Namespace should have exactly 32 elements');
  }
  const program = getPointsProgram(connection, programId);
  const [domainAccount] = await findDomainAccount(namespace, programId);

  const instructions = [
    await program.methods
      .initializeDomain(namespace)
      .accounts({
        admin,
        domainAccount,
      })
      .instruction(),
  ];

  return {
    instructions,
  };
};

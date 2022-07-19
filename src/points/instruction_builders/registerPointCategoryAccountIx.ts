import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';
import { findPointCategoryAccount } from '../pda_finders';

/** Params for Register Point Category Account instruction */
export interface RegisterPointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  namespace: number[] /** the namespace (exactly 32 elements) */;
  pointLimit: BN /** The XP limit */;
  tokenRequired: boolean /** Whether a token is required */;
  tokenQty?: BN /** The token quantity to burn*/;
  tokenMintKey?: PublicKey | undefined /** The required token mint */;
  isSpendable: boolean /** Deployed program ID for the Points program */;
  domainKey: PublicKey /** the domain account pubkey */;
  transferTokensToVault?: boolean /** Whether to transfer tokens to the token vault */;
  tokenVaultKey?: PublicKey /** The token vault */;
}

/**
 * Registers a Point Category Account
 * @param admin - the admin public key
 * @param namespace - The namespace
 * @param pointLimit - The XP limit
 * @param tokenRequired - Whether a token is required
 * @param tokenQty - The token quantity to burn
 * @param tokenMintKey - The required token mint
 * @param isSpendable - Whether the type of point is spendable or not
 * @param domainKey - The domain account pubkey
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const registerPointCategoryAccountIx = async ({
  admin,
  namespace,
  pointLimit,
  tokenRequired,
  tokenQty = null,
  tokenMintKey,
  isSpendable,
  transferTokensToVault,
  tokenVaultKey,
  domainKey,
  connection,
  programId,
}: RegisterPointCategoryAccountParams): Promise<{
  signers?: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  if (namespace.length != 32) {
    throw new Error('Namespace should have exactly 32 elements');
  }
  const program = getPointsProgram(connection, programId);
  const [pointCategoryAccount] = await findPointCategoryAccount(
    namespace,
    domainKey,
    programId
  );

  let remainingAccounts = [];

  if (tokenRequired && !tokenMintKey) {
    throw new Error('The token mint is required');
  } else if (tokenRequired && tokenMintKey) {
    remainingAccounts = [
      { pubkey: tokenMintKey, isWritable: false, isSigner: false },
    ];
  }

  if (transferTokensToVault && !tokenVaultKey) {
    throw new Error('The token vault is required');
  } else if (transferTokensToVault && tokenVaultKey) {
    remainingAccounts.push({
      pubkey: tokenVaultKey,
      isWritable: false,
      isSigner: false,
    });
  }

  const instructions = [
    await program.methods
      .registerPointCategoryAccount({
        namespace,
        tokenRequired,
        tokenQty,
        pointLimit,
        isSpendable,
        transferTokensToVault,
      })
      .accounts({
        admin,
        domainAccount: domainKey,
        pointCategoryAccount,
      })
      .remainingAccounts(remainingAccounts)
      .instruction(),
  ];

  return {
    instructions,
  };
};

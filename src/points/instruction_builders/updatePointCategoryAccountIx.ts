import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Update Point Category Account instruction */
export interface UpdatePointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  domainKey: PublicKey /** the domain account public key */;
  pointCategoryKey: PublicKey /** the point category account public key */;
  pointLimit?: BN /** The XP limit */;
  tokenRequired?: boolean /** Whether a token is required */;
  tokenQty?: BN /** The required token quantity */;
  tokenMintKey?: PublicKey /** The required token mint */;
  transferTokensToVault?: boolean /** Whether to transfer tokens to the token vault */;
  tokenVaultKey?: PublicKey /** The token vault */;
  isSpendable?: boolean /** Deployed program ID for the Points program */;
  resetLevels?: boolean /** Will reset levels if provided */;
}

/**
 * Updates a Point Category Account
 * @param admin - the admin public key
 * @param domainKey - the admin public key
 * @param pointCategoryKey - the admin public key
 * @param pointLimit - The XP limit
 * @param tokenRequired - Whether a token is required
 * @param tokenQty - The token quantity to burn
 * @param tokenMintKey - The required token mint
 * @param isSpendable - Whether the type of point is spendable or not
 * @param resetLevels -  Will reset levels if provided
 * @param transferTokensToVault - Whether to transfer tokens to the token vault
 * @param tokenVaultKey - The token vault
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const updatePointCategoryAccountIx = async ({
  admin,
  domainKey,
  pointCategoryKey,
  pointLimit,
  tokenRequired,
  tokenQty,
  tokenMintKey,
  transferTokensToVault,
  tokenVaultKey,
  resetLevels,
  isSpendable,
  connection,
  programId,
}: UpdatePointCategoryAccountParams): Promise<{
  signers: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);
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
      .updatePointCategoryAccount({
        pointLimit,
        tokenQty,
        tokenRequired,
        transferTokensToVault,
        resetLevels,
        isSpendable,
      })
      .accounts({
        admin,
        domainAccount: domainKey,
        pointCategoryAccount: pointCategoryKey,
      })
      .remainingAccounts(remainingAccounts)
      .instruction(),
  ];

  return {
    signers: [],
    instructions,
  };
};

import { PublicKey } from '@solana/web3.js';
import { web3, BN } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';
import { findDomainAccount, findPointCategoryAccount } from '../pda_finders';

/** Params for Register Point Category Account instruction */
export interface RegisterPointCategoryAccountParams extends BaseParams {
  admin: PublicKey /** the admin public key */;
  label: string /** The XP account label */;
  pointLimit: BN /** The XP limit */;
  tokenRequired: boolean /** Whether a token is required */;
  tokenQty?: BN /** The token quantity to burn*/;
  tokenMintKey?: PublicKey | undefined /** The required token mint */;
  isSpendable: boolean /** Deployed program ID for the Points program */;
  domain: string /** The class of the related domain */;
  transferTokensToVault?: boolean /** Whether to transfer tokens to the token vault */;
  tokenVaultKey?: PublicKey /** The token vault */;
}

/**
 * Registers a Point Category Account
 * @param admin - the admin public key
 * @param label - The XP account label
 * @param pointLimit - The XP limit
 * @param tokenRequired - Whether a token is required
 * @param tokenQty - The token quantity to burn
 * @param tokenMintKey - The required token mint
 * @param isSpendable - Whether the type of point is spendable or not
 * @param domain - The class of the related domain
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 */
export const registerPointCategoryAccountIx = async ({
  admin,
  label,
  pointLimit,
  tokenRequired,
  tokenQty = null,
  tokenMintKey,
  isSpendable,
  transferTokensToVault,
  tokenVaultKey,
  domain,
  connection,
  programId,
}: RegisterPointCategoryAccountParams): Promise<{
  signers: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
  domainAccount: PublicKey;
}> => {
  const program = getPointsProgram(connection, programId);
  const [domainAccount] = await findDomainAccount(domain, programId);
  const [pointCategoryAccount] = await findPointCategoryAccount(
    label,
    domainAccount,
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
        label,
        tokenRequired,
        tokenQty,
        pointLimit,
        isSpendable,
        transferTokensToVault,
      })
      .accounts({
        admin,
        domainAccount,
        pointCategoryAccount,
      })
      .remainingAccounts(remainingAccounts)
      .instruction(),
  ];

  return {
    signers: [],
    instructions,
    domainAccount,
  };
};

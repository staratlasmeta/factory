import { PublicKey } from '@solana/web3.js';
import {
  DomainAccount,
  PointsModifier,
  PointCategoryAccount,
  UserPointsAccount,
  UserPointsAccountItem,
  PointsModifierItem,
} from '../types/points_accounts';
import { BaseParams } from '../instruction_builders'
import { 
  findDomainAccount,
  findPointsModifierAccount,
  findUserPointsAccount
} from '../pda_finders'
import { getPointsProgram } from './getPointsProgram'






/**
 * Gets a Domain account
 * @param param - the input parameters
 */
export const getDomainAccount = async ({
  connection,
  programId,
}: BaseParams) => {
  const program = getPointsProgram(connection, programId);
  const [domainAccountKey] = await findDomainAccount(program.programId);
  const domainAccount = await program.account.domainAccount.fetch(domainAccountKey);

  return {
    domainAccount: domainAccount as DomainAccount,
    domainAccountKey: domainAccountKey,
  };
};

/** Params for Points Account getter */
export interface GetXpAccountParams extends BaseParams {
  pointCategoryAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets an Points account
 * @param param - the input parameters
 */
export const getPointCategoryAccountKey = async ({
  pointCategoryAccountKey,
  connection,
  programId,
}: GetXpAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const xpAccount = await program.account.pointCategoryAccount.fetch(pointCategoryAccountKey);

  return xpAccount as PointCategoryAccount;
};

/** Params for User Points Account Getter */
export interface GetUserXpAccountParams extends BaseParams {
  userXpAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets a user Points account
 * @param param - the input parameters
 */
export const getUserPointsAccount = async ({
  userXpAccountKey,
  connection,
  programId,
}: GetUserXpAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const userXpAccount = await program.account.userPointsAccount.fetch(
    userXpAccountKey
  );

  return userXpAccount as UserPointsAccount;
};

/** Params for User Points Account Getter */
export interface GetUserXpAccountViaUserAndXpKeysParams extends BaseParams {
  user: PublicKey /** the Points Account public key */;
  xpAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets a user's Points account using the user and XP Account
 * @param param - the input parameters
 */
export const getUserPointsAccountViaUserAndXpKeys = async ({
  user,
  xpAccountKey,
  connection,
  programId,
}: GetUserXpAccountViaUserAndXpKeysParams) => {
  const program = getPointsProgram(connection, programId);
  const [userXpAccountKey] = await findUserPointsAccount(
    xpAccountKey,
    user,
    programId
  );
  const userXpAccount = await program.account.userPointsAccount.fetch(
    userXpAccountKey
  );

  return {
    userXpAccountKey,
    userXpAccount: userXpAccount as UserPointsAccount,
  };
};

/** Params for User Points Accounts Getter */
export interface GetUserXpAccountsParams extends BaseParams {
  user: PublicKey /** the Points Account public key */;
}

/**
 * Gets a user's Points accounts
 * @param param - the input parameters
 */
export const getUserPointsAccounts = async ({
  user,
  connection,
  programId,
}: GetUserXpAccountsParams) => {
  const program = getPointsProgram(connection, programId);
  const userXpAccounts: UserPointsAccountItem[] =
    await program.account.userPointsAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: user.toBase58(),
        },
      },
    ]);

  return userXpAccounts;
};

/** Params for Points Modifier account getter */
export interface GetXpModifierAccountParams extends BaseParams {
  xpModifierAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets an Points Modifier account
 * @param param - the input parameters
 */
export const getPointsModifierAccount = async ({
  xpModifierAccountKey,
  connection,
  programId,
}: GetXpModifierAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const xpModifierAccount = await program.account.pointsModifier.fetch(
    xpModifierAccountKey
  );

  return xpModifierAccount as PointsModifier;
};

/** Params for User Points Account Getter */
export interface GetXpModifierAccountViaModifierAndXpKeysParams
  extends BaseParams {
  modifier: PublicKey /** the Xp Account public key */;
  xpAccountKey: PublicKey /** the Xp Account public key */;
}

/**
 * Gets a user's Points account using the user and Points Account
 * @param param - the input parameters
 */
export const getPointsModifierAccountViaModifierAndXpKeys = async ({
  modifier,
  xpAccountKey,
  connection,
  programId,
}: GetXpModifierAccountViaModifierAndXpKeysParams) => {
  const program = getPointsProgram(connection, programId);
  const [xpModifierAccountKey] = await findPointsModifierAccount(
    xpAccountKey,
    modifier,
    programId
  );
  const xpModifierAccount = await program.account.userPointsAccount.fetch(
    xpModifierAccountKey
  );

  return {
    xpModifierAccountKey,
    xpModifierAccount: xpModifierAccount as PointsModifier,
  };
};

/** Params for Points Account modifierss Getter */
export interface GetXpAccountModifiersParams extends BaseParams {
  xpAccountKey: PublicKey /** the Xp Account public key */;
}

/**
 * Gets an Points Account's registered Points modifier accounts
 * @param param - the input parameters
 */
export const getPointsAccountModifiers = async ({
  xpAccountKey,
  connection,
  programId,
}: GetXpAccountModifiersParams) => {
  const program = getPointsProgram(connection, programId);
  const modifiers = await program.account.pointsModifier.all([
    {
      memcmp: {
        offset: 40,
        bytes: xpAccountKey.toBase58(),
      },
    },
  ]);

  return modifiers as PointsModifierItem[];
};

/** Params for modifier Points Accounts Getter */
export interface GetModifierXpAccountsParams extends BaseParams {
  modifier: PublicKey /** the Points Account public key */;
}

/**
 * Gets Points modifiers that belong to a particular modifier
 * @param param - the input parameters
 */
export const getModifierPointsAccounts = async ({
  modifier,
  connection,
  programId,
}: GetModifierXpAccountsParams) => {
  const program = getPointsProgram(connection, programId);
  const modifiers = await program.account.pointsModifier.all([
    {
      memcmp: {
        offset: 8,
        bytes: modifier.toBase58(),
      },
    },
  ]);

  return modifiers as PointsModifierItem[];
};

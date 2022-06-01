import { PublicKey } from '@solana/web3.js';
import {
  DomainAccount,
  PointsModifier,
  PointCategoryAccount,
  UserPointsAccount,
  UserPointsAccountItem,
  PointsModifierItem,
} from '../types/points_accounts';
import { BaseParams } from '../../util/BaseParams';
import { 
  findPointsModifierAccount,
  findUserPointsAccount
} from '../pda_finders'
import { getPointsProgram } from './getPointsProgram'




export interface GetDomainAccountParams extends BaseParams {
  domainAccountKey: PublicKey /** the Domain Account public key */;
}

/**
 * Gets a Domain account
 * @param param - the input parameters
 */
export const getDomainAccount = async ({
  domainAccountKey,
  connection,
  programId,
}: GetDomainAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const domainAccount = await program.account.domainAccount.fetch(domainAccountKey);

  return {
    domainAccount: domainAccount as DomainAccount,
    domainAccountKey: domainAccountKey,
  };
};

/** Params for Points Account getter */
export interface GetPointsAccountParams extends BaseParams {
  pointCategoryAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets an Points account
 * @param param - the input parameters
 */
export const getPointCategoryAccount = async ({
  pointCategoryAccountKey,
  connection,
  programId,
}: GetPointsAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const pointAccount = await program.account.pointCategoryAccount.fetch(pointCategoryAccountKey);

  return pointAccount as PointCategoryAccount;
};

/** Params for User Points Account Getter */
export interface GetUserPointsAccountParams extends BaseParams {
  userPointsAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets a user Points account
 * @param param - the input parameters
 */
export const getUserPointsAccount = async ({
  userPointsAccountKey,
  connection,
  programId,
}: GetUserPointsAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const userPointsAccount = await program.account.userPointsAccount.fetch(
    userPointsAccountKey
  );

  return userPointsAccount as UserPointsAccount;
};

/** Params for User Points Account Getter */
export interface GetUserPointsAccountViaUserAndPointsKeysParams extends BaseParams {
  user: PublicKey /** the Points Account public key */;
  pointAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets a user's Points account using the user and Points Account
 * @param param - the input parameters
 */
export const getUserPointsAccountViaUserAndPointsKeys = async ({
  user,
  pointAccountKey,
  connection,
  programId,
}: GetUserPointsAccountViaUserAndPointsKeysParams) => {
  const program = getPointsProgram(connection, programId);
  const [userPointsAccountKey] = await findUserPointsAccount(
    pointAccountKey,
    user,
    programId
  );
  const userPointsAccount = await program.account.userPointsAccount.fetch(
    userPointsAccountKey
  );

  return {
    userPointsAccountKey,
    userPointsAccount: userPointsAccount as UserPointsAccount,
  };
};

/** Params for User Points Accounts Getter */
export interface GetUserPointsAccountsParams extends BaseParams {
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
}: GetUserPointsAccountsParams) => {
  const program = getPointsProgram(connection, programId);
  const userPointsAccounts: UserPointsAccountItem[] =
    await program.account.userPointsAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: user.toBase58(),
        },
      },
    ]);

  return userPointsAccounts;
};

/** Params for Points Modifier account getter */
export interface GetPointsModifierAccountParams extends BaseParams {
  pointsModifierAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets an Points Modifier account
 * @param param - the input parameters
 */
export const getPointsModifierAccount = async ({
  pointsModifierAccountKey,
  connection,
  programId,
}: GetPointsModifierAccountParams) => {
  const program = getPointsProgram(connection, programId);
  const pointsModifierAccount = await program.account.pointsModifier.fetch(
    pointsModifierAccountKey
  );

  return pointsModifierAccount as PointsModifier;
};

/** Params for User Points Account Getter */
export interface GetPointsModifierAccountViaModifierAndPointsKeysParams
  extends BaseParams {
  modifier: PublicKey /** the Points Account public key */;
  pointAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets a user's Points account using the user and Points Account
 * @param param - the input parameters
 */
export const getPointsModifierAccountViaModifierAndPointsKeys = async ({
  modifier,
  pointAccountKey,
  connection,
  programId,
}: GetPointsModifierAccountViaModifierAndPointsKeysParams) => {
  const program = getPointsProgram(connection, programId);
  const [pointsModifierAccountKey] = await findPointsModifierAccount(
    pointAccountKey,
    modifier,
    programId
  );
  const pointsModifierAccount = await program.account.userPointsAccount.fetch(
    pointsModifierAccountKey
  );

  return {
    pointsModifierAccountKey,
    pointsModifierAccount: pointsModifierAccount as PointsModifier,
  };
};

/** Params for Points Account modifierss Getter */
export interface GetPointsAccountModifiersParams extends BaseParams {
  pointAccountKey: PublicKey /** the Points Account public key */;
}

/**
 * Gets an Points Account's registered Points modifier accounts
 * @param param - the input parameters
 */
export const getPointsAccountModifiers = async ({
  pointAccountKey,
  connection,
  programId,
}: GetPointsAccountModifiersParams) => {
  const program = getPointsProgram(connection, programId);
  const modifiers = await program.account.pointsModifier.all([
    {
      memcmp: {
        offset: 40,
        bytes: pointAccountKey.toBase58(),
      },
    },
  ]);

  return modifiers as PointsModifierItem[];
};

/** Params for modifier Points Accounts Getter */
export interface GetModifierPointsAccountsParams extends BaseParams {
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
}: GetModifierPointsAccountsParams) => {
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

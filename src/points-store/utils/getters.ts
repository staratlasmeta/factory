import { PublicKey } from '@solana/web3.js';
import { BaseParams } from '../../util/BaseParams';
import { getPointsStoreProgram } from './getPointsStoreProgram';
import { PointsStoreAccount } from '../types/accounts';

export interface GetPointsStoreAccountParams extends BaseParams {
  pointsStoreKey: PublicKey /** The Points Store Account public key */;
}

/**
 * Gets the Points Store Account
 * @param param - the input parameters
 */
export const getPointsStoreAccount = async ({
  pointsStoreKey,
  connection,
  programId,
}: GetPointsStoreAccountParams): Promise<PointsStoreAccount> => {
  const program = getPointsStoreProgram(connection, programId);
  const pointsStoreAccount = await program.account.pointsStore.fetch(
    pointsStoreKey
  );

  return pointsStoreAccount;
};

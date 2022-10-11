import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';
import { DAO_PROGRAM_ADDRESSES, DAO_ACCOUNT_ADDRESSES } from '../constants';

/**
 * Finds the address of an Escrow.
 */
export const findEscrowAddress = (
  authority: PublicKey
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [
      Seeds.ESCROW_SEED,
      DAO_ACCOUNT_ADDRESSES.LOCKER.toBuffer(),
      authority.toBuffer(),
    ],
    DAO_PROGRAM_ADDRESSES.LockedVoter
  );
};

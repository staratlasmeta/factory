import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';
import { DAO_PROGRAM_ADDRESSES, DAO_ACCOUNT_ADDRESSES } from '../constants';

const encodeU16 = (num: number): Buffer => {
  const buf = Buffer.alloc(2);
  buf.writeUInt16LE(num);
  return buf;
};

/**
 * Finds the address of an EscrowHistory.
 */
export const findEscrowHistoryAddress = (
  escrow: PublicKey,
  era: number
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Seeds.ESCROW_HISTORY_SEED, escrow.toBuffer(), encodeU16(era)],
    DAO_PROGRAM_ADDRESSES.Snapshots
  );
};

/**
 * Finds the address of a LockerHistory.
 */
export const findLockerHistoryAddress = (
  era: number
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [
      Seeds.LOCKER_HISTORY_SEED,
      DAO_ACCOUNT_ADDRESSES.LOCKER.toBuffer(),
      encodeU16(era),
    ],
    DAO_PROGRAM_ADDRESSES.Snapshots
  );
};

import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';
import {
  DAO_MAINNET_PROGRAM_ADDRESSES,
  DAO_MAINNET_ACCOUNT_ADDRESSES,
} from '../constants';

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
  era: number,
  snapshotsProgram: PublicKey = DAO_MAINNET_PROGRAM_ADDRESSES.Snapshots
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Seeds.ESCROW_HISTORY_SEED, escrow.toBuffer(), encodeU16(era)],
    snapshotsProgram
  );
};

/**
 * Finds the address of a LockerHistory.
 */
export const findLockerHistoryAddress = (
  era: number,
  locker: PublicKey = DAO_MAINNET_ACCOUNT_ADDRESSES.LOCKER,
  snapshotsProgram: PublicKey = DAO_MAINNET_PROGRAM_ADDRESSES.Snapshots
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Seeds.LOCKER_HISTORY_SEED, locker.toBuffer(), encodeU16(era)],
    snapshotsProgram
  );
};

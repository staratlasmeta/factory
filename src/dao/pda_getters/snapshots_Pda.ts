import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import * as Seeds from './seeds';
import {STAR_ATLAS_ADDRESSES, DAO_ADDRESSES} from '../constants';

const encodeU16 = (num: number): Buffer => {
  const buf = Buffer.alloc(2);
  buf.writeUInt16LE(num);
  return buf;
};

/**
 * Finds the address of an EscrowHistory.
 */
export const findEscrowHistoryAddress = async (
  escrow: PublicKey,
  era: number
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [
      Seeds.ESCROW_HISTORY_SEED,
      escrow.toBuffer(),
      encodeU16(era),
    ],
    STAR_ATLAS_ADDRESSES.Snapshots
  );
};

/**
 * Finds the address of a LockerHistory.
 */
export const findLockerHistoryAddress = async (
  era: number
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [
      Seeds.LOCKER_HISTORY_SEED,
      DAO_ADDRESSES.LOCKER.toBuffer(),
      encodeU16(era),
    ],
    STAR_ATLAS_ADDRESSES.Snapshots
  );
};

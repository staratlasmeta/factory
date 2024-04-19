import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';
import {
  DAO_MAINNET_PROGRAM_ADDRESSES,
  DAO_MAINNET_ACCOUNT_ADDRESSES,
} from '../constants';

export const findUserLockerEscrowAddress = (
  authority: PublicKey,
  locker: PublicKey = DAO_MAINNET_ACCOUNT_ADDRESSES.LOCKER,
  lockedVoterProgram: PublicKey = DAO_MAINNET_PROGRAM_ADDRESSES.LockedVoter
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [Seeds.ESCROW_SEED, locker.toBuffer(), authority.toBuffer()],
    lockedVoterProgram
  );
};


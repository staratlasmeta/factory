import { utils } from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import * as Seeds from './seeds';
import { STAR_ATLAS_ADDRESSES, DAO_ADDRESSES } from '../constants';

/**
 * Finds the address of an Escrow.
 */
export const findEscrowAddress = async (
  authority: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Seeds.ESCROW_SEED, DAO_ADDRESSES.LOCKER.toBuffer(), authority.toBuffer()],
    STAR_ATLAS_ADDRESSES.LockedVoter
  );
};

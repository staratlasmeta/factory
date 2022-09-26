// import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import * as Seeds from './seeds';
import {STAR_ATLAS_ADDRESSES, DAO_ADDRESSES} from '../constants';


/**
 * Returns the public key for the proxy account
 */
export const findProxyAddress = async (
  escrowKey: PublicKey,
  user: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Seeds.PROXY_SEED, escrowKey.toBuffer(), user.toBuffer()],
    STAR_ATLAS_ADDRESSES.ProxyRewarder
  );
};

/**
 * Returns the public key for the proxy escrow account
 */
export const findProxyEscrowAddress = async (
  base: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Seeds.PROXY_ESCROW_SEED, base.toBuffer()],
    STAR_ATLAS_ADDRESSES.ProxyRewarder
  );
};

/**
 * Returns the public key for the registered locker account
 */
export const findRegisterLockerAddress = async (
  locker: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [DAO_ADDRESSES.REGISTERED_LOCKER.toBuffer(), locker.toBuffer()],
    STAR_ATLAS_ADDRESSES.ProxyRewarder
  );
};
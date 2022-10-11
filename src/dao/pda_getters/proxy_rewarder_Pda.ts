import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';
import { DAO_PROGRAM_ADDRESSES } from '../constants';

/**
 * Returns the public key for the proxy account
 */
export const findProxyAddress = (
  escrowKey: PublicKey,
  user: PublicKey
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Seeds.PROXY_SEED, escrowKey.toBuffer(), user.toBuffer()],
    DAO_PROGRAM_ADDRESSES.ProxyRewarder
  );
};

/**
 * Returns the public key for the proxy escrow account
 */
export const findProxyEscrowAddress = (
  base: PublicKey
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Seeds.PROXY_ESCROW_SEED, base.toBuffer()],
    DAO_PROGRAM_ADDRESSES.ProxyRewarder
  );
};

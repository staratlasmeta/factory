import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';
import { DAO_MAINNET_PROGRAM_ADDRESSES } from '../constants';

/**
 * Returns the public key for the proxy account
 */
export const findProxyAddress = (
  escrowKey: PublicKey,
  user: PublicKey,
  proxyRewarder: PublicKey = DAO_MAINNET_PROGRAM_ADDRESSES.ProxyRewarder
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [Seeds.PROXY_SEED, escrowKey.toBuffer(), user.toBuffer()],
    proxyRewarder
  );
};

/**
 * Returns the public key for the proxy escrow account
 */
export const findProxyEscrowAddress = (
  base: PublicKey,
  proxyRewarder: PublicKey = DAO_MAINNET_PROGRAM_ADDRESSES.ProxyRewarder
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [Seeds.PROXY_ESCROW_SEED, base.toBuffer()],
    proxyRewarder
  );
};

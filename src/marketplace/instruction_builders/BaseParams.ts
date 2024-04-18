import { web3 } from '@coral-xyz/anchor';

/**
 * Base Parameters for all instructions
 * */
export interface BaseParams {
  connection: web3.Connection /** Solana connection object */;
  programId: web3.PublicKey /** Deployed program ID for Marketplace program */;
}

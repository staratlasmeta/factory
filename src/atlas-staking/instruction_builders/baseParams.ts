import { web3 } from '@coral-xyz/anchor';

/**
 * Base parameters for all instructions
 * */
export interface BaseStakingParams {
  connection: web3.Connection /** Solana connection object */;
  programId: web3.PublicKey /** Deployed program ID for Atlas Staking program */;
}

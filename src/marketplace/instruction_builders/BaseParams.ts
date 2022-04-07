import { web3 } from '@project-serum/anchor';

/**
 * Base Parameters for all instructions
 * */
export interface BaseParams {
    connection: web3.Connection /** Solana connection object */
    programId: web3.PublicKey /** Deployed program ID for Marketplace program */
}

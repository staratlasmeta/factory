import { web3 } from '@project-serum/anchor';

/**
 * Base parameters for all instructions
 * */
export interface BaseStakingParams {
    connection: web3.Connection /** Solana connection object */
    programId: web3.PublicKey /** Deployed program ID for Atlas Staking program */
}

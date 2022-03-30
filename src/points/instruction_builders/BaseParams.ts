import { Connection } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';

/** Base Params for instructions */
export interface BaseParams {
  connection: Connection /** the Solana connection object */;
  programId: web3.PublicKey /** Deployed program ID for the Points program */;
}
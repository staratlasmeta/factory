import { web3 } from '@coral-xyz/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';

/**  Params for Create Order Counter instruction */
export interface CreateOrderCounterParams extends BaseParams {
  initializerMainAccount: web3.PublicKey;
  payer: web3.PublicKey;
  depositMint: web3.PublicKey;
}

export async function createOrderCounterInstruction({
  connection,
  payer,
  initializerMainAccount,
  depositMint,
  programId,
}: CreateOrderCounterParams): Promise<web3.TransactionInstruction> {
  const program = getMarketplaceProgram({ connection, programId });

  const ix = await program.methods
    .initializeOpenOrdersCounter()
    .accounts({
      payer,
      user: initializerMainAccount,
      depositMint,
    })
    .instruction();

  return ix;
}

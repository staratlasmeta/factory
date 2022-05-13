import { web3 } from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';

/**  Params for Create Order Counter instruction */
export interface CreateOrderCounterParams extends BaseParams {
    initializerMainAccount: web3.PublicKey,
    depositMint: web3.PublicKey,
}

export async function createOrderCounterInstruction({
    connection,
    initializerMainAccount,
    depositMint,
    programId

}: CreateOrderCounterParams): Promise<web3.TransactionInstruction> {
    const program = getMarketplaceProgram({connection, programId})

    const ix = await program.methods
        .initializeOpenOrdersCounter()
        .accounts({
            user: initializerMainAccount,
            depositMint,
        })
        .instruction()

    return ix
}

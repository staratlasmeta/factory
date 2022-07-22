import { web3 } from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from '../../util/BaseParams';

export interface InitParameters extends BaseParams {
    updateAuthorityAccount: web3.PublicKey
}

/**
 * Returns an instruction which initializes a market with a specified update authority
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of account which will be set as the marketplace's upddate authority
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeMarketInstruction({
    connection,
    updateAuthorityAccount,
    programId
}: InitParameters): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getMarketplaceProgram({connection, programId});

    const instructions = [
        await program.methods
            .initializeMarketplace()
            .accounts({updateAuthorityAccount})
            .instruction()
    ];
    return {
        accounts: [],
        instructions,
    };
}

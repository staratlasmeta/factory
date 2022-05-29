import { web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';

export interface MigrateToAtaParams extends BaseParams {
    userAccount: web3.PublicKey,
    tokenAccount: web3.PublicKey,
    tokenMint: web3.PublicKey,
}

export async function migrateToAta({
    connection,
    userAccount,
    tokenAccount,
    tokenMint,
    programId
}: MigrateToAtaParams): Promise<web3.TransactionInstruction> {
    const program = getMarketplaceProgram({connection, programId});
    const tokenAta = await associatedAddress({owner: userAccount, mint:tokenMint});

    const ix = await program.methods
        .migrateToAta()
        .accounts({
            userAccount,
            tokenAccount,
            tokenAta,
            tokenMint
        })
        .instruction();

    return ix
}

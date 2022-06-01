import {
    BN,
    web3
} from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from '../../util/BaseParams';

/**  Params for Register Currency instruction */
export interface updateCurrencyRoyaltyParams extends BaseParams {
    updateAuthorityAccount: web3.PublicKey
    royalty: number
    currencyMint: web3.PublicKey
}

/**  Params for Register Currency instruction */
export interface updateCurrencyVaultParams extends BaseParams {
    updateAuthorityAccount: web3.PublicKey
    saCurrencyVault: web3.PublicKey
    currencyMint: web3.PublicKey
}

/**
 * Returns an instruction which updates the royalty associated with a registered currency
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of registered update authority
 * @param royalty - Associated royalty fee with 1,000,000 equaling 100%
 * @param currencyMint - Mint address of currency being registered
 * @param programId - Deployed program ID for GM program
 */
export async function createUpdateRegisteredCurrencyRoyaltyInstruction({
    connection,
    updateAuthorityAccount,
    royalty,
    currencyMint,
    programId
}: updateCurrencyRoyaltyParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getMarketplaceProgram({connection: connection, programId: programId})

    const instructions = [
        await program.methods
            .updateCurrencyRoyalty(new BN(royalty))
            .accounts({
                updateAuthorityAccount,
                currencyMint
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions
    }
}

/**
 * Returns and instruction which updates the royalty associated with a registered currency
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of registered update authority
 * @param saCurrencyVault - Star Atlas token account which will receive royalties
 * @param currencyMint - Mint address of currency being registered
 * @param programId - Deployed program ID for GM program
 */
export async function createUpdateRegisteredCurrencyVaultInstruction({
    connection,
    updateAuthorityAccount,
    saCurrencyVault,
    currencyMint,
    programId
}: updateCurrencyVaultParams): Promise<{
    accounts: web3.PublicKey[],
    instructions: web3.TransactionInstruction[]
}> {
    const program = getMarketplaceProgram({connection: connection, programId: programId})

    const instructions = [
        await program.methods
            .updateCurrencyVault()
            .accounts({
                updateAuthorityAccount,
                saCurrencyVault,
                currencyMint
            })
            .instruction()
    ];
    return {
        accounts: [],
        instructions
    }
}

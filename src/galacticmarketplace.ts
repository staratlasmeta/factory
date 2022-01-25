import {
    BN,
    Idl,
    Program,
    Provider,
    web3
} from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { baseIdl } from "./util/gmIdl";
import { createAccountInstruction } from "./util";

/**
 * Returns the IDL for the Galactic Marketplace program with provided program ID stored in metadata.
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getGmIDL(
    programId: web3.PublicKey
): unknown {
    const _tmp = baseIdl;
    _tmp['metadata']['address'] = programId.toBase58();
    return _tmp;
}

/**
 * Returns the public key and bump seed for an offer escrow account.
 *
 * @param programId
 */
export async function getOfferVault(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from("offer-vault-account")
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an offer escrow authority.
 * @param programId
 */
export async function getOfferVaultAuth(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from("offer-vault-auth")
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an offer account specific to the user's public key, deposit token account, and receive token account.
 *
 * @param programId
 * @param playerPublicKey
 * @param initializerDepositTokenAccount
 * @param initializerReceiveTokenAccount
 */
export async function getOfferAccount(
    programId: web3.PublicKey,
    playerPublicKey: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress(
        [
            Buffer.from("offer-account"),
            playerPublicKey.toBuffer(),
            initializerDepositTokenAccount.toBuffer(),
            initializerReceiveTokenAccount.toBuffer()
        ],
        programId,
    );
}

export async function createInitializeOfferInstruction(
    connection: web3.Connection,
    initializerPublicKey: web3.PublicKey,
    initializerDepositTokenAccount: web3.PublicKey,
    initializerReceiveTokenAccount: web3.PublicKey,
    offerAccount: web3.Keypair,
    offerAmount: BN,
    takerAmount: BN,
    offerTokenMint: web3.PublicKey,
    programId: web3.PublicKey

): Promise<web3.TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const [offerVaultAccount, offerVaultBump] = await getOfferVault(programId);

    const ix = program.instruction.processInitialize(
        offerVaultBump,
        new BN(offerAmount),
        new BN(takerAmount),
        {
            accounts: {
                offerInitializer: initializerPublicKey,
                mint: offerTokenMint,
                offerVaultAccount,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                offerAccount: offerAccount.publicKey,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenProgram: TOKEN_PROGRAM_ID
            },
            signers: [offerAccount]
        }
    )

    return ix;
}
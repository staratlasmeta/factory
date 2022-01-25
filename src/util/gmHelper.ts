import {
    BN,
    Idl,
    Program,
    Provider,
    web3
} from "@project-serum/anchor";
import { Signer, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { getGmIDL, getOfferAccount } from "..";

export async function createAccountInstruction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    signer: web3.Keypair,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    return SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: signer.publicKey,
        space: program.account.offerAccount.size,
        lamports: await connection.getMinimumBalanceForRentExemption(
            program.account.offerAccount.size
        ),
        programId
    });
}

export async function createAccountTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    offerAccount: web3.Keypair,
    programId: web3.PublicKey,
): Promise<Transaction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const tx = new Transaction(
        {
            recentBlockhash: (await connection.getRecentBlockhash()).blockhash,
            feePayer: payer
        }
    );
    tx.add(SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: offerAccount.publicKey,
        space: program.account.offerAccount.size,
        lamports: await connection.getMinimumBalanceForRentExemption(
            program.account.offerAccount.size
        ),
        programId
    }))
    tx.partialSign(offerAccount);

    return tx;
}
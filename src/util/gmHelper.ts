import { Idl, Program, AnchorProvider, web3 } from '@project-serum/anchor';
import {
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
// import { getGmIDL } from '..';
import { getGmIDL } from '../marketplace';

/**
 * Creates an instruction to initialize an order account which can be passed into an initialize order instruction.
 *
 * Must add to an existing web3.Transaction. Transaction recentBlockhash and feePayer must be defined.
 * Must call '.partialsign(orderAccount)' before sending transaction containing this instruction or you will receive signature verification errors.
 *
 * @param connection
 * @param payer - PublicKey of order initializer
 * @param orderAccount - Keypair for order account, can be obtained with 'anchor.web3.Keypair.generate()'
 * @param programId - Deployed program ID for GM program
 */
export async function createAccountInstruction(
  connection: web3.Connection,
  payer: web3.PublicKey,
  orderAccount: web3.Keypair,
  programId: web3.PublicKey
): Promise<TransactionInstruction> {
  const idl = getGmIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(idl as Idl, programId, provider);

  return SystemProgram.createAccount({
    fromPubkey: payer,
    newAccountPubkey: orderAccount.publicKey,
    space: program.account.orderAccount.size,
    lamports: await connection.getMinimumBalanceForRentExemption(
      program.account.orderAccount.size
    ),
    programId,
  });
}

/**
 * Creates a transaction to initialize an order account which can be passed into an initialize order instruction.
 *
 * Can '.add()' additional instructions to this transaction.
 *
 * Must call '.partialsign(orderAccount)' before sending this transaction or you will receive signature verification errors.
 *
 * @param connection
 * @param payer - Public key of order initializer
 * @param orderAccount - Keypair for order account, can be obtained with 'anchor.web3.Keypair.generate()'
 * @param programId - Deployed program ID for GM program
 */
export async function createAccountTransaction(
  connection: web3.Connection,
  payer: web3.PublicKey,
  orderAccount: web3.Keypair,
  programId: web3.PublicKey
): Promise<Transaction> {
  const idl = getGmIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(idl as Idl, programId, provider);

  const tx = new Transaction({
    recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
    feePayer: payer,
  });
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: orderAccount.publicKey,
      space: program.account.orderAccount.size,
      lamports: await connection.getMinimumBalanceForRentExemption(
        program.account.orderAccount.size
      ),
      programId,
    })
  );

  return tx;
}

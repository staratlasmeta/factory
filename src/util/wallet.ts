
import {sendAndConfirmTransaction as realSendAndConfirmTransaction} from '@solana/web3.js';
import {Keypair, Connection, Transaction} from '@solana/web3.js';

export async function sendAndConfirmTransaction(
  connection: Connection,
  transaction: Transaction,
  ...signers: Keypair[]
): Promise<string> {
  let signature = '';
  try {
      signature = await realSendAndConfirmTransaction(
          connection,
          transaction,
          signers,
          {
              skipPreflight: true,
              commitment: 'singleGossip',
              preflightCommitment: null,
          },
      );
  } catch (e) {
    console.log(e);
  }
  return signature;
}

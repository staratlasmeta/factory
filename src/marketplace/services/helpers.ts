import { Transaction, TransactionInstruction } from '@solana/web3.js';

export const createTransactionFromInstructions = (
  instructions: TransactionInstruction[],
): Transaction => {
  const transaction = new Transaction();

  transaction.add(...instructions);

  return transaction;
};

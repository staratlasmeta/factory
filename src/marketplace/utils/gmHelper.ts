import { BN, web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

export const getOrderSide = (orderAccount: any): string => {
  if (JSON.stringify(orderAccount.orderSide) === JSON.stringify({ buy: {} })) {
    return 'BuySide';
  }
  return 'SellSide';
};

export async function initializeAtaForMint({
  mint,
  owner,
  connection,
}: {
  mint: web3.PublicKey;
  owner: web3.PublicKey;
  connection: web3.Connection;
}): Promise<{
  account: web3.PublicKey;
  instructions: web3.TransactionInstruction[];
}> {
  const instructions: web3.TransactionInstruction[] = [];
  const ataPubkey = await associatedAddress({ mint, owner });

  const ataPubkeyInfo = await connection.getAccountInfo(ataPubkey);

  if (ataPubkeyInfo === null) {
    instructions.push(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        ataPubkey,
        owner,
        owner
      )
    );
  }

  return { account: ataPubkey, instructions };
}

export const convertDecimalPriceToBn = (
  uiPrice: number,
  decimals: number
): BN => {
  return new BN(uiPrice * 10 ** decimals);
};

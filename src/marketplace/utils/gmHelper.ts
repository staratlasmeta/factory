import { BN, web3 } from '@coral-xyz/anchor';
import { associatedAddress } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { createAssociatedTokenAccountInstruction } from '@solana/spl-token';

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
      createAssociatedTokenAccountInstruction(owner, ataPubkey, owner, mint),
    );
  }

  return { account: ataPubkey, instructions };
}

export const convertDecimalPriceToBn = (
  uiPrice: number,
  decimals: number,
): BN => {
  return new BN(uiPrice * 10 ** decimals);
};

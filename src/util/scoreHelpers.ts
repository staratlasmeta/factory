import {
  Provider,
    web3
} from '@project-serum/anchor'
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'

export async function getAtaForMint(
  mint: web3.PublicKey,
  buyer: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return web3.PublicKey.findProgramAddress([
    buyer.toBuffer(),
    TOKEN_PROGRAM_ID.toBuffer(),
    mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
};

export async function createATokenAccount(
  mint: web3.PublicKey,
  playerPublicKey: web3.PublicKey
): Promise<[web3.Keypair]> {
  const [aTokenAccount] = await getAtaForMint(mint, playerPublicKey);
  const tx = new web3.Transaction();
  tx.add()
}

function createAssociatedTokenAccountInstruction(
  associatedTokenAccount: web3.PublicKey,
  payer: web3.PublicKey,
  walletAddress: web3.PublicKey,
  splTokenMintAddress: web3.PublicKey
): Promise<[web3.TransactionInstruction]> {
  const keys = [
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: associatedTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: walletAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: splTokenMintAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  let txInstruction = new web3.TransactionInstruction(
    {
      keys: keys,
      programId: ASSOCIATED_TOKEN_PROGRAM_ID,
      data: Buffer.from([]),
    }
  );

  return txInstruction
}

export async function mintTokens(
  playerPublicKey: web3.PublicKey,
  provider: Provider,
  mint: web3.PublicKey,
  associatedTokenAccount: web3.PublicKey,
  amount: number
): Promise<web3.TransactionSignature> {
  const tx = new web3.Transaction();
  tx.add(Token.createMintToInstruction(
    TOKEN_PROGRAM_ID,
    mint,
    associatedTokenAccount,
    playerPublicKey,
    [],
    amount,
  ));
  const txid = await provider.send(tx);
  return txid;
}

export async function createMint(
  account: web3.PublicKey,
  provider: Provider,
  decimals: number,
): Promise<web3.PublicKey> {
  const tx = new web3.Transaction();


}

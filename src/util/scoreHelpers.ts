import {
  Provider,
    web3
} from '@project-serum/anchor'
import { ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'

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
  playerPublicKey: web3.PublicKey,
  provider: Provider
): Promise<web3.PublicKey> {
  const [aTokenAccount] = await getAtaForMint(mint, playerPublicKey);
  const tx = new web3.Transaction();
  tx.add(await createAssociatedTokenAccountInstruction(
    aTokenAccount,
    playerPublicKey,
    playerPublicKey,
    mint
  ));
  const txid = await provider.send(tx);
  console.log('Created Token Account: ', txid);
  return aTokenAccount
}

export async function createAssociatedTokenAccountInstruction(
  associatedTokenAccount: web3.PublicKey,
  payer: web3.PublicKey,
  walletAddress: web3.PublicKey,
  splTokenMintAddress: web3.PublicKey
): Promise<web3.TransactionInstruction> {
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
  fromPubkey: web3.PublicKey,
  mintAuthority: web3.PublicKey,
  freezeAuthority: web3.PublicKey,
  provider: Provider,
  decimals: number,
): Promise<web3.PublicKey> {
  const account = web3.Keypair.generate();
  const tx = new web3.Transaction();

  const lamps = await provider.connection.getMinimumBalanceForRentExemption(MintLayout.span);

  let createAccountInstruction = web3.SystemProgram.createAccount({
    fromPubkey: fromPubkey,
    newAccountPubkey: account.publicKey,
    lamports:  lamps,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });

  tx.add(createAccountInstruction);

  let initialInstruction = Token.createInitMintInstruction(
    TOKEN_PROGRAM_ID,
    account.publicKey,
    decimals,
    mintAuthority,
    freezeAuthority,
  );
  tx.add(initialInstruction);

  const txid = await provider.send(tx, [account]);
  console.log('Created mint: ', txid);

  return account.publicKey


}

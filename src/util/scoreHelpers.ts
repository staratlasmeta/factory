import {
  Provider,
    web3
} from '@project-serum/anchor'
import { ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { byteArrayToLong } from '.';
import { strict as assert } from 'assert';

/**
 * Returns a program address and bump seed of an associated token account for a designated mint
 * 
 * @param mint - Asset mint
 * @param buyer 
 */
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
}

/**
 *  Create a new account to hold tokens from the provided mint.
 * 
 * @param provider  
 * @param mint - Asset mint to create token account for
 * @param payer (Optional - if not provided, defaults to provider wallet)
 * @param owner (Optional - if not provided, defaults to provider wallet)
 */
export async function createATokenAccount(
  provider: Provider,
  mint: web3.PublicKey,
  payer?: web3.PublicKey,
  owner?: web3.PublicKey
): Promise<web3.PublicKey> {

  payer = payer || provider.wallet.publicKey;
  owner = owner || provider.wallet.publicKey;

  const [associatedTokenAccount] = await getAtaForMint(mint, owner);
  const tx = new web3.Transaction();
  const ix = await createAssociatedTokenAccountInstruction(
    associatedTokenAccount,
    payer,
    owner,
    mint
  );
  tx.add(ix);
  const txid = await provider.send(tx);
  
  console.log('Created Token Account: ', txid);

  return associatedTokenAccount;
}

/**
 * Returns an instruction which can be used to create an associated token account for a designated mint
 * 
 * @param payer 
 * @param owner 
 * @param mint - Asset mint to create token account for
 */
export async function createAssociatedTokenAccountInstruction(
  associatedTokenAccount: web3.PublicKey,
  payer: web3.PublicKey,
  owner: web3.PublicKey,
  mint: web3.PublicKey
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
      pubkey: owner,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mint,
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
  const txInstruction = new web3.TransactionInstruction(
    {
      keys: keys,
      programId: ASSOCIATED_TOKEN_PROGRAM_ID,
      data: Buffer.from([]),
    }
  );

  return txInstruction;
}

/**
 * Mints tokens to associated token account
 * 
 * @param provider
 * @param mint - Asset mint
 * @param destinationTokenAccount - Account for minted tokens to be deposited into
 * @param amount - Desired number of tokens to be minted
 * @param mintAuthority - Publickey of mint authority
 */
export async function mintTokens(
  provider: Provider,
  mint: web3.PublicKey,
  destinationTokenAccount: web3.PublicKey,
  amount: number,
  mintAuthority?: web3.PublicKey,
): Promise<web3.TransactionSignature> {
  const tx = new web3.Transaction();

  mintAuthority = mintAuthority || provider.wallet.publicKey;

  tx.add(Token.createMintToInstruction(
    TOKEN_PROGRAM_ID,
    mint,
    destinationTokenAccount,
    mintAuthority,
    [],
    amount,
  ));
  const txid = await provider.send(tx);
  return txid;
}

/**
 * Creates a new account and calls the Token program to initialize the account as a mint.
 * 
 * @param provider 
 * @param decimals - Number of decimals in token account amount 
 */
export async function createMint(
  provider: Provider,
  decimals: number,
  mintAuthority?: web3.PublicKey,
  freezeAuthority?: web3.PublicKey,
): Promise<web3.PublicKey> {
  const account = web3.Keypair.generate();
  const tx = new web3.Transaction();

  const lamps = await provider.connection.getMinimumBalanceForRentExemption(MintLayout.span);

  mintAuthority = mintAuthority || provider.wallet.publicKey;
  freezeAuthority = freezeAuthority || provider.wallet.publicKey;

  const createAccountInstruction = web3.SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: account.publicKey,
    lamports:  lamps,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });

  tx.add(createAccountInstruction);

  const initialInstruction = Token.createInitMintInstruction(
    TOKEN_PROGRAM_ID,
    account.publicKey,
    decimals,
    mintAuthority,
    freezeAuthority,
  );
  tx.add(initialInstruction);

  const txid = await provider.send(tx, [account]);
  console.log('Created mint: ', txid);

  return account.publicKey;
}

/**
 * Asserts that the balance of a token account matches the provided expected quantity
 * 
 * @param provider 
 * @param tokenAccount - Public key of account to be confirmed
 * @param expectedQuantity 
 */
export async function confirmTokenBalance(
  provider: Provider,
  tokenAccount: web3.PublicKey,
  expectedQuantity: number
) {
  const tokenData = await provider.connection.getAccountInfo(tokenAccount, 'recent');
  const tokenAmount = byteArrayToLong(tokenData.data.slice(64, 72));

  assert(tokenAmount == expectedQuantity, 
    `On-chain Token amount of ${tokenAmount} does not match expected amount ${expectedQuantity}`);
}

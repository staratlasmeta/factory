import { AnchorProvider, BN, web3 } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createMintToInstruction,
  createTransferInstruction,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { byteArrayToLong } from '.';
import { strict as assert } from 'assert';
import { AccountMeta } from '@solana/web3.js';

/**
 * Returns a program address and bump seed of an associated token account for a designated mint
 *
 * @param mint - Asset mint
 * @param buyer
 */
export async function getAtaForMint(
  mint: web3.PublicKey,
  buyer: web3.PublicKey,
): Promise<[web3.PublicKey, number]> {
  return web3.PublicKey.findProgramAddress(
    [buyer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
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
  provider: AnchorProvider,
  mint: web3.PublicKey,
  payer?: web3.PublicKey,
  owner?: web3.PublicKey,
): Promise<web3.PublicKey> {
  payer = payer || provider.wallet.publicKey;
  owner = owner || provider.wallet.publicKey;

  const [associatedTokenAccount] = await getAtaForMint(mint, owner);
  const tx = new web3.Transaction();
  const ix = await createAssociatedTokenAccountInstruction(
    associatedTokenAccount,
    payer,
    owner,
    mint,
  );
  tx.add(ix);
  await provider.sendAndConfirm(tx);

  return associatedTokenAccount;
}

export class Numberu32 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer() {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 4) {
      return b;
    }

    const zeroPad = Buffer.alloc(4);
    b.copy(zeroPad);
    return zeroPad;
  }

  /**
   * Construct a Numberu32 from Buffer representation
   */
  static fromBuffer(buffer) {
    return new BN(
      [...buffer]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16,
    );
  }
}

/**
 * Request more compute units for solana transcations
 */
export async function createRequestUnitsInstruction(
  payer: web3.PublicKey,
): Promise<web3.TransactionInstruction> {
  const maxUnits = new Numberu32(1000000);
  const instruction0 = Buffer.from([0]);
  const buffer = maxUnits.toBuffer();
  return new web3.TransactionInstruction({
    keys: [{ pubkey: payer, isSigner: true, isWritable: true }],
    programId: new web3.PublicKey(
      'ComputeBudget111111111111111111111111111111',
    ),
    data: Buffer.concat([instruction0, buffer]),
  });
}

/**
 * Returns an instruction which can be used to create an associated token account for a designated mint
 *
 * @param associatedTokenAccount
 * @param payer
 * @param owner
 * @param mint - Asset mint to create token account for
 */
export async function createAssociatedTokenAccountInstruction(
  associatedTokenAccount: web3.PublicKey,
  payer: web3.PublicKey,
  owner: web3.PublicKey,
  mint: web3.PublicKey,
): Promise<web3.TransactionInstruction> {
  const keys: AccountMeta[] = [
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
  return new web3.TransactionInstruction({
    keys: keys,
    programId: ASSOCIATED_TOKEN_PROGRAM_ID,
    data: Buffer.from([]),
  });
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
  provider: AnchorProvider,
  mint: web3.PublicKey,
  destinationTokenAccount: web3.PublicKey,
  amount: number,
  mintAuthority?: web3.PublicKey,
): Promise<web3.TransactionSignature> {
  const tx = new web3.Transaction();

  mintAuthority = mintAuthority || provider.wallet.publicKey;

  tx.add(
    createMintToInstruction(
      mint,
      destinationTokenAccount,
      mintAuthority,
      amount,
      [],
    ),
  );
  const txid = await provider.sendAndConfirm(tx);
  return txid;
}

/**
 * Creates a new account and calls the Token program to initialize the account as a mint.
 *
 * @param provider
 * @param decimals - Number of decimals in token account amount
 * @param mintAuthority
 * @param freezeAuthority
 */
export async function createMint(
  provider: AnchorProvider,
  decimals: number,
  mintAuthority?: web3.PublicKey,
  freezeAuthority?: web3.PublicKey,
): Promise<web3.PublicKey> {
  const account = web3.Keypair.generate();
  const tx = new web3.Transaction();

  const lamps = await provider.connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );

  mintAuthority = mintAuthority || provider.wallet.publicKey;
  freezeAuthority = freezeAuthority || provider.wallet.publicKey;

  const createAccountInstruction = web3.SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: account.publicKey,
    lamports: lamps,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });

  tx.add(createAccountInstruction);

  const initialInstruction = createInitializeMintInstruction(
    account.publicKey,
    decimals,
    mintAuthority,
    freezeAuthority,
  );
  tx.add(initialInstruction);

  await provider.sendAndConfirm(tx, [account]);

  return account.publicKey;
}

/**
 * Asserts that the balance of a token account matches the provided expected quantity
 *
 * @param provider - Connection/wallet context
 * @param tokenAccount - Public key of account to be confirmed
 * @param expectedQuantity - Expected number of tokens in account
 * @param confirmClosed
 */
export async function confirmTokenBalance(
  provider: AnchorProvider,
  tokenAccount: web3.PublicKey,
  expectedQuantity: number,
  confirmClosed?: boolean,
) {
  const tokenData = await provider.connection.getAccountInfo(
    tokenAccount,
    'recent',
  );

  // Confirm account is closed
  if (confirmClosed === true) {
    assert(tokenData === null);
  }

  if (tokenData !== null) {
    const tokenAmount = byteArrayToLong(tokenData.data.slice(64, 72));
    assert(
      tokenAmount == expectedQuantity,
      `On-chain Token amount of ${tokenAmount} does not match expected amount ${expectedQuantity}`,
    );
  } else {
    console.log('Token account %s does not exist', tokenAccount.toString());
  }
}

/**
 * Transfers tokens between designated wallets and retursn a transaction signature.
 *
 * @param provider - Connection/wallet context
 * @param fromWallet - Source account
 * @param toWallet - Destination account
 * @param amount - Number of tokens to transfer
 */
export async function sendTokens(
  provider: AnchorProvider, // Keep provider or add connection and pass in owner?
  fromWallet: web3.PublicKey,
  toWallet: web3.PublicKey,
  amount: number,
): Promise<web3.TransactionSignature> {
  const tx = new web3.Transaction();
  tx.add(
    createTransferInstruction(
      fromWallet,
      toWallet,
      provider.wallet.publicKey,
      amount,
      [],
    ),
  );

  return await provider.sendAndConfirm(tx);
}

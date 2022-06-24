import { FactionType} from '..';
import { BN, web3 } from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';

type TokenAccount = {
  type: 'account';
  info: {
    isNative: boolean;
    mint: string;
    owner: string;
    state: 'initialized';
    tokenAmount: {
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
  };
};

export function byteArrayToString(array: number[]): string {
  return String.fromCharCode(...array);
}

export function stringToByteArray(str: string, length: number): any[] {
  if (str.length > length) {
    console.log(`Unable to get byte array, length greater than ${length}`);
    return null;
  }
  let byteArray = [];
  for (let i = 0; i < length; i += 1) {
    let code = 32;
    if (i < str.length) {
      code = str.charCodeAt(i);
    }
    byteArray = byteArray.concat([code]);
  }
  return byteArray;
}

export function byteArrayToLong(byteArray: Buffer): number {
  let value = 0;
  for (let i = byteArray.length - 1; i >= 0; i -= 1) {
    value = (value * 256) + byteArray[i];
  }
  return value;
}

export function longToByteArray(long: number): number[] {
  const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let index = 0; index < byteArray.length; index += 1) {
    const byte = long & 0xff;
    byteArray[index] = byte;
    long = (long - byte) / 256;
  }
  return byteArray;
}

/**
 * Helper function to switch case string inputs for faction filter
 */
export async function convertFactionStringToNum(
  factionName: string
): Promise<number> {
  switch (factionName.toLowerCase()) {
    case 'mud':
      return FactionType.MUD;
    case 'oni':
      return FactionType.ONI;
    case 'ustur':
      return FactionType.Ustur;
    default:
      return FactionType.Unenlisted;
  }
}

/**
 * Get associated token address
 *
 * @param owner - the public key that owns the associated token address
 * @param mint - the mint
 * @returns a promise of the associated token address
 */
 export async function getAssociatedTokenAddress(owner: PublicKey, mint: PublicKey): Promise<PublicKey> {
  const [address] = await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  return address;
}

export async function getTokenAccount(
  connection: web3.Connection,
  wallet: web3.PublicKey,
  mint: web3.PublicKey,
  newAccountFunder: web3.PublicKey = wallet,
  amountNeededHeuristic?: number
): Promise<
  | {
    tokenAccount: web3.PublicKey;
  }
  | {
    tokenAccount: web3.Keypair | web3.PublicKey;
    createInstruction: web3.TransactionInstruction;
  }
> {
  // Get all parsed token accounts for a given owner and mint
  const { value: tokenAccounts } = await connection.getParsedTokenAccountsByOwner(wallet, { mint });
  let tokenAccount: web3.PublicKey | null = null;
  if (amountNeededHeuristic === undefined) {
    let maxTokens: BN | null = null;
    for (const account of tokenAccounts) {
      if (account.account.data.parsed.type === 'account') {
        const parsedAccount = account.account.data.parsed as TokenAccount;
        const tokenAmount = new BN(parsedAccount.info.tokenAmount.amount);
        if (maxTokens === null || tokenAmount.gt(maxTokens)) {
          tokenAccount = account.pubkey;
          maxTokens = tokenAmount;
        }
      }
    }
  } else {
    let minTokens: BN | null = null;
    for (const account of tokenAccounts) {
      if (account.account.data.parsed.type === 'account') {
        const parsedAccount = account.account.data.parsed as TokenAccount;
        const tokenAmount = new BN(parsedAccount.info.tokenAmount.amount);
        if (
          tokenAmount.gt(new BN(amountNeededHeuristic)) &&
          (minTokens === null || tokenAmount.lt(minTokens))
        ) {
          tokenAccount = account.pubkey;
          minTokens = tokenAmount;
        }
      }
    }
  }

  if (tokenAccount === null) {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      mint,
      wallet,
    );
    const { value: account } = await connection.getParsedAccountInfo(
      associatedTokenAddress,
      'confirmed'
    );
    if (account === null || account.owner.equals(SystemProgram.programId)) {
      return {
        tokenAccount: associatedTokenAddress,
        createInstruction: Token.createAssociatedTokenAccountInstruction(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          mint,
          associatedTokenAddress,
          wallet,
          newAccountFunder
        ),
      };
    }

    if (
      'program' in account.data &&
      account.data.parsed.type === 'account' &&
      new PublicKey((account.data.parsed as TokenAccount).info.owner).equals(
        wallet
      )
    ) {
      return {
        tokenAccount: associatedTokenAddress,
      };
    } else {
      const newTokenAccount = web3.Keypair.generate();
      return {
        tokenAccount: newTokenAccount,
        createInstruction: Token.createInitAccountInstruction(
          TOKEN_PROGRAM_ID,
          mint,
          newTokenAccount.publicKey,
          wallet
        ),
      };
    }
  } else {
    return {
      tokenAccount
    };
  }
}

export async function getAccountInfo(
  connection: web3.Connection,
  account: web3.PublicKey,
) {
  const { value: accountInfo } = await connection.getParsedAccountInfo(account);
  const someInfo = accountInfo.data as web3.ParsedAccountData;
  return someInfo
}
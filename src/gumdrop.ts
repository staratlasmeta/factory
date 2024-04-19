import { AnchorProvider, Idl, Program, web3, BN } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  AccountLayout,
  Token,
  u64,
} from '@solana/spl-token';
import * as bs58 from 'bs58';
import { getAssociatedTokenAddress } from './util/helpers';
import { gumDropIdl } from './util/gumdropIdl';

const GUMDROP_DISTRIBUTOR_ID = new web3.PublicKey(
  'gdrpGjVffourzkdDRrQmySw4aTHr8a3xmQzzxSwFD1a'
);

/**
 * Claim status account
 *
 * isClaimed - whether the gumdrop has been claimed or not
 * claimant - the Solana account that claimed the gumdrop
 * claimedAt - the time at which the gumdrop was claimed
 * amount - the amount that was claimed
 */
export interface ClaimStatusAccount {
  isClaimed: boolean;
  claimant: web3.PublicKey;
  claimedAt: BN;
  amount: BN;
}

/**
 * Parameters for creating a new claim
 *
 * connection - the Solana connection object
 * playerPublicKey - the player's public key
 * programId - the public key of the program to execute (Gumdrop program)
 * claimUrl - the url for this player's claim.  The claim url is obtained from the
 *            "claims" JSON file produced after creating a Gumdrop distributor
 */
export interface ClaimTokenInstructionsParams {
  connection: web3.Connection /** the Solana connection object */;
  claimUrl: string;
  playerPublicKey: web3.PublicKey;
  programId: web3.PublicKey;
}

/**
 * Get the claim status public key
 *
 * @param index - the index of the claim
 * @param distributor - the Gumdrop distributor public key
 * @param programId - the public key of the program to execute (Gumdrop program)
 * @returns [claim account public key, bump seed]
 */
export const getClaimStatusKey = async (
  index: u64,
  distributor: web3.PublicKey,
  programId: web3.PublicKey = GUMDROP_DISTRIBUTOR_ID
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('ClaimStatus'),
      index.toArrayLike(Buffer, 'le', 8),
      distributor.toBuffer(),
    ],
    programId
  );
};

/**
 * Helper method to get the claim status account
 * If this does return a valid account, it means that the drop has been claimed already
 *
 * @param connection - the Solana connection object
 * @param index - the index of the claim
 * @param distributor - the Gumdrop distributor public key
 * @param programId - the public key of the program to execute (Gumdrop program)
 * @returns the claim status account or null if the drop has not been claimed
 */
export const getClaimStatusAccount = async (
  connection: web3.Connection,
  index: BN,
  distributor: web3.PublicKey,
  programId: web3.PublicKey = GUMDROP_DISTRIBUTOR_ID
): Promise<ClaimStatusAccount | null> => {
  // Wallet not required to query accounts
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(gumDropIdl as Idl, programId, provider);
  const claimStatusResult = await getClaimStatusKey(
    index,
    distributor,
    programId
  );

  try {
    const account = await program.account.claimStatus.fetch(
      claimStatusResult[0]
    );
    return account as unknown as ClaimStatusAccount;
  } catch (e) {
    return null;
  }
};

/**
 * Helper method to get multiple claim status accounts
 *
 * @param connection - the Solana connection object
 * @param indexArray - the array of the indices of the claims
 * @param distributor - the Gumdrop distributor public key
 * @param programId - the public key of the program to execute (Gumdrop program)
 * @returns array the claim status accounts or null if the drop has not been claimed
 */
export const getMultipleClaimStatusAccounts = async (
  connection: web3.Connection,
  indexArray: BN[],
  distributor: web3.PublicKey,
  programId: web3.PublicKey = GUMDROP_DISTRIBUTOR_ID
): Promise<Array<ClaimStatusAccount | null>> => {
  // Wallet not required to query accounts
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(gumDropIdl as Idl, programId, provider);

  const claimStatusPromises = indexArray.map((it) => {
    return getClaimStatusKey(it, distributor, programId);
  });
  const claimStatusKeys = (await Promise.all(claimStatusPromises)).map(
    (it) => it[0]
  );

  const accounts = await program.account.claimStatus.fetchMultiple(
    claimStatusKeys
  );

  return accounts as Array<ClaimStatusAccount | null>;
};

/**
 * Generate the instruction(s) to claim tokens from the Gumdrop distributor
 * This only works for a distributor configured to deal with fungible token
 * transfers to Solana wallets.
 *
 * @param params - the parameters for the instruction
 * @returns array of Solana transaction instructions
 */
export const claimTokenInstructions = async (
  params: ClaimTokenInstructionsParams
): Promise<web3.TransactionInstruction[]> => {
  const { connection, claimUrl, playerPublicKey, programId } = params;

  // unpack the claim url
  const options = new URLSearchParams(claimUrl.split('?')[1]);
  const distributorKeyStr = options.get('distributor');
  const claimantKeyStr = options.get('handle');
  const claimAmountStr = options.get('amount');
  const claimantIndexStr = options.get('index');
  const proofStr = options.get('proof');
  const tokenAccStr = options.get('tokenAcc');
  if (
    !distributorKeyStr ||
    !claimantKeyStr ||
    !claimAmountStr ||
    !claimantIndexStr ||
    !proofStr ||
    !tokenAccStr
  ) {
    throw new Error('Invalid claim');
  }

  // get the proof as a Buffer
  const proof =
    proofStr === ''
      ? []
      : proofStr.split(',').map((b) => {
          const ret = Buffer.from(bs58.decode(b));
          if (ret.length !== 32) {
            throw new Error('Invalid proof hash length');
          }
          return ret;
        });
  // get the distributor token and mint accounts
  const distributorKey = new web3.PublicKey(distributorKeyStr);
  const distributorTokenKey = new web3.PublicKey(tokenAccStr);
  const distTokenAccount = await connection.getAccountInfo(distributorTokenKey);
  if (distTokenAccount === null) {
    throw new Error('Could not fetch distributor token account');
  }
  const tokenAccountInfo = AccountLayout.decode(distTokenAccount.data);
  const distributorMintKey = new web3.PublicKey(tokenAccountInfo.mint);

  // get the claimant token account
  const claimantKey = new web3.PublicKey(claimantKeyStr);
  const claimantTokenKey = await getAssociatedTokenAddress(
    claimantKey,
    distributorMintKey
  );
  const claimantTokenAccount = await connection.getParsedTokenAccountsByOwner(
    claimantKey,
    {
      mint: distributorMintKey,
    }
  );

  // get the claim account for this player (owned by the gumdrop program)
  const index = new BN(claimantIndexStr);
  const amount = new BN(claimAmountStr);
  const [claimStatusKey, nonce] = await getClaimStatusKey(
    index,
    distributorKey,
    programId
  );

  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(gumDropIdl as Idl, programId, provider);

  const instructions = [];

  // if the claimant toke account does not exist, create it
  if (claimantTokenAccount.value.length === 0) {
    instructions.push(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        distributorMintKey,
        claimantTokenKey,
        claimantKey,
        playerPublicKey
      )
    );
  }

  instructions.push(
    program.instruction.claim(
      nonce /** the claim status account nonce */,
      index /** the index */,
      amount /** the amount */,
      playerPublicKey,
      proof /** proof */,
      {
        accounts: {
          distributor: distributorKey,
          claimStatus: claimStatusKey,
          from: distributorTokenKey,
          to: claimantTokenKey,
          temporal: playerPublicKey,
          payer: playerPublicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        },
      }
    )
  );

  return instructions;
};


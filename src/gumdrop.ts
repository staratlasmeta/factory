/**
node build/gumdrop-cli.js create --claim-integration transfer \
    --transfer-mint DrG3dPxTvcLSwa83xEX5tU8Zx8gVCHBmaizHSpbo9PKg \
    --distribution-method wallets \
    --distribution-list /home/mosh/Downloads/gumdrop-example.json \
    -e devnet \
    -k ~/.config/solana/id.json
*/

import { Idl, Program, Provider, web3, BN } from '@project-serum/anchor';
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
 * connection - the Solana connection object
 * playerPublicKey - the player's public key
 * programId - the program id of the program to execute (Gumdrop program)
 * claimUrl - the url for this player's claim.  The claim url is obtained from the
 *            "claims" JSON file produced after creating a Gumdrop distributor
 */
interface ClaimTokenInstructionsParams {
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
 * @returns [claim account public key, bump seed]
 */
export const getClaimStatusKey = async (
  index: u64,
  distributor: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return await web3.PublicKey.findProgramAddress(
    [
      Buffer.from('ClaimStatus'),
      index.toArrayLike(Buffer, 'le', 8),
      distributor.toBuffer(),
    ],
    GUMDROP_DISTRIBUTOR_ID
  );
};

/**
 * Generate the instruction(s) to claim tokens from the Gumdrop didstributor
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
  const [claimStatus, nonce] = await getClaimStatusKey(index, distributorKey);

  const provider = new Provider(connection, null, null);
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
          claimStatus,
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

const provider = Provider.env();

claimTokenInstructions({
  connection: provider.connection,
  claimUrl:
    'https://lwus.github.io/gumdrop/claim?distributor=DBn1zonMvudgTriZRYVHHQyqCHd5ZeionPWeKWkcGcER&handle=44fVncfVm5fB8VsRBwVZW75FdR1nSVUKcf9nUa4ky6qN&amount=10&index=0&proof=7iwAXdidunuBjJXwEGCmKhiX8K4eVAH4GhYmh8NxxdPY&pin=NA&tokenAcc=B7WvBgsq9pq14bzBoFPTWWQnbYBdBVcmRezXmSARai7g',
  playerPublicKey: provider.wallet.publicKey,
  programId: GUMDROP_DISTRIBUTOR_ID,
})
  .catch((error) => console.log(`Error ${error}`))
  .then(async (result) => {
    if (result) {
      const tx = new web3.Transaction();
      tx.add(...result);
      const id = await provider.send(tx);
      console.log('txid', id);
    }
  });

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  longToByteArray,
  sendAndConfirmTransaction
} from './util';

const FACTION_PREFIX = 'FACTION_ENLISTMENT';
const ENLIST_INFO_SEED = 'ENLIST_INFO';

export enum FactionType {
  Unenlisted = -1,
  MUD = 0,
  ONI = 1,
  Ustur = 2,
}

/**
 * Get player faction PDA
 */
export async function getPlayerFactionPDA(
  playerPublicKey: PublicKey, programId: PublicKey,
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([
    Buffer.from(FACTION_PREFIX, 'utf8'),
    programId.toBuffer(),
    playerPublicKey.toBuffer(),
  ], programId);
}

/**
 * Get enlist info PDA
 */
async function getEnlistInfoPDA(programId: PublicKey): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([
    Buffer.from(ENLIST_INFO_SEED, 'utf8'),
    programId.toBuffer()
  ], programId);
}

/**
 * Create enlist player to faction transaction
 */
 export async function enlistToFactionInstruction(
  factionID: FactionType,
  playerKey: PublicKey,
  programId: PublicKey,
): Promise<TransactionInstruction> {

  const [playerFactionPDA] = await getPlayerFactionPDA(playerKey, programId);
  const [enlistInfoPDA] = await getEnlistInfoPDA(programId);

  // Create Associated Player Faction Account
  return new TransactionInstruction({
    keys: [{ pubkey: playerKey, isSigner: true, isWritable: true },
      { pubkey: playerFactionPDA, isSigner: false, isWritable: true },
      { pubkey: enlistInfoPDA, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }],
    programId,
    data: Buffer.from([1, ...longToByteArray(factionID)]),
  });
}

/**
 * Enlist player to faction
 */
 export async function enlistToFaction(
  connection: Connection,
  factionID: FactionType,
  playerKeypair: Keypair,
  programId: PublicKey,
): Promise<string> {

  const instruction = await enlistToFactionInstruction(factionID, playerKeypair.publicKey, programId);
  const transaction = new Transaction().add(instruction);
  let txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    playerKeypair
  );
  return txResult;
}

/**
 * Create enlist info account - saves faction player counts
 */
 export async function createEnlistInfoAccount(
  playerKey: PublicKey = null,
  programId: PublicKey = null,
 ): Promise<Transaction> {

  const [enlistInfoPDA] = await getEnlistInfoPDA(programId);
  const systemProgramPubKey = new PublicKey('11111111111111111111111111111111');

  // Create Enlist Info Account
  const instruction = new TransactionInstruction({
      keys: [{pubkey: playerKey, isSigner: true, isWritable: true},
              {pubkey: enlistInfoPDA, isSigner: false, isWritable: true},
              {pubkey: systemProgramPubKey, isSigner: false, isWritable: false}],
      programId: programId,
      data: Buffer.from([0])
  });

  const transaction = new Transaction().add(instruction);
  
  return transaction;
}

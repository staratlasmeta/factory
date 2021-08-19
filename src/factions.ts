import {
  AccountInfo,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  byteArrayToLong,
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
export async function getEnlistInfoPDA(
  programId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([
    Buffer.from(ENLIST_INFO_SEED, 'utf8'),
    programId.toBuffer()
  ], programId);
}

/**
 * Faction Enlistment Models
 */
export class EnlistInfo {
  mudPlayerCount: number;
  oniPlayerCount: number;
  usturPlayerCount: number;

  constructor(args: {
    mudPlayerCount: number;
    oniPlayerCount: number;
    usturPlayerCount: number;
  }) {
    this.mudPlayerCount = args.mudPlayerCount;
    this.oniPlayerCount = args.oniPlayerCount;
    this.usturPlayerCount = args.usturPlayerCount;
  }
}
export class PlayerFaction {
  playerId: number;
  factionId: number;

  constructor(args: {
    playerId: number;
    factionId: number;
  }) {
    this.playerId = args.playerId;
    this.factionId = args.factionId;
  }
}

export const FACTION_SCHEMA = new Map<any, any>([
  [
    EnlistInfo,
    {
      kind: 'struct',
      fields: [
        ['mudPlayerCount', 'u64'],
        ['oniPlayerCount', 'u64'],
        ['usturPlayerCount', 'u64'],
      ],
    },
  ],
  [
    PlayerFaction,
    {
      kind: 'struct',
      fields: [
        ['playerId', 'u64'],
        ['factionId', 'u64'],
      ],
    },
  ],
]);

/**
 * Create enlist player to faction transaction
 */
 export async function enlistToFactionInstruction(
  factionID: FactionType,
  playerPublicKey: PublicKey,
  programId: PublicKey,
): Promise<TransactionInstruction> {

  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey, programId);
  const [enlistInfoPDA] = await getEnlistInfoPDA(programId);

  // Create Associated Player Faction Account
  return new TransactionInstruction({
    keys: [{ pubkey: playerPublicKey, isSigner: true, isWritable: true },
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
  const txResult = await sendAndConfirmTransaction(
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
  connection: Connection,
  payerKeypair: Keypair,
  programId: PublicKey = null,
 ): Promise<Transaction> {

  const [enlistInfoPDA] = await getEnlistInfoPDA(programId);
  const systemProgramPubKey = new PublicKey('11111111111111111111111111111111');

  // Create Enlist Info Account
  const instruction = new TransactionInstruction({
      keys: [{pubkey: payerKeypair.publicKey, isSigner: true, isWritable: true},
              {pubkey: enlistInfoPDA, isSigner: false, isWritable: true},
              {pubkey: systemProgramPubKey, isSigner: false, isWritable: false}],
      programId: programId,
      data: Buffer.from([0])
  });

  const transaction = new Transaction().add(instruction);
  const txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    payerKeypair
  );
  //TODO: create function to send (ref lines 86:90)
  return transaction;
}

/**
 * Get a player
 */
export async function getPlayer(
  connection: Connection,
  playerPublicKey: PublicKey,
  programID: PublicKey,
): Promise<number[]> {
  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey, programID);

  //TODO: error handling: check if no response
  const info = await connection.getAccountInfo(playerFactionPDA);

  //TODO: serialize/deserialize with Borsh
  const playerID = byteArrayToLong(info.data.slice(0, 7));
  const factionID = byteArrayToLong(info.data.slice(8, 15));

  console.log('playerID: ' + playerID + ', factionID: ' + factionID)
  return [playerID, factionID]
}


/**
 * Get all players
 * 
 * TODO: return: array of arrays containing playerID & factionID
 * to be refactored to Borsh
 */
export async function getAllPlayers(
  connection: Connection,
  programID: PublicKey, // Faction enlistment program ID
): Promise<string[]> {
  const players = await connection.getProgramAccounts(programID);
  const playerAccounts = []
  for (let i=0; i < players.length; i++) {
    if (players[i].account.data.length == 16) {
      playerAccounts.push([players[i].pubkey.toBase58(), byteArrayToLong(players[i].account.data.slice(0, 7)), byteArrayToLong(players[i].account.data.slice(8,15))])
    }
  }

  console.log(playerAccounts)
  return playerAccounts
}
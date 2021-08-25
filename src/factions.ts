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

import { deserializeUnchecked } from 'borsh';

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
        ['factionId', 'u8'],
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
 * Create enlist info account - saves faction player counts
 */
 export async function createEnlistInfoAccount(
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

  const playerFaction = deserializeUnchecked(
    FACTION_SCHEMA,
    PlayerFaction,
    info.data,
  ) as PlayerFaction;

  return [playerFaction.playerId, playerFaction.factionId]
}

/**
 * Get all players
 */
export async function getAllPlayers(
  connection: Connection,
  programID: PublicKey, // Faction enlistment program ID
): Promise<string[]> {
  const players = await connection.getProgramAccounts(programID);
  const playerAccounts = [];
  for (let i=0; i < players.length; i++) {
    if (players[i].account.data.length == 16) {

      const playerFaction = deserializeUnchecked(
        FACTION_SCHEMA,
        PlayerFaction,
        players[i].account.data,
      ) as PlayerFaction;

      playerAccounts.push([players[i].pubkey.toBase58(), playerFaction.playerId, playerFaction.factionId]);
    }
  }

  return playerAccounts;
}

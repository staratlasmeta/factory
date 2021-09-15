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
  convertFactionStringToNum,
} from './util';
import { deserializeUnchecked } from 'borsh';
import bs58 from 'bs58';
import {
  Program,
  web3,
} from '@project-serum/anchor';

const FACTION_PREFIX = 'FACTION_ENLISTMENT';
const ENLIST_INFO_SEED = 'ENLIST_INFO';

const idl = JSON.parse(require('fs').readFileSync('../../star-atlas-programs/sol-programs/enlist-to-faction/target/idl/enlist_to_faction.json'));
const programId = new web3.PublicKey('MUGtJfcx6GAphTPwL5DseEpTcGQySGxQ11U3EXqJswU');
const program = new Program(idl, programId);

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

type PlayerFactionData = {
  factionPubkey: PublicKey,
  factionId: number,
  playerId: number,
}

/**
 *  Create enlist player to faction transaction
 */
export async function enlistToFaction(
  factionID: FactionType,
  playerPublicKey: PublicKey,
  programId: PublicKey,
): Promise<TransactionInstruction> {
  const [playerFactionPda, bump] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(FACTION_PREFIX, 'utf-8'),
      playerPublicKey.toBuffer()
    ],
    programId
  )

  const tx = await program.instruction.processEnlistPlayer(bump, factionID {
    accounts: {
      playerFactionAccount: playerFactionPda,
      playerAccount: playerPublicKey,
      systemProgram: SystemProgram.programId,
      clock: web3.SYSVAR_CLOCK_PUBKEY,
    },
    signers: [],
  });
  
  return tx
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
): Promise<PlayerFactionData[]> {
  const players = await connection.getProgramAccounts(programID);
  const playerAccounts = [];
  for (let i=0; i < players.length; i++) {
    if (players[i].account.data.length == 9) {

      const playerFaction = deserializeUnchecked(
        FACTION_SCHEMA,
        PlayerFaction,
        players[i].account.data,
      ) as PlayerFaction;

      const playerFactionData: PlayerFactionData = {
        factionPubkey: players[i].pubkey,
        playerId: playerFaction.playerId,
        factionId: playerFaction.factionId
      }

      playerAccounts.push(playerFactionData)
    }
  }

  return playerAccounts;
}

/**
 * Get all players of a specified faction
 */
export async function getPlayersOfFaction(
  connection: Connection,
  factionID: any,
  programId: PublicKey
): Promise<PlayerFactionData[]> {
  let factionNum = null
  if (typeof factionID === 'string'){
    const numFromFactionString = await convertFactionStringToNum(factionID)
    factionNum = numFromFactionString.toString()
  }
  else {
    factionNum = factionID.toString()
  }
  const rawBytes = Buffer.from('0' + factionNum, 'hex')
  const filterBytes = bs58.encode(rawBytes)
  const accountFilter = { memcmp: {bytes: filterBytes, offset: 8}}
  const programAccountConfig = {filters: [accountFilter]}
  const players = await connection.getProgramAccounts(programId, programAccountConfig);
  const playerAccounts = [];
  for (let i=0; i < players.length; i++) {
    if (players[i].account.data.length == 9) {

      const playerFaction = deserializeUnchecked(
        FACTION_SCHEMA,
        PlayerFaction,
        players[i].account.data,
      ) as PlayerFaction;

      const playerFactionData: PlayerFactionData = {
        factionPubkey: players[i].pubkey,
        playerId: playerFaction.playerId,
        factionId: playerFaction.factionId
      }
      playerAccounts.push(playerFactionData)
    }
  }
    
    return playerAccounts;
}

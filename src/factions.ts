import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import {
  Idl,
  Provider,
  web3,
} from '@project-serum/anchor';
import * as idl from './enlist_to_faction.json';

const programId = new PublicKey('MUGtJfcx6GAphTPwL5DseEpTcGQySGxQ11U3EXqJswU');

const FACTION_PREFIX = 'FACTION_ENLISTMENT';

export enum FactionType {
  Unenlisted = -1,
  MUD = 0,
  ONI = 1,
  Ustur = 2,
}

export async function getPlayerFactionPDA(
  playerPublicKey: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([
    Buffer.from(FACTION_PREFIX, 'utf8'),
    playerPublicKey.toBuffer(),
  ], programId);
}

/**
 *  Create enlist player to faction transaction
 */
export async function enlistToFaction(
  factionID: FactionType,
  playerPublicKey: PublicKey
): Promise<TransactionInstruction> {
  const [playerFactionPda, bump] = await getPlayerFactionPDA(playerPublicKey);

  const program = new anchor.Program(<Idl>idl, programId);
  const tx = await program.instruction.processEnlistPlayer(bump, factionID, {
    accounts: {
      playerFactionAccount: playerFactionPda,
      playerAccount: playerPublicKey,
      systemProgram: SystemProgram.programId,
      clock: web3.SYSVAR_CLOCK_PUBKEY,
    },
  });
  
  return tx;
}

/**
 * Get a player's faction information
 */
export async function getPlayer(
  provider: Provider,
  playerPublicKey: PublicKey
): Promise<Object> {
  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey);
  const program = new anchor.Program(<Idl>idl, programId, provider);
  return await program.account.playerFactionData.fetch(playerFactionPDA);
}

/**
 * Get all players
 */
export async function getAllPlayers(
  provider: Provider
): Promise<anchor.ProgramAccount[]> {
  const program = new anchor.Program(<Idl>idl, programId, provider);
  return await program.account.playerFactionData.all();
}

/**
 * Get all players of a specified faction
 */
export async function getPlayersOfFaction(
  provider: Provider,
  factionID: FactionType
): Promise<Object[]> {
  
  const program = new anchor.Program(<Idl>idl, programId, provider);
  const players = await program.account.playerFactionData.all();
  
  const filtered = players
    .filter(player => player.account.factionId == factionID);

  return filtered;
}

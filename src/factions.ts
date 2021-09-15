import {
  Idl,
  Program,
  ProgramAccount,
  Provider,
  web3
} from '@project-serum/anchor';
import * as idl from './enlist_to_faction.json';

const programId = new web3.PublicKey('MUGtJfcx6GAphTPwL5DseEpTcGQySGxQ11U3EXqJswU');

const FACTION_PREFIX = 'FACTION_ENLISTMENT';

export enum FactionType {
  Unenlisted = -1,
  MUD = 0,
  ONI = 1,
  Ustur = 2,
}

export async function getPlayerFactionPDA(
  playerPublicKey: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return web3.PublicKey.findProgramAddress([
    Buffer.from(FACTION_PREFIX, 'utf8'),
    playerPublicKey.toBuffer(),
  ], programId);
}

/**
 *  Create enlist player to faction transaction
 */
export async function enlistToFaction(
  factionID: FactionType,
  playerPublicKey: web3.PublicKey
): Promise<web3.TransactionInstruction> {
  const [playerFactionPda, bump] = await getPlayerFactionPDA(playerPublicKey);

  const program = new Program(<Idl>idl, programId);
  const tx = await program.instruction.processEnlistPlayer(bump, factionID, {
    accounts: {
      playerFactionAccount: playerFactionPda,
      playerAccount: playerPublicKey,
      systemProgram: web3.SystemProgram.programId,
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
  playerPublicKey: web3.PublicKey
): Promise<Object> {
  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey);
  const program = new Program(<Idl>idl, programId, provider);
  return await program.account.playerFactionData.fetch(playerFactionPDA);
}

/**
 * Get all players
 */
export async function getAllPlayers(
  provider: Provider
): Promise<ProgramAccount[]> {
  const program = new Program(<Idl>idl, programId, provider);
  return await program.account.playerFactionData.all();
}

/**
 * Get all players of a specified faction
 */
export async function getPlayersOfFaction(
  provider: Provider,
  factionID: FactionType
): Promise<Object[]> {
  
  const program = new Program(<Idl>idl, programId, provider);
  const players = await program.account.playerFactionData.all();
  
  const filtered = players
    .filter(player => player.account.factionId == factionID);

  return filtered;
}

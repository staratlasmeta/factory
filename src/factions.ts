import {
  Idl,
  Program,
  Provider,
  web3
} from '@project-serum/anchor';
import * as idl from './enlist_to_faction.json';

const FACTION_PREFIX = 'FACTION_ENLISTMENT';

export enum FactionType {
  Unenlisted = -1,
  MUD = 0,
  ONI = 1,
  Ustur = 2,
}

interface PlayerFaction {
  owner: web3.PublicKey;
  enlistedAtTimestamp: number;
  factionId: number;
  bump: number;
  padding: Buffer;
}

export async function getPlayerFactionPDA(
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
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
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
  const [playerFactionPda, bump] = await getPlayerFactionPDA(playerPublicKey, programId);

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
  connection: web3.Connection,
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
): Promise<PlayerFaction> {

  // Wallet not required to query player faction account
  const provider = new Provider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);
  
  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey, programId);
  const obj = await program.account.playerFactionData.fetch(playerFactionPDA);
  return <PlayerFaction>obj;
}

/**
 * Get all players
 */
export async function getAllPlayers(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<PlayerFaction[]> {

  // Wallet not required to query player faction accounts
  const provider = new Provider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);
  const programAccounts = await program.account.playerFactionData.all();
  
  const players = programAccounts
    .map(player => <PlayerFaction>player.account);
  
  return players;
}

/**
 * Get all players of a specified faction
 */
export async function getPlayersOfFaction(
  connection: web3.Connection,
  factionID: FactionType,
  programId: web3.PublicKey
): Promise<PlayerFaction[]> {
  
  // Wallet not required to query player faction accounts
  const provider = new Provider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);
  const programAccounts = await program.account.playerFactionData.all();
  
  const filtered = programAccounts
    .map(player => <PlayerFaction>player.account)
    .filter(player => player.factionId == factionID);

  return filtered;
}

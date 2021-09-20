import {
  Idl,
  Program,
  ProgramAccount,
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
  provider: Provider,
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
): Promise<PlayerFaction> {
  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey, programId);
  const program = new Program(<Idl>idl, programId, provider);
  const obj = await program.account.playerFactionData.fetch(playerFactionPDA);
  return <PlayerFaction>obj;
}

/**
 * Get all players
 */
export async function getAllPlayers(
  provider: Provider,
  programId: web3.PublicKey
): Promise<ProgramAccount[]> {
  const program = new Program(<Idl>idl, programId, provider);
  return await program.account.playerFactionData.all();
}

/**
 * Get all players of a specified faction
 */
export async function getPlayersOfFaction(
  provider: Provider,
  factionID: FactionType,
  programId: web3.PublicKey
): Promise<PlayerFaction[]> {
  
  const program = new Program(<Idl>idl, programId, provider);
  const players = await program.account.playerFactionData.all();
  
  const filtered = players
    .map(player => <PlayerFaction>player.account)
    .filter(player => player.factionId == factionID);

  return filtered;
}

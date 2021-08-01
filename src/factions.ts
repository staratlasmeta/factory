import {
  PublicKey, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction,
} from '@solana/web3.js';
import { longToByteArray } from './util';

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
    playerPublicKey.toBuffer(),
  ], programId);
}

/**
 * Get enlist info PDA
 */
async function getEnlistInfoPDA(programId: PublicKey): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([
    Buffer.from(ENLIST_INFO_SEED, 'utf8')
  ], programId);
}

/**
 * Enlist player to faction
 */
export async function enlistToFaction(
  factionID: FactionType,
  playerKey: PublicKey = null,
  programId: PublicKey = null,
): Promise<Transaction> {
  const [playerFactionPDA] = await getPlayerFactionPDA(playerKey, programId);
  const [enlistInfoPDA] = await getEnlistInfoPDA(programId);

  const systemProgramPubKey = new PublicKey('11111111111111111111111111111111');
  // Create Associated Player Faction Account
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: playerKey, isSigner: true, isWritable: true },
      { pubkey: playerFactionPDA, isSigner: false, isWritable: true },
      { pubkey: enlistInfoPDA, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: systemProgramPubKey, isSigner: false, isWritable: false }],
    programId,
    data: Buffer.from([0, ...longToByteArray(factionID)]),
  });

  const transaction = new Transaction().add(instruction);

  return transaction;
}

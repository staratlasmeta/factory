import {
  PublicKey, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction,
} from '@solana/web3.js';
import { longToByteArray } from './util';

const FACTION_PREFIX = 'FACTION_ENLISTMENT';

/**
 * Get player faction account
 */
export async function getPlayerFactionAccount(
  playerPublicKey: PublicKey, programId: PublicKey,
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress([
    Buffer.from(FACTION_PREFIX, 'utf8'),
    playerPublicKey.toBuffer(),
  ], programId);
}

/**
 * Enlist player to faction
 */
export async function enlistToFaction(
  factionID: number,
  playerKey: PublicKey = null,
  enlistInfoKey: PublicKey = null,
  programId: PublicKey = null,
): Promise<Transaction> {
  const derivedAddressData = await getPlayerFactionAccount(playerKey, programId);

  const systemProgramPubKey = new PublicKey('11111111111111111111111111111111');
  // Create Associated Player Faction Account
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: playerKey, isSigner: true, isWritable: true },
      { pubkey: derivedAddressData[0], isSigner: false, isWritable: true },
      { pubkey: enlistInfoKey, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: systemProgramPubKey, isSigner: false, isWritable: false }],
    programId,
    data: Buffer.from([0, ...longToByteArray(factionID)]),
  });

  const transaction = new Transaction().add(instruction);

  return transaction;
}

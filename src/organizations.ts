import {
  PublicKey, 
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  Keypair,
  Connection
} from '@solana/web3.js';
import { longToByteArray, stringToByteArray } from './util';
import { getPlayerFactionPDA } from './factions';

const MAX_ORG_NAME_LENGTH = 32;
const ENLIST_INFO_SEED = "ENLIST_INFO";
const FACTION_PREFIX = "FACTION_ENLISTMENT";
const ORG_NAME_PREFIX = "ORG";
const JOIN_ORG_PREFIX = "JOIN";

/**
 * Convert organization name string to byte array
 */
export function getOrgNameBytes(
  name: string
): any[] {
  if (name.length > MAX_ORG_NAME_LENGTH) {
    console.log("Unable to create player org, length greater than", MAX_ORG_NAME_LENGTH);
    throw "Unable to get org name bytes";
  }
  return stringToByteArray(name, MAX_ORG_NAME_LENGTH);
}

/**
 * Get the organization account based on the name
 */
export async function getOrganizationAccount(
  name: string,
  organizationProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress([
    Buffer.from(ORG_NAME_PREFIX, 'utf8'),
    Buffer.from(name.padEnd(32, ' '), 'utf8')
  ], organizationProgramId);
}

/**
 * Get the player's member account for a specific organization
 */
export async function getPlayerMemberAccount(
  name: string,
  playerKey: PublicKey,
  organizationProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress([
    playerKey.toBuffer(), 
    Buffer.from(JOIN_ORG_PREFIX, 'utf8'), 
    Buffer.from(name.padEnd(32, ' '), 'utf8')
  ], organizationProgramId);
}

/**
 * Initialize player organization info account
 */
export async function initPlayerOrgInfo(
   connection: Connection,
   playerKey: PublicKey,
   organizationProgramId: PublicKey
): Promise<Transaction> {

  // TODO: from pda - call instruction on program
  let playerOrgInfoAccount = new Keypair();
  console.log('Creating playerOrgInfoAccount with address ', playerOrgInfoAccount.publicKey.toBase58());

  // Get rent exempt amount of lamports for 3 u64 values
  let space = 3 * 8;
  const lamports = await connection.getMinimumBalanceForRentExemption(space);

  // Create playerOrgInfoAccount
  const instruction = SystemProgram.createAccount({
    fromPubkey: playerKey,
    newAccountPubkey: playerOrgInfoAccount.publicKey,
    lamports,
    space,
    programId: organizationProgramId,
  });

  const transaction = new Transaction().add(instruction);

  return transaction;
}

/**
 * Create a player organization
 * 
 * name: name of organization
 * factionID: faction this organization belongs to 
 * maxPlayers: max amount of approved players
 * taxRate: tax rate for organization
 * isPrivate: if set, requires owner to approve all players
 * payerKey: account to create organization from - signer + pays fees
 * orgInfoKey: account for organization info            ******** TODO: from PDA ********
 * organizationProgramId: program Id for organizations
 * factionEnlistmentProgramId: program Id for faction enlistment
 */
 export async function createPlayerOrganization(
   name: string,
   factionID: number,
   maxPlayers: number,
   taxRate: number,
   isPrivate: boolean,
   payerKey: PublicKey,
   orgInfoKey: PublicKey,
   organizationProgramId: PublicKey,
   factionEnlstmentProgramId: PublicKey
): Promise<Transaction> {

  // Player faction account needed to confirm the player is in a specific faction
  let [playerFactionPda] = await getPlayerFactionPDA(payerKey, factionEnlstmentProgramId);

  // Get name byte array and org pda
  let nameByteArray = getOrgNameBytes(name);
  let [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  let isPrivateNum = isPrivate ? 1 : 0;

  // Create Player Organization
  let systemProgramPubKey = new PublicKey('11111111111111111111111111111111');
  const instruction = new TransactionInstruction({
      keys: [{pubkey: payerKey, isSigner: true, isWritable: true},
             {pubkey: playerFactionPda, isSigner: false, isWritable: false},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: orgInfoKey, isSigner: false, isWritable: true},
             {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
             {pubkey: systemProgramPubKey, isSigner: false, isWritable: false}],
      programId: organizationProgramId,
      data: Buffer.from([0, ...longToByteArray(factionID), ...nameByteArray, 
            ...longToByteArray(maxPlayers), ...longToByteArray(taxRate), isPrivateNum])
  });

  const transaction = new Transaction().add(instruction);

  return transaction;
}

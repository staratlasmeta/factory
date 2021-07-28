import {
  PublicKey, 
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  Keypair,
  Connection,
} from '@solana/web3.js';
import { longToByteArray, stringToByteArray } from './util';
import { getPlayerFactionPDA } from './factions';

const MAX_ORG_NAME_LENGTH = 32;
const ORG_NAME_PREFIX = 'ORG';
const JOIN_ORG_PREFIX = 'JOIN';

/**
 * Convert organization name string to byte array
 */
export function getOrgNameBytes(
  name: string
): any[] {
  if (name.length > MAX_ORG_NAME_LENGTH) {
    console.log('Unable to create player org, length greater than', MAX_ORG_NAME_LENGTH);
    throw 'Unable to get org name bytes';
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
 * Get player organization owner
 */
export async function getOrganizationOwner(
  name: string,
  connection: Connection,
  organizationProgramId: PublicKey
): Promise<PublicKey> {
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const info = await connection.getAccountInfo(playerOrgPda, 'recent');
  // TODO: deserialize here
  return new PublicKey(info.data.slice(81, 113));
}

/**
 * Initialize player organization info account
 */
export async function initOrganizationInfo(
   connection: Connection,
   playerKey: PublicKey,
   organizationProgramId: PublicKey
): Promise<Transaction> {

  // TODO: from pda - call instruction on program
  const playerOrgInfoAccount = new Keypair();
  console.log('Creating playerOrgInfoAccount with address', playerOrgInfoAccount.publicKey.toBase58());

  // Get rent exempt amount of lamports for 3 u64 values
  const space = 3 * 8;
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
 export async function createOrganization(
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
  const [playerFactionPda] = await getPlayerFactionPDA(payerKey, factionEnlstmentProgramId);

  // Get name byte array and org pda
  const nameByteArray = getOrgNameBytes(name);
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const isPrivateNum = isPrivate ? 1 : 0;

  // Create Player Organization
  const instruction = new TransactionInstruction({
      keys: [{pubkey: payerKey, isSigner: true, isWritable: true},
             {pubkey: playerFactionPda, isSigner: false, isWritable: false},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: orgInfoKey, isSigner: false, isWritable: true},
             {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
             {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}],
      programId: organizationProgramId,
      data: Buffer.from([0, ...longToByteArray(factionID), ...nameByteArray, 
            ...longToByteArray(maxPlayers), ...longToByteArray(taxRate), isPrivateNum])
  });

  const transaction = new Transaction().add(instruction);

  return transaction;
}

/**
 * Approve a player to join an organization
 * (for private orgs only)
 * 
 * name: name of organization 
 * ownerKey: owner of organization
 * playerKey: player to approve
 * organizationProgramId: program Id for organizations
 */
export async function approvePlayer(
  name: string,
  ownerKey: PublicKey,
  playerKey: PublicKey,
  organizationProgramId: PublicKey,
) {

  // Get org/member pdas
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerMemberPda] = await getPlayerMemberAccount(name, playerKey, organizationProgramId);

  // Approve Player
  const instruction = new TransactionInstruction({
      keys: [{pubkey: ownerKey, isSigner: true, isWritable: true},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerMemberPda, isSigner: false, isWritable: true}],
      programId: organizationProgramId,
      data: Buffer.from([1])
  });

  const transaction = new Transaction().add(instruction);
  
  return transaction;
}

/**
 * Join a player organization
 * 
 * name: name of organization 
 * factionID: factionID of organization 
 * playerKey: player to join organization
 * playerIsSigned: if player joins themselves, player needs to sign 
 * ownerIsSigned: if owner joins a player, owner needs to sign 
 * connection: Solana Connection
 * organizationProgramId: program Id for organizations
 * factionEnlistmentProgramId: program Id for faction enlistment
 */
export async function joinOrganization(
  name: string,
  factionID: number,
  playerKey: PublicKey,
  playerIsSigned: boolean,
  ownerIsSigned: boolean,
  connection: Connection,
  organizationProgramId: PublicKey,
  factionEnlstmentProgramId: PublicKey,
): Promise<Transaction> {

  // Player faction account needed to confirm the player is in a specific faction
  const [playerFactionPda] = await getPlayerFactionPDA(playerKey, factionEnlstmentProgramId);
  
  // Get name byte array and org/member pdas
  const nameByteArray = getOrgNameBytes(name);
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerMemberPda] = await getPlayerMemberAccount(name, playerKey, organizationProgramId);
  
  // Get owner from on chain account
  const ownerPubkey = await getOrganizationOwner(name, connection, organizationProgramId);

  // Join Player Organization
  const instruction = new TransactionInstruction({
      keys: [{pubkey: playerKey, isSigner: playerIsSigned, isWritable: true},
             {pubkey: playerFactionPda, isSigner: false, isWritable: true},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerMemberPda, isSigner: false, isWritable: true},
             {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: true},
             {pubkey: SystemProgram.programId, isSigner: false, isWritable: true},
             {pubkey: ownerPubkey, isSigner: ownerIsSigned, isWritable: true}],
      programId: organizationProgramId,
      data: Buffer.from([2, ...longToByteArray(factionID), ...nameByteArray])
  });

  const transaction = new Transaction().add(instruction);

  return transaction;
}

/**
 * Leave an organization
 * 
 * name: name of organization 
 * factionID: factionID of organization 
 * playerKey: player to join organization
 * playerIsSigned: if player joins themselves, player needs to sign 
 * ownerIsSigned: if owner joins a player, owner needs to sign 
 * connection: Solana Connection
 * organizationProgramId: program Id for organizations
 */
export async function leaveOrganization(
  name: string,
  factionID: number,
  playerKey: PublicKey,
  playerIsSigned: boolean,
  ownerIsSigned: boolean,
  connection: Connection,
  organizationProgramId: PublicKey
): Promise<Transaction> {

  // Get name byte array and org/member pdas
  const nameByteArray = getOrgNameBytes(name);
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerMemberPda] = await getPlayerMemberAccount(name, playerKey, organizationProgramId);

  // Get owner from on chain account
  const ownerPubkey = await getOrganizationOwner(name, connection, organizationProgramId);

  // Leave Organization
  const instruction = new TransactionInstruction({
      keys: [{pubkey: playerKey, isSigner: playerIsSigned, isWritable: true},
             {pubkey: ownerPubkey, isSigner: ownerIsSigned, isWritable: true},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerMemberPda, isSigner: false, isWritable: true}],
      programId: organizationProgramId,
      data: Buffer.from([3, ...longToByteArray(factionID), ...nameByteArray])
  });
  const transaction = new Transaction().add(instruction);

  return transaction;
}

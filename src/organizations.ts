import {
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  Keypair,
  Connection,
} from '@solana/web3.js';
import {
  longToByteArray,
  stringToByteArray,
  sendAndConfirmTransaction
} from './util';
import { getPlayerFactionPDA } from './factions';

const MAX_ORG_NAME_LENGTH = 32;
const ORG_INFO_PREFIX = 'ORG_INFO';
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
 * Get the organization info account
 */
 export async function getOrgInfoAccount(
  organizationProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress([
    Buffer.from(ORG_INFO_PREFIX, 'utf8'),
    organizationProgramId.toBuffer(),
  ], organizationProgramId);
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
 * Create initialize player organization info account instruction
 */
export async function initOrganizationInfoInstruction(
   payerKey: PublicKey,
   organizationProgramId: PublicKey
): Promise<TransactionInstruction> {

  const [playerOrgInfoPda] = await getOrgInfoAccount(organizationProgramId);
  return new TransactionInstruction({
    keys: [{pubkey: payerKey, isSigner: true, isWritable: true},
           {pubkey: playerOrgInfoPda, isSigner: false, isWritable: true},
           {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}],
    programId: organizationProgramId,
    data: Buffer.from([0])
  });
}

/**
 * Initialize player organization info account
 */
 export async function initOrganizationInfo(
  connection: Connection,
  payerKeypair: Keypair,
  organizationProgramId: PublicKey
): Promise<string> {

  const instruction = await initOrganizationInfoInstruction(payerKeypair.publicKey, organizationProgramId);
  const transaction = new Transaction().add(instruction);
  const txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    payerKeypair
  );
  return txResult;
}

/**
 * Create a Create Player Organization transaction instruction
 */
 export async function createOrganizationInstruction(
   name: string,
   factionID: number,
   maxPlayers: number,
   taxRate: number,
   isPrivate: boolean,
   payerKey: PublicKey,
   organizationProgramId: PublicKey,
   factionEnlstmentProgramId: PublicKey
): Promise<TransactionInstruction> {

  // Player faction account needed to confirm the player is in a specific faction
  const [playerFactionPda] = await getPlayerFactionPDA(payerKey, factionEnlstmentProgramId);

  // Get name byte array and pdas
  const isPrivateNum = isPrivate ? 1 : 0;
  const nameByteArray = getOrgNameBytes(name);
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerOrgInfoPda] = await getOrgInfoAccount(organizationProgramId);

  // Create Player Organization
  return new TransactionInstruction({
      keys: [{pubkey: payerKey, isSigner: true, isWritable: true},
             {pubkey: playerFactionPda, isSigner: false, isWritable: false},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerOrgInfoPda, isSigner: false, isWritable: true},
             {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
             {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}],
      programId: organizationProgramId,
      data: Buffer.from([1, ...longToByteArray(factionID), ...nameByteArray, 
            ...longToByteArray(maxPlayers), ...longToByteArray(taxRate), isPrivateNum])
  });
}

/**
 * Create a player organization
 * 
 * Initialize player organization info account
 * name: name of organization
 * factionID: faction this organization belongs to 
 * maxPlayers: max amount of approved players
 * taxRate: tax rate for organization
 * isPrivate: if set, requires owner to approve all players
 * payerKey: account to create organization from - signer + pays fees
 * organizationProgramId: program Id for organizations
 * factionEnlistmentProgramId: program Id for faction enlistment
 */
 export async function createOrganization(
  connection: Connection,
  name: string,
  factionID: number,
  maxPlayers: number,
  taxRate: number,
  isPrivate: boolean,
  payerKeypair: Keypair,
  organizationProgramId: PublicKey,
  factionEnlstmentProgramId: PublicKey
): Promise<string> {

  const instruction = await createOrganizationInstruction(
    name,
    factionID,
    maxPlayers,
    taxRate,
    isPrivate,
    payerKeypair.publicKey,
    organizationProgramId,
    factionEnlstmentProgramId
  );
  const transaction = new Transaction().add(instruction);
  const txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    payerKeypair
  );
  return txResult;
}

/**
 * Create an Approve Player transaction instruction
 */
export async function approvePlayerInstruction(
  name: string,
  ownerKey: PublicKey,
  playerKey: PublicKey,
  organizationProgramId: PublicKey,
): Promise<TransactionInstruction> {

  // Get org/member pdas
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerMemberPda] = await getPlayerMemberAccount(name, playerKey, organizationProgramId);

  // Approve Player
  return new TransactionInstruction({
      keys: [{pubkey: ownerKey, isSigner: true, isWritable: true},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerMemberPda, isSigner: false, isWritable: true}],
      programId: organizationProgramId,
      data: Buffer.from([2])
  });
}

/**
 * Approve a player to join an organization
 * (for private orgs only)
 * 
 * name: name of organization 
 * ownerKeypair: owner of organization - signer
 * playerKey: player to approve
 * organizationProgramId: program Id for organizations
 */
export async function approvePlayer(
  connection: Connection,
  name: string,
  ownerKeypair: Keypair,
  playerKey: PublicKey,
  organizationProgramId: PublicKey,
): Promise<string> {

  const instruction = await approvePlayerInstruction(
    name,
    ownerKeypair.publicKey,
    playerKey,
    organizationProgramId
  );
  const transaction = new Transaction().add(instruction);
  const txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    ownerKeypair
  );
  return txResult;
}

/**
 * Create a Join Organization transaction instruction
 */
export async function joinOrganizationInstruction(
  name: string,
  factionID: number,
  playerKey: PublicKey,
  ownerKey: PublicKey,
  playerIsSigned: boolean,
  ownerIsSigned: boolean,
  organizationProgramId: PublicKey,
  factionEnlstmentProgramId: PublicKey,
): Promise<TransactionInstruction> {

  // Player faction account needed to confirm the player is in a specific faction
  const [playerFactionPda] = await getPlayerFactionPDA(playerKey, factionEnlstmentProgramId);
  
  // Get name byte array and org/member pdas
  const nameByteArray = getOrgNameBytes(name);
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerMemberPda] = await getPlayerMemberAccount(name, playerKey, organizationProgramId);
  
  // Join Player Organization
  return new TransactionInstruction({
      keys: [{pubkey: playerKey, isSigner: playerIsSigned, isWritable: true},
             {pubkey: playerFactionPda, isSigner: false, isWritable: true},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerMemberPda, isSigner: false, isWritable: true},
             {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: true},
             {pubkey: SystemProgram.programId, isSigner: false, isWritable: true},
             {pubkey: ownerKey, isSigner: ownerIsSigned, isWritable: true}],
      programId: organizationProgramId,
      data: Buffer.from([3, ...longToByteArray(factionID), ...nameByteArray])
  });
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
  connection: Connection,
  name: string,
  factionID: number,
  playerKeypair: Keypair = null,
  ownerKeypair: Keypair = null,
  playerIsSigned: boolean,
  ownerIsSigned: boolean,
  organizationProgramId: PublicKey,
  factionEnlstmentProgramId: PublicKey,
): Promise<string> {

  // Get owner from on chain account & confirm matches argument if passed in
  const ownerPubkey = await getOrganizationOwner(name, connection, organizationProgramId);
  if (ownerKeypair && ownerPubkey.toBase58() != ownerKeypair.publicKey.toBase58()) {
    throw 'Unable to join organization, owner account mismatch';
  }

  const instruction = await joinOrganizationInstruction(
    name,
    factionID,
    playerKeypair.publicKey,
    ownerPubkey,
    playerIsSigned,
    ownerIsSigned,
    organizationProgramId,
    factionEnlstmentProgramId
  );
  
  // Player OR Organization Owner can join a player to the organization
  let signerKeypair: Keypair;
  if (playerIsSigned && !ownerIsSigned) {
    signerKeypair = playerKeypair;
  } else if (!playerIsSigned && ownerIsSigned) {
    signerKeypair = ownerKeypair;
  } else {
    throw 'Invalid mismatch: only player or owner can sign transaction';
  }

  const transaction = new Transaction().add(instruction);
  const txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    signerKeypair
  );
  return txResult;
}

/**
 * Create a Leave Organization transaction instruction
 */
export async function leaveOrganizationInstruction(
  name: string,
  factionID: number,
  playerKey: PublicKey,
  ownerKey: PublicKey,
  playerIsSigned: boolean,
  ownerIsSigned: boolean,
  organizationProgramId: PublicKey
): Promise<TransactionInstruction> {

  // Get name byte array and org/member pdas
  const nameByteArray = getOrgNameBytes(name);
  const [playerOrgPda] = await getOrganizationAccount(name, organizationProgramId);
  const [playerMemberPda] = await getPlayerMemberAccount(name, playerKey, organizationProgramId);

  // Leave Organization
  return new TransactionInstruction({
      keys: [{pubkey: playerKey, isSigner: playerIsSigned, isWritable: true},
             {pubkey: ownerKey, isSigner: ownerIsSigned, isWritable: true},
             {pubkey: playerOrgPda, isSigner: false, isWritable: true},
             {pubkey: playerMemberPda, isSigner: false, isWritable: true}],
      programId: organizationProgramId,
      data: Buffer.from([4, ...longToByteArray(factionID), ...nameByteArray])
  });
}

/**
 * Leave an organization
 * 
 * (or Kick a player from the organization via Owner)
 * 
 * name: name of organization 
 * factionID: factionID of organization 
 * playerKey: player to join organization
 * ownerKey: owner of organization - can kick player from organization
 * playerIsSigned: if player joins themselves, player needs to sign 
 * ownerIsSigned: if owner joins a player, owner needs to sign 
 * connection: Solana Connection
 * organizationProgramId: program Id for organizations
 */
export async function leaveOrganization(
  name: string,
  factionID: number,
  playerKeypair: Keypair = null,
  ownerKeypair: Keypair = null,
  playerIsSigned: boolean,
  ownerIsSigned: boolean,
  connection: Connection,
  organizationProgramId: PublicKey
): Promise<string> {

  // Get owner from on chain account & confirm matches argument if passed in
  const ownerPubkey = await getOrganizationOwner(name, connection, organizationProgramId);
  if (ownerKeypair && ownerPubkey.toBase58() != ownerKeypair.publicKey.toBase58()) {
    throw 'Unable to leave organization, owner account mismatch';
  }

  const instruction = await leaveOrganizationInstruction(
    name,
    factionID,
    playerKeypair.publicKey,
    ownerPubkey,
    playerIsSigned,
    ownerIsSigned,
    organizationProgramId
  );

  // Player OR Organization Owner can join a player to the organization
  let signerKeypair: Keypair;
  if (playerIsSigned && !ownerIsSigned) {
    signerKeypair = playerKeypair;
  } else if (!playerIsSigned && ownerIsSigned) {
    signerKeypair = ownerKeypair;
  } else {
    throw 'Invalid mismatch: only player or owner can sign transaction';
  }

  const transaction = new Transaction().add(instruction);
  const txResult = await sendAndConfirmTransaction(
    connection,
    transaction,
    signerKeypair
  );
  return txResult;
}
import { AnchorProvider, Idl, Program, web3 } from '@project-serum/anchor';
import type { AnchorTypes } from '../anchor/types';
import { snapshotsIdl } from './idl/snapshotsIdl';
import * as SNAPSHOTS_TYPES from './idl/snapshotsIdl';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';

export type SNAPSHOTS_PROGRAM = SNAPSHOTS_TYPES.Snapshots;
export type SnapshotsTypes = AnchorTypes<SNAPSHOTS_PROGRAM>;
type Account = SnapshotsTypes['Accounts'];

export type LockerHistoryInfo = Account['LockerHistory'];
export type EscrowHistoryInfo = Account['EscrowHistory'];

const encodeU16 = (num: number): Buffer => {
  const buf = Buffer.alloc(2);
  buf.writeUInt16LE(num);
  return buf;
};

export async function getOrCreateEscrowHistory(
  escrow: PublicKey,
  era: number,
  programId: web3.PublicKey
): Promise<{
  escrowHistory: PublicKey;
  instruction: TransactionInstruction | null;
}> {
  const [escrowHistory] = await findEscrowHistoryAddress(
    escrow,
    era,
    programId
  );
  const escrowHistoryData =
    await this.program.account.escrowHistory.fetchNullable(escrowHistory);
  if (escrowHistoryData) {
    return { escrowHistory, instruction: null };
  }
  return {
    escrowHistory,
    instruction: await this.newEscrowHistoryIX(escrow, escrowHistory, era),
  };
}

/**
 * Returns the snapshots IDL
 *
 * @param programId - Deployed program ID for the program
 * @returns - The IDL object
 */
export function getSnapshotsIDL(programId: web3.PublicKey): unknown {
  const _tmp = snapshotsIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

/**
 * Finds the address of an EscrowHistory.
 */
export async function findEscrowHistoryAddress(
  escrow: web3.PublicKey,
  era: number,
  programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return await web3.PublicKey.findProgramAddress(
    [Buffer.from('EscrowHistory'), escrow.toBuffer(), encodeU16(era)],
    programId
  );
}

/**
 * Finds the address of a LockerHistory.
 */
export async function findLockerHistoryAddress(
  locker: web3.PublicKey,
  era: number,
  programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return await web3.PublicKey.findProgramAddress(
    [Buffer.from('LockerHistory'), locker.toBuffer(), encodeU16(era)],
    programId
  );
}

/**
 * Returns a list of escrow history accounts
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - EscrowHistoryInfo
 */
export async function getAllEscrowHistory(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<EscrowHistoryInfo[]> {
  const idl = getSnapshotsIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);

  const _escrowHistoryAccounts = await program.account.escrowHistory.all();
  const escrowHistoryAccounts = [];
  for (const escrowHistory of _escrowHistoryAccounts) {
    escrowHistoryAccounts.push(<EscrowHistoryInfo>escrowHistory.account);
  }
  return escrowHistoryAccounts;
}

/**
 * Returns a locker history account
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - LockerHistoryInfo
 */
export async function getAllLockerHistory(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<LockerHistoryInfo[]> {
  const idl = getSnapshotsIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);
  // const [lockerHistory] = await findLockerHistoryAddress(
  //   locker,
  //   era,
  //   programId
  // );

  const _lockerHistoryAccount = await program.account.lockerHistory.all();
  const lockerHistoryAccount = [];
  for (const lockerHistory of _lockerHistoryAccount) {
    lockerHistoryAccount.push(<LockerHistoryInfo>lockerHistory.account);
  }
  return lockerHistoryAccount;
}

/**
 * Creates instruction to syncs a user's era (escrow history account) for snapshot history
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - TransactionInstruction
 */
export async function createSyncUserEraInstruction(
  connection: web3.Connection,
  programId: web3.PublicKey,
  locker: web3.PublicKey,
  escrow: web3.PublicKey,
  era: number
): Promise<web3.TransactionInstruction> {
  const idl = getSnapshotsIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);

  const [lockerHistory] = await findLockerHistoryAddress(
    locker,
    era,
    programId
  );
  const [escrowHistory] = await findEscrowHistoryAddress(
    escrow,
    era,
    programId
  );
  return program.instruction.sync({
    accounts: {
      locker,
      escrow,
      lockerHistory,
      escrowHistory,
    },
  });
}

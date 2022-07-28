import {
  AnchorProvider,
  BN,
  Idl,
  Program,
  web3
} from '@project-serum/anchor'
import type { AnchorTypes } from '../anchor/types';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import { SystemProgram } from '@solana/web3.js';
import { snapshotsIdl } from './idl/snapshotsIdl';
import * as SNAPSHOTS_TYPES from './idl/snapshotsIdl';

const snapshotsProgramId = new web3.PublicKey('SnapGJHJrDbWMkxMukFDWTUq1wxNMB7CcDhPEU8aJCS');

export type SNAPSHOTS_PROGRAM = SNAPSHOTS_TYPES.Snapshots;
export type SnapshotsTypes = AnchorTypes<SNAPSHOTS_PROGRAM>;
type Account = SnapshotsTypes['Accounts'];

export type LockerHistoryInfo = Account['LockerHistory'];
export type EscrowHistoryInfo = Account['EscrowHistory'];

/**
 * Returns the snapshots IDL
 *
 * @param programId - Deployed program ID for the program
 * @returns - The IDL object
 */
export function getSnapshotsIDL(
  programId: web3.PublicKey,
): unknown {
  const _tmp = snapshotsIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
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
  programId: web3.PublicKey,
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

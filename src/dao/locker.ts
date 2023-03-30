import { AnchorProvider, Idl, Program, web3 } from '@project-serum/anchor';
import type { AnchorTypes } from '../anchor/types';
import { lockedVoterIdl } from './idl/lockedVoterIdl';
import * as LOCKEDVOTER_TYPES from './idl/lockedVoterIdl';

export type LOCKEDVOTER_PROGRAM = LOCKEDVOTER_TYPES.LockedVoter;
export type LockedVoterTypes = AnchorTypes<LOCKEDVOTER_PROGRAM>;
type Account = LockedVoterTypes['Accounts'];

export type LockerInfo = Account['Locker'];
export type LockerWhitelistEntryInfo = Account['LockerWhitelistEntry'];
export type EscrowInfo = Account['Escrow'];

/**
 * Returns the locked voter IDL
 *
 * @param programId - Deployed program ID for the program
 * @returns - The IDL object
 */
export function getLockedVoterIDL(programId: web3.PublicKey): unknown {
  const _tmp = lockedVoterIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

export async function findEscrowAddress(
  locker: web3.PublicKey,
  authority: web3.PublicKey,
  programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return await web3.PublicKey.findProgramAddress(
    [Buffer.from('Escrow'), locker.toBuffer(), authority.toBuffer()],
    programId
  );
}

interface EscrowInfoWithAddress {
  address: string;
  data: EscrowInfo;
}

/**
 * Returns a list of escrow accounts
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - EscrowInfo
 */
export async function getAllEscrow(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<EscrowInfoWithAddress[]> {
  const idl = getLockedVoterIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);

  const _escrowAccounts = await program.account.escrow.all();
  const escrowAccounts = [];
  for (const escrow of _escrowAccounts) {
    const data: EscrowInfoWithAddress = {
      address: escrow.publicKey.toBase58(),
      data: <EscrowInfo>escrow.account,
    };
    escrowAccounts.push(data);
  }
  return escrowAccounts;
}

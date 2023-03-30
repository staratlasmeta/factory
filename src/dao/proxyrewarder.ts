import { AnchorProvider, Idl, Program, web3 } from '@project-serum/anchor';
import type { AnchorTypes } from '../anchor/types';
import { proxyRewarderIdl } from './idl/proxyRewarderIdl';
import * as PROXYREWARDER_TYPES from './idl/proxyRewarderIdl';

export type PROXYREWARDER_PROGRAM = PROXYREWARDER_TYPES.ProxyRewarder;
export type ProxyRewarderTypes = AnchorTypes<PROXYREWARDER_PROGRAM>;
type Account = ProxyRewarderTypes['Accounts'];

export type ProxyInfo = Account['Proxy'];
export type ProxyEscrowInfo = Account['ProxyEscrow'];
export type RegisteredLockerInfo = Account['RegisteredLocker'];

/**
 * Returns the ProxyRewarder IDL
 *
 * @param programId - Deployed program ID for the program
 * @returns - The IDL object
 */
export function getProxyRewarderIDL(programId: web3.PublicKey): unknown {
  const _tmp = proxyRewarderIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

interface ProxyInfoWithAddress {
  address: string;
  data: ProxyInfo;
}

/**
 * Returns a list of proxy accounts
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - ProxyInfoWithAddress
 */
export async function getAllProxy(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<ProxyInfoWithAddress[]> {
  const idl = getProxyRewarderIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);

  const _accounts = await program.account.proxy.all();
  const accounts = [];
  for (const account of _accounts) {
    const data: ProxyInfoWithAddress = {
      address: account.publicKey.toBase58(),
      data: <ProxyInfo>account.account,
    };
    accounts.push(data);
  }
  return accounts;
}

/**
 * Returns a list of proxy escrow accounts
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - proxyEscrowAccounts
 */
export async function getAllProxyEscrow(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<ProxyEscrowInfo[]> {
  const idl = getProxyRewarderIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);

  const _proxyEscrowAccounts = await program.account.proxyEscrow.all();
  const proxyEscrowAccounts = [];
  for (const proxyEscrow of _proxyEscrowAccounts) {
    proxyEscrowAccounts.push(<ProxyEscrowInfo>proxyEscrow.account);
  }
  return proxyEscrowAccounts;
}

/**
 * Returns a list of registered locker accounts
 *
 * @param connection - web3.Connection object
 * @param programId - Deployed program ID for the program
 * @returns - RegisteredLocker
 */
export async function getAllRegisteredLocker(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<RegisteredLockerInfo[]> {
  const idl = getProxyRewarderIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);

  const _accounts = await program.account.proxy_escrow.all();
  const accounts = [];
  for (const account of _accounts) {
    accounts.push(<RegisteredLockerInfo>account.account);
  }
  return accounts;
}

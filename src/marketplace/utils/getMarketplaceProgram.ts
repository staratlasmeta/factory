import { Idl, Program, AnchorProvider, web3 } from '@coral-xyz/anchor';
import { baseIdl } from './../types/gmIdl';
import * as gmLogsIdl from './../types/gmLogsIdl';

/**
 * Returns the IDL for the Galactic Marketplace program with provided program ID stored in metadata.
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getGmIDL(programId: web3.PublicKey): unknown {
  const _tmp = baseIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

/**
 * Returns the IDL for the GM-Logs program with provided program ID stored in metadata.
 *
 * @param programId - Deployed program ID for GM-Logs
 */
export function getGmLogsIDL(programId: web3.PublicKey): unknown {
  const _tmp = gmLogsIdl.baseIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

/**
 * Get the Galactic Marketplace program
 *
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export function getMarketplaceProgram({
  connection,
  programId,
}: {
  connection: web3.Connection;
  programId: web3.PublicKey;
}): Program<Idl> {
  const idl = getGmIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(idl as Idl, programId, provider);

  return program;
}

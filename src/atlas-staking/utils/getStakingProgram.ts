import {
    AnchorProvider,
    Idl,
    Program,
    web3,
} from '@project-serum/anchor';
import {
    stakingIdl
} from './../types/stakingIdl';

/**
 * Returns the IDL for the Staking program with provided program ID stored in metadata.
 *
 * @param programId - Deployed program ID for Staking Program
 */
export function getStakingIdl(
    programId: web3.PublicKey
): unknown {
    const _tmp = stakingIdl;
    _tmp['metadata']['address'] = programId.toBase58();
    return _tmp;
}

/**
 * Get the Staking Program
 *
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for Staking Program
 */
export function getStakingProgram(
{ connection, programId }: { connection: web3.Connection; programId: web3.PublicKey; },
): Program<Idl> {
    const idl = getStakingIdl(programId);
    const provider = new AnchorProvider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    return program
}

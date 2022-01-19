import { web3 } from "@project-serum/anchor";
import { baseIdl } from "./util/gmIdl";

/*
* Returns the IDL for the Galactic Marketplace program with provided program ID stored in metadata.
*
* @param programId - Deployed program ID for Galactic Marketplace
*/
export function getGmIDL(
    programId: web3.PublicKey
): unknown {
    const _tmp = baseIdl;
    _tmp['metadata']['address'] = programId.toBase58();
    return _tmp;
}
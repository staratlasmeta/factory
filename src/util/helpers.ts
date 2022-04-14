import { FactionType} from '..';
import { PublicKey } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';

export function byteArrayToString(array: number[]): string {
  return String.fromCharCode(...array);
}

export function stringToByteArray(str: string, length: number): any[] {
  if (str.length > length) {
    console.log(`Unable to get byte array, length greater than ${length}`);
    return null;
  }
  let byteArray = [];
  for (let i = 0; i < length; i += 1) {
    let code = 32;
    if (i < str.length) {
      code = str.charCodeAt(i);
    }
    byteArray = byteArray.concat([code]);
  }
  return byteArray;
}

export function byteArrayToLong(byteArray: Buffer): number {
  let value = 0;
  for (let i = byteArray.length - 1; i >= 0; i -= 1) {
    value = (value * 256) + byteArray[i];
  }
  return value;
}

export function longToByteArray(long: number): number[] {
  const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let index = 0; index < byteArray.length; index += 1) {
    const byte = long & 0xff;
    byteArray[index] = byte;
    long = (long - byte) / 256;
  }
  return byteArray;
}

/**
 * Helper function to switch case string inputs for faction filter
 */
export async function convertFactionStringToNum(
  factionName: string
): Promise<number> {
  switch (factionName.toLowerCase()) {
    case 'mud':
      return FactionType.MUD;
    case 'oni':
      return FactionType.ONI;
    case 'ustur':
      return FactionType.Ustur;
    default:
      return FactionType.Unenlisted;
  }
}

/**
 * Get associated token address
 *
 * @param owner - the public key that owns the associated token address
 * @param mint - the mint
 * @returns a promise of the associated token address
 */
 export async function getAssociatedTokenAddress(owner: PublicKey, mint: PublicKey): Promise<PublicKey> {
  const [address] = await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  return address;
}

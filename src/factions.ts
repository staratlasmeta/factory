import {
  Idl,
  Program,
  AnchorProvider,
  web3
} from '@project-serum/anchor';
import { AnchorTypes } from './anchor/types';

export type FactionEnlistment = {
  'version': '0.0.0',
  'name': 'enlist_to_faction',
  'instructions': [
    {
      'name': 'processEnlistPlayer',
      'accounts': [
        {
          'name': 'playerFactionAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'bump',
          'type': 'u8'
        },
        {
          'name': 'factionId',
          'type': 'u8'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'PlayerFactionData',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'enlistedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'factionId',
            'type': 'u8'
          },
          {
            'name': 'bump',
            'type': 'u8'
          },
          {
            'name': 'padding',
            'type': {
              'array': [
                'u64',
                5
              ]
            }
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 300,
      'name': 'FactionTypeError',
      'msg': 'Faction ID must be 0, 1, or 2.'
    }
  ],
  'metadata': {
  }
};

const baseIdl: FactionEnlistment = {
  'version': '0.0.0',
  'name': 'enlist_to_faction',
  'instructions': [
    {
      'name': 'processEnlistPlayer',
      'accounts': [
        {
          'name': 'playerFactionAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'bump',
          'type': 'u8'
        },
        {
          'name': 'factionId',
          'type': 'u8'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'PlayerFactionData',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'enlistedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'factionId',
            'type': 'u8'
          },
          {
            'name': 'bump',
            'type': 'u8'
          },
          {
            'name': 'padding',
            'type': {
              'array': [
                'u64',
                5
              ]
            }
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 300,
      'name': 'FactionTypeError',
      'msg': 'Faction ID must be 0, 1, or 2.'
    }
  ],
  'metadata': {
  }
};

const FACTION_PREFIX = 'FACTION_ENLISTMENT';

type FactionEnlistmentTypes = AnchorTypes<FactionEnlistment>;
type Accounts = FactionEnlistmentTypes['Accounts'];
export type PlayerFaction = Accounts['PlayerFactionData']

export enum FactionType {
  Unenlisted = -1,
  MUD = 0,
  ONI = 1,
  Ustur = 2,
}

export function getIDL(
  programId: web3.PublicKey,
): unknown {
  const _tmp = baseIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

export async function getPlayerFactionPDA(
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return web3.PublicKey.findProgramAddress([
    Buffer.from(FACTION_PREFIX, 'utf8'),
    playerPublicKey.toBuffer(),
  ], programId);
}

/**
 *  Create transaction instruction which can be used to enlist a player to a faction.
 */
export async function enlistToFaction(
  connection: web3.Connection,
  factionID: FactionType,
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
  const [playerFactionPda, bump] = await getPlayerFactionPDA(playerPublicKey, programId);

  const idl = getIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Idl>idl, programId, provider);
  const txInstruction = await program.instruction.processEnlistPlayer(bump, factionID, {
    accounts: {
      playerFactionAccount: playerFactionPda,
      playerAccount: playerPublicKey,
      systemProgram: web3.SystemProgram.programId,
      clock: web3.SYSVAR_CLOCK_PUBKEY,
    },
  });
  
  return txInstruction;
}

/**
 * Get a player's faction information
 */
export async function getPlayer(
  connection: web3.Connection,
  playerPublicKey: web3.PublicKey,
  programId: web3.PublicKey
): Promise<PlayerFaction> {

  // Wallet not required to query player faction account
  const provider = new AnchorProvider(connection, null, null);
  const idl = getIDL(programId);
  const program = new Program(<Idl>idl, programId, provider);
  
  const [playerFactionPDA] = await getPlayerFactionPDA(playerPublicKey, programId);
  const obj = await program.account.playerFactionData.fetch(playerFactionPDA);
  return obj as PlayerFaction;
}

/**
 * Get all players
 */
export async function getAllPlayers(
  connection: web3.Connection,
  programId: web3.PublicKey
): Promise<PlayerFaction[]> {

  // Wallet not required to query player faction accounts
  const provider = new AnchorProvider(connection, null, null);
  const idl = getIDL(programId);
  const program = new Program(<Idl>idl, programId, provider);
  const programAccounts = await program.account.playerFactionData.all();
  
  const players = programAccounts
    .map(player => <PlayerFaction>player.account);
  
  return players;
}

/**
 * Get all players of a specified faction
 */
export async function getPlayersOfFaction(
  connection: web3.Connection,
  factionID: FactionType,
  programId: web3.PublicKey
): Promise<PlayerFaction[]> {
  
  // Wallet not required to query player faction accounts
  const provider = new AnchorProvider(connection, null, null);
  const idl = getIDL(programId);
  const program = new Program(<Idl>idl, programId, provider);
  const programAccounts = await program.account.playerFactionData.all();
  
  const filtered = programAccounts
    .map(player => <PlayerFaction>player.account)
    .filter(player => player.factionId == factionID);

  return filtered;
}

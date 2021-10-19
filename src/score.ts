import {
    BN,
    Idl,
    Program,
    Provider,
    web3
} from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

const baseIdl: unknown = {
  'version': '0.0.0',
  'name': 'score',
  'instructions': [
    {
      'name': 'processInitializeScoreVars',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'bump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'processInitialDeposit',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'bump',
          'type': 'u8'
        },
        {
          'name': 'shipQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRefuel',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'fuelQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRefeed',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'foodQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRearm',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'armsQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRepair',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'toolkitMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'toolkitTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'toolkitTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'toolkitQuantity',
          'type': 'u64'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'ShipStaking',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'shipMint',
            'type': 'publicKey'
          },
          {
            'name': 'shipQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'fuelQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'foodQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'armsQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'toolkitQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'fuelCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'foodCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'armsCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'toolkitCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'stakedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'fueledAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'fedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'armedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'repairedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'totalTimeStaked',
            'type': 'u64'
          }
        ]
      }
    },
    {
      'name': 'ScoreVars',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'updateAuthority',
            'type': 'publicKey'
          },
          {
            'name': 'fuelBurnRate',
            'type': 'u16'
          },
          {
            'name': 'foodBurnRate',
            'type': 'u16'
          },
          {
            'name': 'armsBurnRate',
            'type': 'u16'
          },
          {
            'name': 'toolkitBurnRate',
            'type': 'u16'
          },
          {
            'name': 'pearceX4RewardRate',
            'type': 'u64'
          },
          {
            'name': 'opalJetRewardRate',
            'type': 'u64'
          },
          {
            'name': 'pearceX5RewardRate',
            'type': 'u64'
          },
          {
            'name': 'opalJetjetRewardRate',
            'type': 'u64'
          },
          {
            'name': 'vzusOpodRewardRate',
            'type': 'u64'
          },
          {
            'name': 'filmbulByosRewardRate',
            'type': 'u64'
          },
          {
            'name': 'calicoCompaktRewardRate',
            'type': 'u64'
          },
          {
            'name': 'ogrikaThripidRewardRate',
            'type': 'u64'
          },
          {
            'name': 'calicoGuardianRewardRate',
            'type': 'u64'
          },
          {
            'name': 'padding',
            'type': {
              'array': [
                'u64',
                64
              ]
            }
          }
        ]
      }
    }
  ],
  'metadata': {
    'address': '' 
  }
}

export function getIDL(
  programId: web3.PublicKey,
): unknown {
  const _tmp = baseIdl;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

export async function getScoreVarsAccount(
    programId: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
    return web3.PublicKey.findProgramAddress([
        Buffer.from('SCORE_VARS')],
        programId,
        );
}

export async function getScoreEscrowAccount(
    programId: web3.PublicKey,
    shipMint: web3.PublicKey,
    resourceMint: web3.PublicKey,
    user: web3.PublicKey):
    Promise<[web3.PublicKey, number]> {
        let seeds = [
            Buffer.from('SCORE_ESCROW'),
            user.toBuffer(),
            shipMint.toBuffer()
        ];
        if (resourceMint !== null) {
            seeds.push(resourceMint.toBuffer());
        }
        return web3.PublicKey.findProgramAddress(
            seeds,
            programId
        );
    }

export async function getScoreAuthEscrowAccount(
    programId: web3.PublicKey,
    shipMint: web3.PublicKey,
    user: web3.PublicKey):
    Promise<[web3.PublicKey, number]> {
        return web3.PublicKey.findProgramAddress([
            Buffer.from('SCORE_ESCROW_AUTHORITY'),
            shipMint.toBuffer(),
            user.toBuffer()],
            programId,
        );
    }

export async function getShipStakingAccount(
  programId: web3.PublicKey,
  assetMint: web3.PublicKey,
  user: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return web3.PublicKey.findProgramAddress([
    Buffer.from('SCORE_INFO'),
    assetMint.toBuffer(),
    user.toBuffer()],
    programId,
  );
}
/**
 * Initialize SCORE variables
 */

export async function initializeScoreVarsInstruction(
    updateAuthority: web3.PublicKey,
    connection: web3.Connection,
    programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
    const [scoreVarsAccount, scoreVarsBump] = await getScoreVarsAccount(programId);

    const idl = getIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(<Idl>idl, programId, provider);
    const txInstruction = await program.instruction.processInitializeScoreVars(
        scoreVarsBump,
        {
            accounts: {
                updateAuthorityAccount: updateAuthority,
                scoreVarsAccount: scoreVarsAccount,
                systemProgram: web3.SystemProgram.programId
            }
        }
    )
    return txInstruction
}

/**
 * Create Initial Deposit instruction
 */
export async function initialDepositInstruction(
    playerPublicKey: web3.PublicKey,
    shipQuantity: number,
    connection: web3.Connection,
    shipMint: web3.PublicKey,
    shipTokenAccount: web3.PublicKey,
    programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
    const [escrowAuthority] = await getScoreAuthEscrowAccount(programId, shipMint, playerPublicKey);
    const [shipEscrow] = await getScoreEscrowAccount(programId, shipMint, null, playerPublicKey)
    const [shipStakingAccount, shipStakingBump] = await getShipStakingAccount(programId, shipMint, playerPublicKey);

    const idl = getIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(<Idl>idl, programId, provider);
    const txInstruction = await program.instruction.processInitialDeposit(
        shipStakingBump,
        new BN(shipQuantity),
        {
            accounts: {
                playerAccount: playerPublicKey,
                shipStakingAccount: shipStakingAccount,
                escrowAuthority: escrowAuthority,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                clock: web3.SYSVAR_CLOCK_PUBKEY,
                rent: web3.SYSVAR_RENT_PUBKEY,
                shipMint: shipMint,
                shipTokenAccountSource: shipTokenAccount,
                shipTokenAccountEscrow: shipEscrow
            }
        }
    )
    return txInstruction
}

/**
 * Create instruction to process refuel
 */

export async function processrefuelinstruction(
    playerPublicKey: web3.PublicKey,
    fuelQuantity: number,
    connection: web3.Connection,
    shipMint: web3.PublicKey,
    fuelMint: web3.PublicKey,
    fuelTokenAccount: web3.PublicKey,
    programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
    const [escrowAuthority] = await getScoreAuthEscrowAccount(programId, shipMint, playerPublicKey)
    const [fuelEscrow] = await getScoreEscrowAccount(programId, shipMint, fuelMint, playerPublicKey)
    const [shipStakingAccount] = await getShipStakingAccount(programId, shipMint, playerPublicKey)

    const idl = getIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(<Idl>idl, programId, provider);
    const txInstruction = await program.instruction.processRefuel(
        new BN(fuelQuantity),
        {
            accounts: {
                playerAccount: playerPublicKey,
                shipStakingAccount: shipStakingAccount,
                escrowAuthority: escrowAuthority,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                clock: web3.SYSVAR_CLOCK_PUBKEY,
                rent: web3.SYSVAR_RENT_PUBKEY,
                shipMint: shipMint,
                fuelMint: fuelMint,
                fuelTokenAccountSource: fuelTokenAccount,
                fuelTokenAccountEscrow: fuelEscrow,
            }
        }
    )
    return txInstruction
}

/**
 * Create instruction to process refeed
 */

export async function processRefeedInstruction(
    playerPublicKey: web3.PublicKey,
    foodQuantity: number,
    connection: web3.Connection,
    shipMint: web3.PublicKey,
    foodMint: web3.PublicKey,
    foodTokenAccount: web3.PublicKey,
    programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
    const [escrowAuthority] = await getScoreAuthEscrowAccount(programId, shipMint, playerPublicKey)
    const [foodEscrow] = await getScoreEscrowAccount(programId, shipMint, foodMint, playerPublicKey)
    const [shipStakingAccount] = await getShipStakingAccount(programId, shipMint, playerPublicKey)

    const idl = getIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(<Idl>idl, programId, provider);
    const txInstruction = await program.instruction.processRefuel(
        new BN(foodQuantity),
        {
            accounts: {
                playerAccount: playerPublicKey,
                shipStakingAccount: shipStakingAccount,
                escrowAuthority: escrowAuthority,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                clock: web3.SYSVAR_CLOCK_PUBKEY,
                rent: web3.SYSVAR_RENT_PUBKEY,
                shipMint: shipMint,
                foodMint: foodMint,
                fuelTokenAccountSource: foodTokenAccount,
                fuelTokenAccountEscrow: foodEscrow,
            }
        }
    )
    return txInstruction
}

/**
 * Create instruction to process repair
 */

export async function processRepairInstruction(
    playerPublicKey: web3.PublicKey,
    toolkitQuantity: number,
    connection: web3.Connection,
    shipMint: web3.PublicKey,
    toolkitMint: web3.PublicKey,
    toolkitTokenAccount: web3.PublicKey,
    programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
    const [escrowAuthority] = await getScoreAuthEscrowAccount(programId, shipMint, playerPublicKey)
    const [toolkitEscrow] = await getScoreEscrowAccount(programId, shipMint, toolkitMint, playerPublicKey)
    const [shipStakingAccount] = await getShipStakingAccount(programId, shipMint, playerPublicKey)

    const idl = getIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(<Idl>idl, programId, provider);
    const txInstruction = await program.instruction.processRefuel(
        new BN(toolkitQuantity),
        {
            accounts: {
                playerAccount: playerPublicKey,
                shipStakingAccount: shipStakingAccount,
                escrowAuthority: escrowAuthority,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                clock: web3.SYSVAR_CLOCK_PUBKEY,
                rent: web3.SYSVAR_RENT_PUBKEY,
                shipMint: shipMint,
                toolkitMint: toolkitMint,
                toolkitTokenAccountSource: toolkitTokenAccount,
                toolkitTokenAccountEscrow: toolkitEscrow,
            }
        }
    )
    return txInstruction
}

/**
 * Create instruction to process rearm
 */
export async function processRearmInstruction(
    playerPublicKey: web3.PublicKey,
    armsQuantity: number,
    connection: web3.Connection,
    shipMint: web3.PublicKey,
    armsMint: web3.PublicKey,
    armsTokenAccount: web3.PublicKey,
    programId: web3.PublicKey
): Promise<web3.TransactionInstruction> {
    const [escrowAuthority] = await getScoreAuthEscrowAccount(programId, shipMint, playerPublicKey)
    const [armsEscrow] = await getScoreEscrowAccount(programId, shipMint, armsMint, playerPublicKey)
    const [shipStakingAccount] = await getShipStakingAccount(programId, shipMint, playerPublicKey)

    const idl = getIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(<Idl>idl, programId, provider);
    const txInstruction = await program.instruction.processRefuel(
        new BN(armsQuantity),
        {
            accounts: {
                playerAccount: playerPublicKey,
                shipStakingAccount: shipStakingAccount,
                escrowAuthority: escrowAuthority,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                clock: web3.SYSVAR_CLOCK_PUBKEY,
                rent: web3.SYSVAR_RENT_PUBKEY,
                shipMint: shipMint,
                armsMint: armsMint,
                armsTokenAccountSource: armsTokenAccount,
                armsTokenAccountEscrow: armsEscrow,
            }
        }
    )
    return txInstruction
}

export const baseIdl: unknown = {
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
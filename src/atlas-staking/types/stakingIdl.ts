export type Staking =
{
  'version': '0.1.0',
  'name': 'atlas_staking',
  'instructions': [
    {
      'name': 'initialize',
      'accounts': [],
      'args': []
    },
    {
      'name': 'registerStake',
      'accounts': [
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'stakeMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rewardMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'registeredStake',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'registered-stake'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'rewardMultiplier',
          'type': 'u64'
        },
        {
          'name': 'cooldownPeriod',
          'type': 'u64'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'RegisteredStake',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'authority',
            'type': 'publicKey'
          },
          {
            'name': 'stakeMint',
            'type': 'publicKey'
          },
          {
            'name': 'rewardMint',
            'type': 'publicKey'
          },
          {
            'name': 'rewardMultiplier',
            'type': 'u64'
          },
          {
            'name': 'cooldownPeriod',
            'type': 'u64'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'metadata': {
  }
}

export const baseIdl: Staking =
{
  'version': '0.1.0',
  'name': 'atlas_staking',
  'instructions': [
    {
      'name': 'initialize',
      'accounts': [],
      'args': []
    },
    {
      'name': 'registerStake',
      'accounts': [
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'stakeMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rewardMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'registeredStake',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'registered-stake'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'rewardMultiplier',
          'type': 'u64'
        },
        {
          'name': 'cooldownPeriod',
          'type': 'u64'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'RegisteredStake',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'authority',
            'type': 'publicKey'
          },
          {
            'name': 'stakeMint',
            'type': 'publicKey'
          },
          {
            'name': 'rewardMint',
            'type': 'publicKey'
          },
          {
            'name': 'rewardMultiplier',
            'type': 'u64'
          },
          {
            'name': 'cooldownPeriod',
            'type': 'u64'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'metadata': {
  }
}

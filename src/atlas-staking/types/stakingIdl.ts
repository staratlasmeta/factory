export type Staking =
{
  'version': '0.1.0',
  'name': 'atlas_staking',
  'instructions': [
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
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
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
    },
    {
      'name': 'updateStake',
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
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'rewardMultiplier',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'createStakingAccount',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': false
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
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'registered-stake'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
              }
            ]
          }
        },
        {
          'name': 'stakingAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'staking-account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'RegisteredStake',
                'path': 'registered_stake'
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
      'args': []
    },
    {
      'name': 'stakeTokens',
      'accounts': [
        {
          'name': 'user',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': false
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
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'registered-stake'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
              }
            ]
          }
        },
        {
          'name': 'stakingAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'staking-account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'RegisteredStake',
                'path': 'registered_stake'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'stakeAmount',
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
    },
    {
      'name': 'StakingAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'stakeMint',
            'type': 'publicKey'
          },
          {
            'name': 'totalStake',
            'type': 'u64'
          },
          {
            'name': 'activeStake',
            'type': 'u64'
          },
          {
            'name': 'pendingRewards',
            'type': 'u64'
          },
          {
            'name': 'paidRewards',
            'type': 'u64'
          },
          {
            'name': 'stakedAtTs',
            'type': 'i64'
          },
          {
            'name': 'lastClaimTs',
            'type': 'i64'
          },
          {
            'name': 'unstakedTs',
            'type': 'i64'
          },
          {
            'name': 'onCoolDown',
            'type': 'bool'
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
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
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
    },
    {
      'name': 'updateStake',
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
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'rewardMultiplier',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'createStakingAccount',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': false
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
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'registered-stake'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
              }
            ]
          }
        },
        {
          'name': 'stakingAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'staking-account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'RegisteredStake',
                'path': 'registered_stake'
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
      'args': []
    },
    {
      'name': 'stakeTokens',
      'accounts': [
        {
          'name': 'user',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': false
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
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'registered-stake'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'authority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'stake_mint'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Mint',
                'path': 'reward_mint'
              }
            ]
          }
        },
        {
          'name': 'stakingAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'staking-account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'RegisteredStake',
                'path': 'registered_stake'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'stakeAmount',
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
    },
    {
      'name': 'StakingAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'stakeMint',
            'type': 'publicKey'
          },
          {
            'name': 'totalStake',
            'type': 'u64'
          },
          {
            'name': 'activeStake',
            'type': 'u64'
          },
          {
            'name': 'pendingRewards',
            'type': 'u64'
          },
          {
            'name': 'paidRewards',
            'type': 'u64'
          },
          {
            'name': 'stakedAtTs',
            'type': 'i64'
          },
          {
            'name': 'lastClaimTs',
            'type': 'i64'
          },
          {
            'name': 'unstakedTs',
            'type': 'i64'
          },
          {
            'name': 'onCoolDown',
            'type': 'bool'
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

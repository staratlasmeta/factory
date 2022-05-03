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
          'name': 'tokenSource',
          'isMut': true,
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
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'escrow-auth'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              }
            ]
          }
        },
        {
          'name': 'tokenEscrow',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'staking-escrow'
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
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
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
  'errors': [
    {
      'code': 6000,
      'name': 'InvalidMint',
      'msg': 'Invalid Token Mint'
    },
    {
      'code': 6001,
      'name': 'InvalidOwner',
      'msg': 'Account now owned by user'
    },
    {
      'code': 6002,
      'name': 'InsufficientFunds',
      'msg': 'Insufficient token balance'
    },
    {
      'code': 6003,
      'name': 'InvalidAuthority',
      'msg': 'Invalid authority for this account'
    },
    {
      'code': 6004,
      'name': 'InvalidDepositQty',
      'msg': 'Invalid deposit quantity'
    },
    {
      'code': 6005,
      'name': 'NumericalOverflowError',
      'msg': 'Numerical overflow error'
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
          'name': 'tokenSource',
          'isMut': true,
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
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'escrow-auth'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              }
            ]
          }
        },
        {
          'name': 'tokenEscrow',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'staking-escrow'
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
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
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
  'errors': [
    {
      'code': 6000,
      'name': 'InvalidMint',
      'msg': 'Invalid Token Mint'
    },
    {
      'code': 6001,
      'name': 'InvalidOwner',
      'msg': 'Account now owned by user'
    },
    {
      'code': 6002,
      'name': 'InsufficientFunds',
      'msg': 'Insufficient token balance'
    },
    {
      'code': 6003,
      'name': 'InvalidAuthority',
      'msg': 'Invalid authority for this account'
    },
    {
      'code': 6004,
      'name': 'InvalidDepositQty',
      'msg': 'Invalid deposit quantity'
    },
    {
      'code': 6005,
      'name': 'NumericalOverflowError',
      'msg': 'Numerical overflow error'
    }
  ],
  'metadata': {
  }
}

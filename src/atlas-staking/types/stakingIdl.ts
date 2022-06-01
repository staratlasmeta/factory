export type Staking =
{
  'version': '0.1.0',
  'name': 'atlas_staking',
  'instructions': [
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
      'name': 'harvest',
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
          'name': 'userRewardAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rewardPda',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-account'
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
          'name': 'rewardVaultAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-vault-authority'
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
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
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
          'name': 'rewardPda',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-account'
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
          'name': 'rewardVaultAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-vault-authority'
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
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
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
      'name': 'settle',
      'accounts': [
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'user',
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
        }
      ],
      'args': [
        {
          'name': 'updatedStakingPeriod',
          'type': 'u16'
        }
      ]
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
    },
    {
      'name': 'unstakeTokens',
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
          'name': 'userRewardAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rewardPda',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-account'
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
          'name': 'rewardVaultAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-vault-authority'
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
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
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
      'name': 'updateRewardMultiplier',
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
        },
        {
          'name': 'newStakingPeriod',
          'type': 'u16'
        }
      ]
    },
    {
      'name': 'withdrawTokens',
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
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
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
            'name': 'currentPeriod',
            'type': 'u16'
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
          },
          {
            'name': 'rewardBump',
            'type': 'u8'
          },
          {
            'name': 'authBump',
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
            'name': 'currentPeriod',
            'type': 'u16'
          },
          {
            'name': 'stakedAtTs',
            'type': 'i64'
          },
          {
            'name': 'lastPendingRewardCalcTs',
            'type': 'i64'
          },
          {
            'name': 'lastHarvestTs',
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
    },
    {
      'code': 6006,
      'name': 'StakeOnCooldown',
      'msg': 'Cannot stake while account is on cooldown'
    },
    {
      'code': 6007,
      'name': 'InvalidEscrowAuth',
      'msg': 'Invalid escrow authority'
    },
    {
      'code': 6008,
      'name': 'WithdrawOnCooldown',
      'msg': 'Cannot withdraw before cooldown period has elapsed'
    },
    {
      'code': 6009,
      'name': 'InvalidPeriod',
      'msg': 'Staking account must be in the same period as the Registered Stake'
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
      'name': 'harvest',
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
          'name': 'userRewardAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rewardPda',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-account'
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
          'name': 'rewardVaultAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-vault-authority'
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
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
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
          'name': 'rewardPda',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-account'
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
          'name': 'rewardVaultAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-vault-authority'
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
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
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
      'name': 'settle',
      'accounts': [
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'user',
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
        }
      ],
      'args': [
        {
          'name': 'updatedStakingPeriod',
          'type': 'u16'
        }
      ]
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
    },
    {
      'name': 'unstakeTokens',
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
          'name': 'userRewardAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rewardPda',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-account'
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
          'name': 'rewardVaultAuthority',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'reward-vault-authority'
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
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
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
      'name': 'updateRewardMultiplier',
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
        },
        {
          'name': 'newStakingPeriod',
          'type': 'u16'
        }
      ]
    },
    {
      'name': 'withdrawTokens',
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
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
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
            'name': 'currentPeriod',
            'type': 'u16'
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
          },
          {
            'name': 'rewardBump',
            'type': 'u8'
          },
          {
            'name': 'authBump',
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
            'name': 'currentPeriod',
            'type': 'u16'
          },
          {
            'name': 'stakedAtTs',
            'type': 'i64'
          },
          {
            'name': 'lastPendingRewardCalcTs',
            'type': 'i64'
          },
          {
            'name': 'lastHarvestTs',
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
    },
    {
      'code': 6006,
      'name': 'StakeOnCooldown',
      'msg': 'Cannot stake while account is on cooldown'
    },
    {
      'code': 6007,
      'name': 'InvalidEscrowAuth',
      'msg': 'Invalid escrow authority'
    },
    {
      'code': 6008,
      'name': 'WithdrawOnCooldown',
      'msg': 'Cannot withdraw before cooldown period has elapsed'
    },
    {
      'code': 6009,
      'name': 'InvalidPeriod',
      'msg': 'Staking account must be in the same period as the Registered Stake'
    }
  ],
  'metadata': {
  }
}

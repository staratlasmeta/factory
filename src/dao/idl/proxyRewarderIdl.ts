
export type ProxyRewarder = {
  'version': '0.5.6',
  'name': 'proxy_rewarder',
  'instructions': [
    {
      'name': 'registerLocker',
      'docs': [
        'Registers a Locker from the locked_voter program'
      ],
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Admin key'
          ]
        },
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            '[locked_voter::Locker].'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'New RegisteredLocker account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'RegisteredLocker'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'tokenMint',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The token mint that matches the Locker token mint (ie POLIS)'
          ]
        },
        {
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The treasury token account holding all tokens to reward users'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryTokenAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'treasuryAuthority',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The treasury authority PDA     /// CHECK: pda token account authority'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryAuthority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
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
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'updateRegisteredLocker',
      'docs': [
        'Updates `rewards` arrays in registered_locker [proxy_rewarder::registered_locker].'
      ],
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'Admin key'
          ]
        },
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [locked_voter::locker] being exited from.'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'RegisteredLocker account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'RegisteredLocker'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'era',
          'type': 'u16'
        },
        {
          'name': 'index',
          'type': 'u16'
        },
        {
          'name': 'periodRewardAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'newProxyEscrow',
      'accounts': [
        {
          'name': 'escrowOwner',
          'isMut': true,
          'isSigner': true,
          'docs': [
            '[Owner].'
          ]
        },
        {
          'name': 'proxyEscrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[Escrow].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'ProxyEscrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'escrow_owner'
              }
            ]
          }
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Payer of the initialization.'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'System program.'
          ]
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
      'name': 'newProxy',
      'docs': [
        'Creates a new [Proxy] for an account.',
        '',
        'A Reward Escrow, or [Escrow] for short, is an agreement between a users=>proxy (known as the `authority`) and the Reward Program to',
        'reward POLIS over specific periods of time. (curve)',
        'proportional to the amount of stakers.'
      ],
      'accounts': [
        {
          'name': 'proxyEscrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[ProxyEscrow].'
          ]
        },
        {
          'name': 'proxy',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[Proxy].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'Proxy'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'ProxyEscrow',
                'path': 'proxy_escrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'proxy_owner'
              }
            ]
          }
        },
        {
          'name': 'tokenMint',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Mint of the token that can be used to join the [LockedVoter::Locker].'
          ]
        },
        {
          'name': 'proxyOwner',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Authority of the [Proxy] to be created.'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'System program.'
          ]
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
      'name': 'proxyLock',
      'docs': [
        'Locks `amount` of POLIS into the [LockedVoter::Escrow].'
      ],
      'accounts': [
        {
          'name': 'locker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[locked_voter::Locker].'
          ]
        },
        {
          'name': 'escrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The source of deposited tokens.'
          ]
        },
        {
          'name': 'proxyTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Token account used to transfer governance tokens into [locked_voter::lock] escrow'
          ]
        },
        {
          'name': 'escrowTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Token account held by the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'proxy',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::escrow].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'Proxy'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Proxy',
                'path': 'proxy.escrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'payer'
              }
            ]
          }
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Payer of the initialization.'
          ]
        },
        {
          'name': 'lockedVoterProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [LockedVoter] program.'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Token program.'
          ]
        },
        {
          'name': 'instructionsSysvar',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'whitelistEntry',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Whitelist entry.'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': 'u64'
        },
        {
          'name': 'duration',
          'type': 'i64'
        }
      ]
    },
    {
      'name': 'proxyExit',
      'docs': [
        'Exits the POLIS DAO; i.e., withdraws all staked tokens in an [Escrow] if the [Escrow] is unlocked.'
      ],
      'accounts': [
        {
          'name': 'locker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [locked_voter::locker] being exited from.'
          ]
        },
        {
          'name': 'escrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [locked_voter::Escrow] that is being closed.'
          ]
        },
        {
          'name': 'proxy',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::Escrow].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'Proxy'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Proxy',
                'path': 'proxy.escrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'payer'
              }
            ]
          }
        },
        {
          'name': 'escrowTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Tokens locked up in the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'proxyTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Destination for the tokens to unlock.'
          ]
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Final destination for the tokens to unlock.'
          ]
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The payer to receive the rent refund.'
          ]
        },
        {
          'name': 'lockedVoterProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [LockedVoter] program.'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Token program.'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'proxyCastVote',
      'docs': [
        'Proxy Activates a proposal.',
        'Proxy Casts a vote.'
      ],
      'accounts': [
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [Locker].'
          ]
        },
        {
          'name': 'escrow',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [Escrow] that is voting.'
          ]
        },
        {
          'name': 'proxy',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'signer',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'Vote delegate of the [Escrow].'
          ]
        },
        {
          'name': 'proposal',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [Proposal] being voted on.'
          ]
        },
        {
          'name': 'vote',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [Vote].'
          ]
        },
        {
          'name': 'governor',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [Governor].'
          ]
        },
        {
          'name': 'governProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [govern] program.'
          ]
        },
        {
          'name': 'lockedVoterProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [LockedVoter] program.'
          ]
        }
      ],
      'args': [
        {
          'name': 'side',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'claimRewards',
      'docs': [
        'Claims POLIS Rewards; i.e., withdraws reward tokens from a treasury if the [snapshots::escrow_history] is confirmed.'
      ],
      'accounts': [
        {
          'name': 'escrow',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [locked_voter::Escrow] being validated from.'
          ]
        },
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [locked_voter::locker] being exited from.'
          ]
        },
        {
          'name': 'proxy',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'proxyEscrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[proxy_rewarder::proxy_escrow].'
          ]
        },
        {
          'name': 'escrowHistory',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [snapshots::escrow_history] to read and validate.'
          ]
        },
        {
          'name': 'lockerHistory',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [snapshots::locker_history] to read and validate.'
          ]
        },
        {
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Treasury tokens in the [proxy_rewarder::treasury_token_account]. The treasury token account holding all tokens to reward users'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryTokenAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'registeredLocker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'RegisteredLocker account'
          ]
        },
        {
          'name': 'treasuryAuthority',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The treasury authority PDA'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryAuthority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Final destination for the tokens to unlock.'
          ]
        },
        {
          'name': 'escrowOwner',
          'isMut': false,
          'isSigner': true,
          'docs': [
            '[Owner]'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Token program.'
          ]
        }
      ],
      'args': []
    }
  ],
  'accounts': [
    {
      'name': 'Proxy',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'escrow',
            'docs': [
              'The [Escrow] that this [Proxy] is part of.'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'owner',
            'docs': [
              'The key of the account that is authorized to cpi via this [Proxy].'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'tokenMint',
            'docs': [
              'Mint of the token that must be locked in the [LockedVoter::Locker].'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          },
          {
            'name': 'proxyTokenAccount',
            'docs': [
              'The token account holding the proxy tokens.'
            ],
            'type': 'publicKey'
          }
        ]
      }
    },
    {
      'name': 'ProxyEscrow',
      'docs': [
        'records rewards state on a user.'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'escrowOwner',
            'docs': [
              'The key of the account that is authorized to withdraw from the [Treasury].'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          },
          {
            'name': 'amount',
            'docs': [
              'Amount of tokens staked.'
            ],
            'type': 'u64'
          },
          {
            'name': 'escrowStartedAt',
            'docs': [
              'When the [proxy_escrow::escrow_owner] started their escrow.'
            ],
            'type': 'i64'
          },
          {
            'name': 'escrowEndsAt',
            'docs': [
              'When the escrow unlocks; i.e. the [proxy_escrow::escrow_owner] is scheduled to be allowed to withdraw their governance tokens.'
            ],
            'type': 'i64'
          },
          {
            'name': 'rewardsLastClaimedAt',
            'docs': [
              'When the [proxy_escrow::escrow_owner] last claimed rewards from [Treasury].'
            ],
            'type': 'i64'
          },
          {
            'name': 'amountClaimed',
            'docs': [
              'Amount of tokens claimed.'
            ],
            'type': 'u64'
          }
        ]
      }
    },
    {
      'name': 'RegisteredLocker',
      'docs': [
        'Registered locker - needs to be created to earn rewards',
        'PDA unique to [RegisteredLocker, locker.key]',
        'reprc- pack'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'admin',
            'docs': [
              'The key of the admin account that is managing the registered locker'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          },
          {
            'name': 'tokenMint',
            'docs': [
              'The token mint aligned with the locker and for rewards paid to users'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'locker',
            'docs': [
              'The locker account on the locked_voter program being registered'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'padding',
            'docs': [
              'Padding for aligning the struct to an 8-byte boundary.'
            ],
            'type': {
              'array': [
                'u8',
                7
              ]
            }
          },
          {
            'name': 'rewardAmountPaidPerPeriodEra0',
            'docs': [
              'All tracked historical reward rate totals per period per era allocated to users.'
            ],
            'type': {
              'array': [
                'u64',
                256
              ]
            }
          },
          {
            'name': 'rewardAmountPaidPerPeriodEra1',
            'type': {
              'array': [
                'u64',
                256
              ]
            }
          },
          {
            'name': 'rewardAmountPaidPerPeriodEra2',
            'type': {
              'array': [
                'u64',
                256
              ]
            }
          }
        ]
      }
    },
    {
      'name': 'TreasuryAuthority',
      'docs': [
        'Treasury Authority - PDA who has authority to withdraw rewards from the treasury.'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'locker',
            'docs': [
              'The locker account on the locked_voter program being registered'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'events': [
    {
      'name': 'ClaimRewardsEvent',
      'fields': [
        {
          'name': 'escrowOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'locker',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'amountClaimed',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'prevRewardsLastClaimedAt',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'rewardsLastClaimedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'NewProxyEscrowEvent',
      'fields': [
        {
          'name': 'proxyEscrow',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'owner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'NewProxyEvent',
      'fields': [
        {
          'name': 'proxy',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'proxyOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'proxyEscrow',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProxyExitEscrowEvent',
      'fields': [
        {
          'name': 'escrowOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'locker',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'lockerSupply',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'releasedAmount',
          'type': 'u64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProxyLockEvent',
      'fields': [
        {
          'name': 'locker',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'escrowOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'amount',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'lockerSupply',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'duration',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'prevEscrowEndsAt',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'nextEscrowEndsAt',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'nextEscrowStartedAt',
          'type': 'i64',
          'index': false
        }
      ]
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'ProgramNotWhitelisted',
      'msg': 'CPI caller not whitelisted to invoke lock instruction.'
    },
    {
      'code': 6001,
      'name': 'LockupDurationTooShort',
      'msg': 'Lockup duration must at least be the min stake duration.'
    },
    {
      'code': 6002,
      'name': 'LockupDurationTooLong',
      'msg': 'Lockup duration must at most be the max stake duration.'
    },
    {
      'code': 6003,
      'name': 'RefreshCannotShorten',
      'msg': 'A voting escrow refresh cannot shorten the escrow time remaining.'
    },
    {
      'code': 6004,
      'name': 'EscrowNotEnded',
      'msg': 'Escrow has not ended.'
    },
    {
      'code': 6005,
      'name': 'MustProvideWhitelist',
      'msg': 'Program whitelist enabled; please provide whitelist entry and instructions sysvar'
    },
    {
      'code': 6006,
      'name': 'EscrowOwnerNotWhitelisted',
      'msg': 'CPI caller not whitelisted for escrow owner to invoke lock instruction.'
    },
    {
      'code': 6007,
      'name': 'InvalidMint',
      'msg': 'Invalid SPL Token mint'
    },
    {
      'code': 6008,
      'name': 'InvalidTokenAccount',
      'msg': 'Invalid SPL Token account'
    },
    {
      'code': 6009,
      'name': 'NumericalOverflowError',
      'msg': 'Numerical overflow error'
    },
    {
      'code': 6010,
      'name': 'UninitializedTokenAccount',
      'msg': 'Uninitialized Token Account'
    },
    {
      'code': 6011,
      'name': 'EraMismatch',
      'msg': 'Era mismatch.'
    },
    {
      'code': 6012,
      'name': 'WrongPDA',
      'msg': 'Wrong PDA proxy exit.'
    },
    {
      'code': 6013,
      'name': 'YouHaveNoPendingRewards',
      'msg': 'You have no claimable rewards.'
    },
    {
      'code': 6014,
      'name': 'MustCallProxyLockWithWhitelist',
      'msg': 'Must call `proxy_lock_with_whitelist` to lock via CPI.'
    },
    {
      'code': 6015,
      'name': 'RewardsNotReady',
      'msg': 'rewards_last_claimed_at > now'
    },
    {
      'code': 6016,
      'name': 'InvalidAdmin',
      'msg': 'locker.base != to the admin signer'
    }
  ],
  'metadata': {
  }
}

export const proxyRewarderIdl: ProxyRewarder = {
  'version': '0.5.6',
  'name': 'proxy_rewarder',
  'instructions': [
    {
      'name': 'registerLocker',
      'docs': [
        'Registers a Locker from the locked_voter program'
      ],
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Admin key'
          ]
        },
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            '[locked_voter::Locker].'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'New RegisteredLocker account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'RegisteredLocker'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'tokenMint',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The token mint that matches the Locker token mint (ie POLIS)'
          ]
        },
        {
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The treasury token account holding all tokens to reward users'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryTokenAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'treasuryAuthority',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The treasury authority PDA     /// CHECK: pda token account authority'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryAuthority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
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
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'updateRegisteredLocker',
      'docs': [
        'Updates `rewards` arrays in registered_locker [proxy_rewarder::registered_locker].'
      ],
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'Admin key'
          ]
        },
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [locked_voter::locker] being exited from.'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'RegisteredLocker account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'RegisteredLocker'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'era',
          'type': 'u16'
        },
        {
          'name': 'index',
          'type': 'u16'
        },
        {
          'name': 'periodRewardAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'newProxyEscrow',
      'accounts': [
        {
          'name': 'escrowOwner',
          'isMut': true,
          'isSigner': true,
          'docs': [
            '[Owner].'
          ]
        },
        {
          'name': 'proxyEscrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[Escrow].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'ProxyEscrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'escrow_owner'
              }
            ]
          }
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Payer of the initialization.'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'System program.'
          ]
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
      'name': 'newProxy',
      'docs': [
        'Creates a new [Proxy] for an account.',
        '',
        'A Reward Escrow, or [Escrow] for short, is an agreement between a users=>proxy (known as the `authority`) and the Reward Program to',
        'reward POLIS over specific periods of time. (curve)',
        'proportional to the amount of stakers.'
      ],
      'accounts': [
        {
          'name': 'proxyEscrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[ProxyEscrow].'
          ]
        },
        {
          'name': 'proxy',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[Proxy].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'Proxy'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'ProxyEscrow',
                'path': 'proxy_escrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'proxy_owner'
              }
            ]
          }
        },
        {
          'name': 'tokenMint',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Mint of the token that can be used to join the [LockedVoter::Locker].'
          ]
        },
        {
          'name': 'proxyOwner',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Authority of the [Proxy] to be created.'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'System program.'
          ]
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
      'name': 'proxyLock',
      'docs': [
        'Locks `amount` of POLIS into the [LockedVoter::Escrow].'
      ],
      'accounts': [
        {
          'name': 'locker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[locked_voter::Locker].'
          ]
        },
        {
          'name': 'escrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The source of deposited tokens.'
          ]
        },
        {
          'name': 'proxyTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Token account used to transfer governance tokens into [locked_voter::lock] escrow'
          ]
        },
        {
          'name': 'escrowTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Token account held by the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'proxy',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::escrow].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'Proxy'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Proxy',
                'path': 'proxy.escrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'payer'
              }
            ]
          }
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'Payer of the initialization.'
          ]
        },
        {
          'name': 'lockedVoterProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [LockedVoter] program.'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Token program.'
          ]
        },
        {
          'name': 'instructionsSysvar',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'whitelistEntry',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Whitelist entry.'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': 'u64'
        },
        {
          'name': 'duration',
          'type': 'i64'
        }
      ]
    },
    {
      'name': 'proxyExit',
      'docs': [
        'Exits the POLIS DAO; i.e., withdraws all staked tokens in an [Escrow] if the [Escrow] is unlocked.'
      ],
      'accounts': [
        {
          'name': 'locker',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [locked_voter::locker] being exited from.'
          ]
        },
        {
          'name': 'escrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [locked_voter::Escrow] that is being closed.'
          ]
        },
        {
          'name': 'proxy',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::Escrow].'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'Proxy'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Proxy',
                'path': 'proxy.escrow'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'payer'
              }
            ]
          }
        },
        {
          'name': 'escrowTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Tokens locked up in the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'proxyTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Destination for the tokens to unlock.'
          ]
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Final destination for the tokens to unlock.'
          ]
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The payer to receive the rent refund.'
          ]
        },
        {
          'name': 'lockedVoterProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [LockedVoter] program.'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Token program.'
          ]
        },
        {
          'name': 'registeredLocker',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'proxyCastVote',
      'docs': [
        'Proxy Activates a proposal.',
        'Proxy Casts a vote.'
      ],
      'accounts': [
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [Locker].'
          ]
        },
        {
          'name': 'escrow',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [Escrow] that is voting.'
          ]
        },
        {
          'name': 'proxy',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'signer',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'Vote delegate of the [Escrow].'
          ]
        },
        {
          'name': 'proposal',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [Proposal] being voted on.'
          ]
        },
        {
          'name': 'vote',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [Vote].'
          ]
        },
        {
          'name': 'governor',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [Governor].'
          ]
        },
        {
          'name': 'governProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [govern] program.'
          ]
        },
        {
          'name': 'lockedVoterProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [LockedVoter] program.'
          ]
        }
      ],
      'args': [
        {
          'name': 'side',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'claimRewards',
      'docs': [
        'Claims POLIS Rewards; i.e., withdraws reward tokens from a treasury if the [snapshots::escrow_history] is confirmed.'
      ],
      'accounts': [
        {
          'name': 'escrow',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [locked_voter::Escrow] being validated from.'
          ]
        },
        {
          'name': 'locker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [locked_voter::locker] being exited from.'
          ]
        },
        {
          'name': 'proxy',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Authority of the [locked_voter::Escrow].'
          ]
        },
        {
          'name': 'proxyEscrow',
          'isMut': true,
          'isSigner': false,
          'docs': [
            '[proxy_rewarder::proxy_escrow].'
          ]
        },
        {
          'name': 'escrowHistory',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [snapshots::escrow_history] to read and validate.'
          ]
        },
        {
          'name': 'lockerHistory',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [snapshots::locker_history] to read and validate.'
          ]
        },
        {
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Treasury tokens in the [proxy_rewarder::treasury_token_account]. The treasury token account holding all tokens to reward users'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryTokenAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'registeredLocker',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'RegisteredLocker account'
          ]
        },
        {
          'name': 'treasuryAuthority',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The treasury authority PDA'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'TreasuryAuthority'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'Locker',
                'path': 'locker'
              }
            ]
          }
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'Final destination for the tokens to unlock.'
          ]
        },
        {
          'name': 'escrowOwner',
          'isMut': false,
          'isSigner': true,
          'docs': [
            '[Owner]'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Token program.'
          ]
        }
      ],
      'args': []
    }
  ],
  'accounts': [
    {
      'name': 'Proxy',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'escrow',
            'docs': [
              'The [Escrow] that this [Proxy] is part of.'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'owner',
            'docs': [
              'The key of the account that is authorized to cpi via this [Proxy].'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'tokenMint',
            'docs': [
              'Mint of the token that must be locked in the [LockedVoter::Locker].'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          },
          {
            'name': 'proxyTokenAccount',
            'docs': [
              'The token account holding the proxy tokens.'
            ],
            'type': 'publicKey'
          }
        ]
      }
    },
    {
      'name': 'ProxyEscrow',
      'docs': [
        'records rewards state on a user.'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'escrowOwner',
            'docs': [
              'The key of the account that is authorized to withdraw from the [Treasury].'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          },
          {
            'name': 'amount',
            'docs': [
              'Amount of tokens staked.'
            ],
            'type': 'u64'
          },
          {
            'name': 'escrowStartedAt',
            'docs': [
              'When the [proxy_escrow::escrow_owner] started their escrow.'
            ],
            'type': 'i64'
          },
          {
            'name': 'escrowEndsAt',
            'docs': [
              'When the escrow unlocks; i.e. the [proxy_escrow::escrow_owner] is scheduled to be allowed to withdraw their governance tokens.'
            ],
            'type': 'i64'
          },
          {
            'name': 'rewardsLastClaimedAt',
            'docs': [
              'When the [proxy_escrow::escrow_owner] last claimed rewards from [Treasury].'
            ],
            'type': 'i64'
          },
          {
            'name': 'amountClaimed',
            'docs': [
              'Amount of tokens claimed.'
            ],
            'type': 'u64'
          }
        ]
      }
    },
    {
      'name': 'RegisteredLocker',
      'docs': [
        'Registered locker - needs to be created to earn rewards',
        'PDA unique to [RegisteredLocker, locker.key]',
        'reprc- pack'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'admin',
            'docs': [
              'The key of the admin account that is managing the registered locker'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          },
          {
            'name': 'tokenMint',
            'docs': [
              'The token mint aligned with the locker and for rewards paid to users'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'locker',
            'docs': [
              'The locker account on the locked_voter program being registered'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'padding',
            'docs': [
              'Padding for aligning the struct to an 8-byte boundary.'
            ],
            'type': {
              'array': [
                'u8',
                7
              ]
            }
          },
          {
            'name': 'rewardAmountPaidPerPeriodEra0',
            'docs': [
              'All tracked historical reward rate totals per period per era allocated to users.'
            ],
            'type': {
              'array': [
                'u64',
                256
              ]
            }
          },
          {
            'name': 'rewardAmountPaidPerPeriodEra1',
            'type': {
              'array': [
                'u64',
                256
              ]
            }
          },
          {
            'name': 'rewardAmountPaidPerPeriodEra2',
            'type': {
              'array': [
                'u64',
                256
              ]
            }
          }
        ]
      }
    },
    {
      'name': 'TreasuryAuthority',
      'docs': [
        'Treasury Authority - PDA who has authority to withdraw rewards from the treasury.'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'locker',
            'docs': [
              'The locker account on the locked_voter program being registered'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'docs': [
              'Bump seed.'
            ],
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'events': [
    {
      'name': 'ClaimRewardsEvent',
      'fields': [
        {
          'name': 'escrowOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'locker',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'amountClaimed',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'prevRewardsLastClaimedAt',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'rewardsLastClaimedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'NewProxyEscrowEvent',
      'fields': [
        {
          'name': 'proxyEscrow',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'owner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'NewProxyEvent',
      'fields': [
        {
          'name': 'proxy',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'proxyOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'proxyEscrow',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProxyExitEscrowEvent',
      'fields': [
        {
          'name': 'escrowOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'locker',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'lockerSupply',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'releasedAmount',
          'type': 'u64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProxyLockEvent',
      'fields': [
        {
          'name': 'locker',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'escrowOwner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'amount',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'lockerSupply',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'duration',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'prevEscrowEndsAt',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'nextEscrowEndsAt',
          'type': 'i64',
          'index': false
        },
        {
          'name': 'nextEscrowStartedAt',
          'type': 'i64',
          'index': false
        }
      ]
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'ProgramNotWhitelisted',
      'msg': 'CPI caller not whitelisted to invoke lock instruction.'
    },
    {
      'code': 6001,
      'name': 'LockupDurationTooShort',
      'msg': 'Lockup duration must at least be the min stake duration.'
    },
    {
      'code': 6002,
      'name': 'LockupDurationTooLong',
      'msg': 'Lockup duration must at most be the max stake duration.'
    },
    {
      'code': 6003,
      'name': 'RefreshCannotShorten',
      'msg': 'A voting escrow refresh cannot shorten the escrow time remaining.'
    },
    {
      'code': 6004,
      'name': 'EscrowNotEnded',
      'msg': 'Escrow has not ended.'
    },
    {
      'code': 6005,
      'name': 'MustProvideWhitelist',
      'msg': 'Program whitelist enabled; please provide whitelist entry and instructions sysvar'
    },
    {
      'code': 6006,
      'name': 'EscrowOwnerNotWhitelisted',
      'msg': 'CPI caller not whitelisted for escrow owner to invoke lock instruction.'
    },
    {
      'code': 6007,
      'name': 'InvalidMint',
      'msg': 'Invalid SPL Token mint'
    },
    {
      'code': 6008,
      'name': 'InvalidTokenAccount',
      'msg': 'Invalid SPL Token account'
    },
    {
      'code': 6009,
      'name': 'NumericalOverflowError',
      'msg': 'Numerical overflow error'
    },
    {
      'code': 6010,
      'name': 'UninitializedTokenAccount',
      'msg': 'Uninitialized Token Account'
    },
    {
      'code': 6011,
      'name': 'EraMismatch',
      'msg': 'Era mismatch.'
    },
    {
      'code': 6012,
      'name': 'WrongPDA',
      'msg': 'Wrong PDA proxy exit.'
    },
    {
      'code': 6013,
      'name': 'YouHaveNoPendingRewards',
      'msg': 'You have no claimable rewards.'
    },
    {
      'code': 6014,
      'name': 'MustCallProxyLockWithWhitelist',
      'msg': 'Must call `proxy_lock_with_whitelist` to lock via CPI.'
    },
    {
      'code': 6015,
      'name': 'RewardsNotReady',
      'msg': 'rewards_last_claimed_at > now'
    },
    {
      'code': 6016,
      'name': 'InvalidAdmin',
      'msg': 'locker.base != to the admin signer'
    }
  ],
  'metadata': {
  }
}
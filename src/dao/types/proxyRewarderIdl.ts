export type ProxyRewarderIDL = {
  version: '0.1.0';
  name: 'proxy_rewarder';
  instructions: [
    {
      name: 'newProxyEscrow';
      accounts: [
        {
          name: 'escrowOwner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'proxyEscrow';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'ProxyEscrow';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'escrow_owner';
              }
            ];
          };
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'bump';
          type: 'u8';
        }
      ];
    },
    {
      name: 'newProxy';
      accounts: [
        {
          name: 'proxyEscrow';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proxy';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'Proxy';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'ProxyEscrow';
                path: 'proxy_escrow';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'proxy_owner';
              }
            ];
          };
        },
        {
          name: 'tokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'proxyOwner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'bump';
          type: 'u8';
        }
      ];
    },
    {
      name: 'proxyLock';
      accounts: [
        {
          name: 'locker';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'escrow';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proxyTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'escrowTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proxy';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'Proxy';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Proxy';
                path: 'proxy.escrow';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'payer';
              }
            ];
          };
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'lockedVoterProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'instructionsSysvar';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'whitelistEntry';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'registeredLocker';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
        {
          name: 'duration';
          type: 'i64';
        }
      ];
    },
    {
      name: 'proxyExit';
      accounts: [
        {
          name: 'locker';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'escrow';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proxy';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'Proxy';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Proxy';
                path: 'proxy.escrow';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'payer';
              }
            ];
          };
        },
        {
          name: 'escrowTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proxyTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'lockedVoterProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'registeredLocker';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'claimRewards';
      accounts: [
        {
          name: 'escrow';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'locker';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'proxy';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'proxyEscrow';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'escrowHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lockerHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'TreasuryTokenAccount';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Locker';
                path: 'locker';
              }
            ];
          };
        },
        {
          name: 'registeredLocker';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'TreasuryAuthority';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Locker';
                path: 'locker';
              }
            ];
          };
        },
        {
          name: 'userTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'escrowOwner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'Proxy';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'escrow';
            type: 'publicKey';
          },
          {
            name: 'owner';
            type: 'publicKey';
          },
          {
            name: 'tokenMint';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'proxyTokenAccount';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'ProxyEscrow';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'escrowOwner';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'escrowStartedAt';
            type: 'i64';
          },
          {
            name: 'escrowEndsAt';
            type: 'i64';
          },
          {
            name: 'rewardsLastClaimedAt';
            type: 'i64';
          },
          {
            name: 'amountClaimed';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'RegisteredLocker';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'admin';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'tokenMint';
            type: 'publicKey';
          },
          {
            name: 'locker';
            type: 'publicKey';
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 7];
            };
          },
          {
            name: 'rewardAmountPaidPerPeriodEra0';
            type: {
              array: ['u64', 256];
            };
          },
          {
            name: 'rewardAmountPaidPerPeriodEra1';
            type: {
              array: ['u64', 256];
            };
          },
          {
            name: 'rewardAmountPaidPerPeriodEra2';
            type: {
              array: ['u64', 256];
            };
          }
        ];
      };
    }
  ];
  events: [
    {
      name: 'ClaimRewardsEvent';
      fields: [
        {
          name: 'escrowOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'locker';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'tokenMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amountClaimed';
          type: 'u64';
          index: false;
        },
        {
          name: 'prevRewardsLastClaimedAt';
          type: 'i64';
          index: false;
        },
        {
          name: 'rewardsLastClaimedAt';
          type: 'i64';
          index: false;
        }
      ];
    },
    {
      name: 'NewProxyEscrowEvent';
      fields: [
        {
          name: 'proxyEscrow';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'owner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        }
      ];
    },
    {
      name: 'NewProxyEvent';
      fields: [
        {
          name: 'proxy';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'proxyOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'proxyEscrow';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'tokenMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        }
      ];
    },
    {
      name: 'ProxyExitEscrowEvent';
      fields: [
        {
          name: 'escrowOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'locker';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'lockerSupply';
          type: 'u64';
          index: false;
        },
        {
          name: 'releasedAmount';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'ProxyLockEvent';
      fields: [
        {
          name: 'locker';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'escrowOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'tokenMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
        {
          name: 'lockerSupply';
          type: 'u64';
          index: false;
        },
        {
          name: 'duration';
          type: 'i64';
          index: false;
        },
        {
          name: 'prevEscrowEndsAt';
          type: 'i64';
          index: false;
        },
        {
          name: 'nextEscrowEndsAt';
          type: 'i64';
          index: false;
        },
        {
          name: 'nextEscrowStartedAt';
          type: 'i64';
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'ProgramNotWhitelisted';
      msg: 'CPI caller not whitelisted to invoke lock instruction.';
    },
    {
      code: 6001;
      name: 'LockupDurationTooShort';
      msg: 'Lockup duration must at least be the min stake duration.';
    },
    {
      code: 6002;
      name: 'LockupDurationTooLong';
      msg: 'Lockup duration must at most be the max stake duration.';
    },
    {
      code: 6003;
      name: 'RefreshCannotShorten';
      msg: 'A voting escrow refresh cannot shorten the escrow time remaining.';
    },
    {
      code: 6004;
      name: 'EscrowNotEnded';
      msg: 'Escrow has not ended.';
    },
    {
      code: 6005;
      name: 'MustProvideWhitelist';
      msg: 'Program whitelist enabled; please provide whitelist entry and instructions sysvar';
    },
    {
      code: 6006;
      name: 'EscrowOwnerNotWhitelisted';
      msg: 'CPI caller not whitelisted for escrow owner to invoke lock instruction.';
    },
    {
      code: 6007;
      name: 'InvalidMint';
      msg: 'Invalid SPL Token mint';
    },
    {
      code: 6008;
      name: 'InvalidTokenAccount';
      msg: 'Invalid SPL Token account';
    },
    {
      code: 6009;
      name: 'NumericalOverflowError';
      msg: 'Numerical overflow error';
    },
    {
      code: 6010;
      name: 'UninitializedTokenAccount';
      msg: 'Uninitialized Token Account';
    },
    {
      code: 6011;
      name: 'EraMismatch';
      msg: 'Era mismatch.';
    },
    {
      code: 6012;
      name: 'WrongPDA';
      msg: 'Wrong PDA proxy exit.';
    },
    {
      code: 6013;
      name: 'YouHaveNoPendingRewards';
      msg: 'You have no claimable rewards.';
    },
    {
      code: 6014;
      name: 'MustCallProxyLockWithWhitelist';
      msg: 'Must call `proxy_lock_with_whitelist` to lock via CPI.';
    },
    {
      code: 6015;
      name: 'RewardsNotReady';
      msg: 'rewards_last_claimed_at > now';
    },
    {
      code: 6016;
      name: 'InvalidAdmin';
      msg: 'locker.base != to the admin signer';
    }
  ];
};
export const ProxyRewarderJSON: ProxyRewarderIDL = {
  version: '0.1.0',
  name: 'proxy_rewarder',
  instructions: [
    {
      name: 'newProxyEscrow',
      accounts: [
        {
          name: 'escrowOwner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'proxyEscrow',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'ProxyEscrow',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'escrow_owner',
              },
            ],
          },
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'newProxy',
      accounts: [
        {
          name: 'proxyEscrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proxy',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'Proxy',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'ProxyEscrow',
                path: 'proxy_escrow',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'proxy_owner',
              },
            ],
          },
        },
        {
          name: 'tokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'proxyOwner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'proxyLock',
      accounts: [
        {
          name: 'locker',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proxyTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrowTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proxy',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'Proxy',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Proxy',
                path: 'proxy.escrow',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'payer',
              },
            ],
          },
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lockedVoterProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'instructionsSysvar',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'whitelistEntry',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'registeredLocker',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'duration',
          type: 'i64',
        },
      ],
    },
    {
      name: 'proxyExit',
      accounts: [
        {
          name: 'locker',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proxy',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'Proxy',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Proxy',
                path: 'proxy.escrow',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'payer',
              },
            ],
          },
        },
        {
          name: 'escrowTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proxyTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lockedVoterProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'registeredLocker',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'claimRewards',
      accounts: [
        {
          name: 'escrow',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'locker',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'proxy',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'proxyEscrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrowHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lockerHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'TreasuryTokenAccount',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Locker',
                path: 'locker',
              },
            ],
          },
        },
        {
          name: 'registeredLocker',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'TreasuryAuthority',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Locker',
                path: 'locker',
              },
            ],
          },
        },
        {
          name: 'userTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrowOwner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'Proxy',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'escrow',
            type: 'publicKey',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'tokenMint',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'proxyTokenAccount',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'ProxyEscrow',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'escrowOwner',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'escrowStartedAt',
            type: 'i64',
          },
          {
            name: 'escrowEndsAt',
            type: 'i64',
          },
          {
            name: 'rewardsLastClaimedAt',
            type: 'i64',
          },
          {
            name: 'amountClaimed',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'RegisteredLocker',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'tokenMint',
            type: 'publicKey',
          },
          {
            name: 'locker',
            type: 'publicKey',
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 7],
            },
          },
          {
            name: 'rewardAmountPaidPerPeriodEra0',
            type: {
              array: ['u64', 256],
            },
          },
          {
            name: 'rewardAmountPaidPerPeriodEra1',
            type: {
              array: ['u64', 256],
            },
          },
          {
            name: 'rewardAmountPaidPerPeriodEra2',
            type: {
              array: ['u64', 256],
            },
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'ClaimRewardsEvent',
      fields: [
        {
          name: 'escrowOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'locker',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tokenMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amountClaimed',
          type: 'u64',
          index: false,
        },
        {
          name: 'prevRewardsLastClaimedAt',
          type: 'i64',
          index: false,
        },
        {
          name: 'rewardsLastClaimedAt',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'NewProxyEscrowEvent',
      fields: [
        {
          name: 'proxyEscrow',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'owner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'NewProxyEvent',
      fields: [
        {
          name: 'proxy',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'proxyOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'proxyEscrow',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tokenMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'ProxyExitEscrowEvent',
      fields: [
        {
          name: 'escrowOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'locker',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'lockerSupply',
          type: 'u64',
          index: false,
        },
        {
          name: 'releasedAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'ProxyLockEvent',
      fields: [
        {
          name: 'locker',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'escrowOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tokenMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'lockerSupply',
          type: 'u64',
          index: false,
        },
        {
          name: 'duration',
          type: 'i64',
          index: false,
        },
        {
          name: 'prevEscrowEndsAt',
          type: 'i64',
          index: false,
        },
        {
          name: 'nextEscrowEndsAt',
          type: 'i64',
          index: false,
        },
        {
          name: 'nextEscrowStartedAt',
          type: 'i64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'ProgramNotWhitelisted',
      msg: 'CPI caller not whitelisted to invoke lock instruction.',
    },
    {
      code: 6001,
      name: 'LockupDurationTooShort',
      msg: 'Lockup duration must at least be the min stake duration.',
    },
    {
      code: 6002,
      name: 'LockupDurationTooLong',
      msg: 'Lockup duration must at most be the max stake duration.',
    },
    {
      code: 6003,
      name: 'RefreshCannotShorten',
      msg: 'A voting escrow refresh cannot shorten the escrow time remaining.',
    },
    {
      code: 6004,
      name: 'EscrowNotEnded',
      msg: 'Escrow has not ended.',
    },
    {
      code: 6005,
      name: 'MustProvideWhitelist',
      msg: 'Program whitelist enabled; please provide whitelist entry and instructions sysvar',
    },
    {
      code: 6006,
      name: 'EscrowOwnerNotWhitelisted',
      msg: 'CPI caller not whitelisted for escrow owner to invoke lock instruction.',
    },
    {
      code: 6007,
      name: 'InvalidMint',
      msg: 'Invalid SPL Token mint',
    },
    {
      code: 6008,
      name: 'InvalidTokenAccount',
      msg: 'Invalid SPL Token account',
    },
    {
      code: 6009,
      name: 'NumericalOverflowError',
      msg: 'Numerical overflow error',
    },
    {
      code: 6010,
      name: 'UninitializedTokenAccount',
      msg: 'Uninitialized Token Account',
    },
    {
      code: 6011,
      name: 'EraMismatch',
      msg: 'Era mismatch.',
    },
    {
      code: 6012,
      name: 'WrongPDA',
      msg: 'Wrong PDA proxy exit.',
    },
    {
      code: 6013,
      name: 'YouHaveNoPendingRewards',
      msg: 'You have no claimable rewards.',
    },
    {
      code: 6014,
      name: 'MustCallProxyLockWithWhitelist',
      msg: 'Must call `proxy_lock_with_whitelist` to lock via CPI.',
    },
    {
      code: 6015,
      name: 'RewardsNotReady',
      msg: 'rewards_last_claimed_at > now',
    },
    {
      code: 6016,
      name: 'InvalidAdmin',
      msg: 'locker.base != to the admin signer',
    },
  ],
};

export type Snapshots = {
  version: '0.2.8';
  name: 'snapshots';
  docs: ['The [snapshots] program.'];
  instructions: [
    {
      name: 'createEscrowHistory';
      docs: ['Creates a [EscrowHistory].'];
      accounts: [
        {
          name: 'escrow';
          isMut: false;
          isSigner: false;
          docs: ['The [Escrow].'];
        },
        {
          name: 'escrowHistory';
          isMut: true;
          isSigner: false;
          docs: ['The [EscrowHistory] to be created.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'EscrowHistory';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Escrow';
                path: 'escrow';
              },
              {
                kind: 'arg';
                type: 'u16';
                path: 'era';
              }
            ];
          };
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
          docs: ['Payer.'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['[System] program.'];
        }
      ];
      args: [
        {
          name: 'era';
          type: 'u16';
        }
      ];
    },
    {
      name: 'createLockerHistory';
      docs: ['Creates a [LockerHistory].'];
      accounts: [
        {
          name: 'locker';
          isMut: false;
          isSigner: false;
          docs: ['The [Locker].'];
        },
        {
          name: 'lockerHistory';
          isMut: true;
          isSigner: false;
          docs: ['The [LockerHistory] to be created.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'LockerHistory';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Locker';
                path: 'locker';
              },
              {
                kind: 'arg';
                type: 'u16';
                path: 'era';
              }
            ];
          };
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
          docs: ['Payer.'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['[System] program.'];
        }
      ];
      args: [
        {
          name: 'era';
          type: 'u16';
        }
      ];
    },
    {
      name: 'sync';
      docs: [
        'Synchronize an [locked_voter::Escrow] with the [LockerHistory]/[EscrowHistory].'
      ];
      accounts: [
        {
          name: 'locker';
          isMut: false;
          isSigner: false;
          docs: ['The [Locker].'];
        },
        {
          name: 'escrow';
          isMut: false;
          isSigner: false;
          docs: ['The [Escrow].'];
        },
        {
          name: 'lockerHistory';
          isMut: true;
          isSigner: false;
          docs: ['The [LockerHistory] to sync.'];
        },
        {
          name: 'escrowHistory';
          isMut: true;
          isSigner: false;
          docs: ['The [EscrowHistory] to sync.'];
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'LockerHistory';
      docs: [
        'Stores the total number of veTokens in circulation for each period.',
        '',
        'The [LockerHistory] account stores 256 periods, each 3 days each.',
        'For a 5-year [locked_voter::Locker], there will be at least 3 of these accounts existing',
        'at any given time, since the maximum lock period is 5 years.'
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'locker';
            docs: ['The [locked_voter::Locker] being tracked.'];
            type: 'publicKey';
          },
          {
            name: 'era';
            docs: [
              'The era. Multiplying this by [ERA_NUM_PERIODS] * [PERIOD_SECONDS];'
            ];
            type: 'u16';
          },
          {
            name: 'bump';
            docs: ['Bump seed.'];
            type: 'u8';
          },
          {
            name: 'padding';
            docs: ['Padding for aligning the struct to an 8-byte boundary.'];
            type: {
              array: ['u8', 5];
            };
          },
          {
            name: 'veBalances';
            docs: ['The sum of all tracked historical vote escrow balances.'];
            type: {
              array: ['u64', 256];
            };
          },
          {
            name: 'veCounts';
            docs: ['Number of voters with non-zero balances at each epoch.'];
            type: {
              array: ['u64', 256];
            };
          }
        ];
      };
    },
    {
      name: 'EscrowHistory';
      docs: [
        'Stores the total veToken balance of an [locked_voter::Escrow]',
        'for the given epochs.',
        '',
        'Any time someone refreshes and/or modifies their vote [locked_voter::Escrow], they',
        'should refresh their [EscrowHistory] accounts.'
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'escrow';
            docs: ['The [locked_voter::Escrow] being tracked.'];
            type: 'publicKey';
          },
          {
            name: 'era';
            docs: ['The era.'];
            type: 'u16';
          },
          {
            name: 'bump';
            docs: ['Bump seed.'];
            type: 'u8';
          },
          {
            name: 'padding';
            docs: ['Padding for aligning the struct to an 8-byte boundary.'];
            type: {
              array: ['u8', 5];
            };
          },
          {
            name: 'veBalances';
            docs: [
              'All tracked historical vote escrow balances for this [locked_voter::Escrow].'
            ];
            type: {
              array: ['u64', 256];
            };
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'LockerEscrowMismatch';
      msg: 'Locker/escrow mismatch.';
    },
    {
      code: 6001;
      name: 'EraMismatch';
      msg: 'Era mismatch.';
    },
    {
      code: 6002;
      name: 'EscrowBalanceDecreased';
      msg: 'Escrow balances cannot decrease.';
    }
  ];
  // eslint-disable-next-line @typescript-eslint/ban-types
  metadata: {};
};

export const snapshotsIdl: Snapshots = {
  version: '0.2.8',
  name: 'snapshots',
  docs: ['The [snapshots] program.'],
  instructions: [
    {
      name: 'createEscrowHistory',
      docs: ['Creates a [EscrowHistory].'],
      accounts: [
        {
          name: 'escrow',
          isMut: false,
          isSigner: false,
          docs: ['The [Escrow].'],
        },
        {
          name: 'escrowHistory',
          isMut: true,
          isSigner: false,
          docs: ['The [EscrowHistory] to be created.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'EscrowHistory',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Escrow',
                path: 'escrow',
              },
              {
                kind: 'arg',
                type: 'u16',
                path: 'era',
              },
            ],
          },
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
          docs: ['Payer.'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['[System] program.'],
        },
      ],
      args: [
        {
          name: 'era',
          type: 'u16',
        },
      ],
    },
    {
      name: 'createLockerHistory',
      docs: ['Creates a [LockerHistory].'],
      accounts: [
        {
          name: 'locker',
          isMut: false,
          isSigner: false,
          docs: ['The [Locker].'],
        },
        {
          name: 'lockerHistory',
          isMut: true,
          isSigner: false,
          docs: ['The [LockerHistory] to be created.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'LockerHistory',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Locker',
                path: 'locker',
              },
              {
                kind: 'arg',
                type: 'u16',
                path: 'era',
              },
            ],
          },
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
          docs: ['Payer.'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['[System] program.'],
        },
      ],
      args: [
        {
          name: 'era',
          type: 'u16',
        },
      ],
    },
    {
      name: 'sync',
      docs: [
        'Synchronize an [locked_voter::Escrow] with the [LockerHistory]/[EscrowHistory].',
      ],
      accounts: [
        {
          name: 'locker',
          isMut: false,
          isSigner: false,
          docs: ['The [Locker].'],
        },
        {
          name: 'escrow',
          isMut: false,
          isSigner: false,
          docs: ['The [Escrow].'],
        },
        {
          name: 'lockerHistory',
          isMut: true,
          isSigner: false,
          docs: ['The [LockerHistory] to sync.'],
        },
        {
          name: 'escrowHistory',
          isMut: true,
          isSigner: false,
          docs: ['The [EscrowHistory] to sync.'],
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'LockerHistory',
      docs: [
        'Stores the total number of veTokens in circulation for each period.',
        '',
        'The [LockerHistory] account stores 256 periods, each 3 days each.',
        'For a 5-year [locked_voter::Locker], there will be at least 3 of these accounts existing',
        'at any given time, since the maximum lock period is 5 years.',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'locker',
            docs: ['The [locked_voter::Locker] being tracked.'],
            type: 'publicKey',
          },
          {
            name: 'era',
            docs: [
              'The era. Multiplying this by [ERA_NUM_PERIODS] * [PERIOD_SECONDS];',
            ],
            type: 'u16',
          },
          {
            name: 'bump',
            docs: ['Bump seed.'],
            type: 'u8',
          },
          {
            name: 'padding',
            docs: ['Padding for aligning the struct to an 8-byte boundary.'],
            type: {
              array: ['u8', 5],
            },
          },
          {
            name: 'veBalances',
            docs: ['The sum of all tracked historical vote escrow balances.'],
            type: {
              array: ['u64', 256],
            },
          },
          {
            name: 'veCounts',
            docs: ['Number of voters with non-zero balances at each epoch.'],
            type: {
              array: ['u64', 256],
            },
          },
        ],
      },
    },
    {
      name: 'EscrowHistory',
      docs: [
        'Stores the total veToken balance of an [locked_voter::Escrow]',
        'for the given epochs.',
        '',
        'Any time someone refreshes and/or modifies their vote [locked_voter::Escrow], they',
        'should refresh their [EscrowHistory] accounts.',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'escrow',
            docs: ['The [locked_voter::Escrow] being tracked.'],
            type: 'publicKey',
          },
          {
            name: 'era',
            docs: ['The era.'],
            type: 'u16',
          },
          {
            name: 'bump',
            docs: ['Bump seed.'],
            type: 'u8',
          },
          {
            name: 'padding',
            docs: ['Padding for aligning the struct to an 8-byte boundary.'],
            type: {
              array: ['u8', 5],
            },
          },
          {
            name: 'veBalances',
            docs: [
              'All tracked historical vote escrow balances for this [locked_voter::Escrow].',
            ],
            type: {
              array: ['u64', 256],
            },
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'LockerEscrowMismatch',
      msg: 'Locker/escrow mismatch.',
    },
    {
      code: 6001,
      name: 'EraMismatch',
      msg: 'Era mismatch.',
    },
    {
      code: 6002,
      name: 'EscrowBalanceDecreased',
      msg: 'Escrow balances cannot decrease.',
    },
  ],
  metadata: {},
};

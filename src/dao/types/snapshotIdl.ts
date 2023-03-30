export type SnapshotsIDL = {
  version: '0.1.0';
  name: 'snapshots';
  instructions: [
    {
      name: 'createEscrowHistory';
      accounts: [
        {
          name: 'escrow';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'escrowHistory';
          isMut: true;
          isSigner: false;
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
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
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
      accounts: [
        {
          name: 'locker';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lockerHistory';
          isMut: true;
          isSigner: false;
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
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
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
      accounts: [
        {
          name: 'locker';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'escrow';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lockerHistory';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'escrowHistory';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'LockerHistory';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'locker';
            type: 'publicKey';
          },
          {
            name: 'era';
            type: 'u16';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 5];
            };
          },
          {
            name: 'veBalances';
            type: {
              array: ['u64', 256];
            };
          },
          {
            name: 'veCounts';
            type: {
              array: ['u64', 256];
            };
          }
        ];
      };
    },
    {
      name: 'EscrowHistory';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'escrow';
            type: 'publicKey';
          },
          {
            name: 'era';
            type: 'u16';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 5];
            };
          },
          {
            name: 'veBalances';
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
};
export const SnapshotsJSON: SnapshotsIDL = {
  version: '0.1.0',
  name: 'snapshots',
  instructions: [
    {
      name: 'createEscrowHistory',
      accounts: [
        {
          name: 'escrow',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'escrowHistory',
          isMut: true,
          isSigner: false,
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
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
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
      accounts: [
        {
          name: 'locker',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lockerHistory',
          isMut: true,
          isSigner: false,
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
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
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
      accounts: [
        {
          name: 'locker',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'escrow',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lockerHistory',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrowHistory',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'LockerHistory',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'locker',
            type: 'publicKey',
          },
          {
            name: 'era',
            type: 'u16',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 5],
            },
          },
          {
            name: 'veBalances',
            type: {
              array: ['u64', 256],
            },
          },
          {
            name: 'veCounts',
            type: {
              array: ['u64', 256],
            },
          },
        ],
      },
    },
    {
      name: 'EscrowHistory',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'escrow',
            type: 'publicKey',
          },
          {
            name: 'era',
            type: 'u16',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 5],
            },
          },
          {
            name: 'veBalances',
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
};

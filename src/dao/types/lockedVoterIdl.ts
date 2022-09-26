export type LockedVoterIDL = {
  version: "0.1.0";
  name: "locked_voter";
  instructions: [
    {
      name: "newEscrow";
      accounts: [
        {
          name: "locker";
          isMut: false;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "Escrow";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "Locker";
                path: "locker";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "escrow_owner";
              }
            ];
          };
        },
        {
          name: "escrowOwner";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bump";
          type: "u8";
        }
      ];
    },
  ];
  accounts: [
    {
      name: "Escrow";
      type: {
        kind: "struct";
        fields: [
          {
            name: "locker";
            type: "publicKey";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "tokens";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "escrowStartedAt";
            type: "i64";
          },
          {
            name: "escrowEndsAt";
            type: "i64";
          },
          {
            name: "voteDelegate";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "NewEscrowEvent";
      fields: [
        {
          name: "escrow";
          type: "publicKey";
          index: false;
        },
        {
          name: "escrowOwner";
          type: "publicKey";
          index: false;
        },
        {
          name: "locker";
          type: "publicKey";
          index: false;
        },
        {
          name: "timestamp";
          type: "i64";
          index: false;
        }
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "ProgramNotWhitelisted";
      msg: "CPI caller not whitelisted to invoke lock instruction.";
    },
    {
      code: 6001;
      name: "LockupDurationTooShort";
      msg: "Lockup duration must at least be the min stake duration.";
    },
    {
      code: 6002;
      name: "LockupDurationTooLong";
      msg: "Lockup duration must at most be the max stake duration.";
    },
    {
      code: 6003;
      name: "RefreshCannotShorten";
      msg: "A voting escrow refresh cannot shorten the escrow time remaining.";
    },
    {
      code: 6004;
      name: "EscrowNotEnded";
      msg: "Escrow has not ended.";
    },
    {
      code: 6005;
      name: "MustProvideWhitelist";
      msg: "Program whitelist enabled; please provide whitelist entry and instructions sysvar or use the 'lock_with_whitelist' instruction.";
    },
    {
      code: 6006;
      name: "EscrowOwnerNotWhitelisted";
      msg: "CPI caller not whitelisted for escrow owner to invoke lock instruction.";
    },
    {
      code: 6007;
      name: "MustCallLockWithWhitelistEntry";
      msg: "Must call `lock_with_whitelist_entry` to lock via CPI.";
    },
  ];
};
export const LockedVoterJSON: LockedVoterIDL = {
  version: "0.1.0",
  name: "locked_voter",
  instructions: [
    {
      name: "newEscrow",
      accounts: [
        {
          name: "locker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "Escrow",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Locker",
                path: "locker",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "escrow_owner",
              },
            ],
          },
        },
        {
          name: "escrowOwner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Escrow",
      type: {
        kind: "struct",
        fields: [
          {
            name: "locker",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "tokens",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "escrowStartedAt",
            type: "i64",
          },
          {
            name: "escrowEndsAt",
            type: "i64",
          },
          {
            name: "voteDelegate",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "NewEscrowEvent",
      fields: [
        {
          name: "escrow",
          type: "publicKey",
          index: false,
        },
        {
          name: "escrowOwner",
          type: "publicKey",
          index: false,
        },
        {
          name: "locker",
          type: "publicKey",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "ProgramNotWhitelisted",
      msg: "CPI caller not whitelisted to invoke lock instruction.",
    },
    {
      code: 6001,
      name: "LockupDurationTooShort",
      msg: "Lockup duration must at least be the min stake duration.",
    },
    {
      code: 6002,
      name: "LockupDurationTooLong",
      msg: "Lockup duration must at most be the max stake duration.",
    },
    {
      code: 6003,
      name: "RefreshCannotShorten",
      msg: "A voting escrow refresh cannot shorten the escrow time remaining.",
    },
    {
      code: 6004,
      name: "EscrowNotEnded",
      msg: "Escrow has not ended.",
    },
    {
      code: 6005,
      name: "MustProvideWhitelist",
      msg: "Program whitelist enabled; please provide whitelist entry and instructions sysvar or use the 'lock_with_whitelist' instruction.",
    },
    {
      code: 6006,
      name: "EscrowOwnerNotWhitelisted",
      msg: "CPI caller not whitelisted for escrow owner to invoke lock instruction.",
    },
    {
      code: 6007,
      name: "MustCallLockWithWhitelistEntry",
      msg: "Must call `lock_with_whitelist_entry` to lock via CPI.",
    },
  ],
};

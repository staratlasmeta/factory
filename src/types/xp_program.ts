export type Xp = {
  version: '0.1.0';
  name: 'xp';
  instructions: [
    {
      name: 'processInit';
      accounts: [
        {
          name: 'admin';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpVarsAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'processRegisterXpAccount';
      accounts: [
        {
          name: 'admin';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpVarsAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'label';
          type: 'string';
        },
        {
          name: 'tokenRequired';
          type: 'bool';
        },
        {
          name: 'tokenQty';
          type: {
            option: 'u64';
          };
        },
        {
          name: 'xpLimit';
          type: 'u64';
        }
      ];
    },
    {
      name: 'processUpdateXpLimit';
      accounts: [
        {
          name: 'admin';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpVarsAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'xpLimit';
          type: 'u64';
        }
      ];
    },
    {
      name: 'processCreateUserXpAccount';
      accounts: [
        {
          name: 'user';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'userXpAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'processCreateUserXpAccountWithLicense';
      accounts: [
        {
          name: 'user';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'userXpAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'licenseMintAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'processRegisterXpModifier';
      accounts: [
        {
          name: 'admin';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpVarsAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpModifierAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'modifier';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'canIncrement';
          type: 'bool';
        },
        {
          name: 'canDecrement';
          type: {
            option: 'bool';
          };
        }
      ];
    },
    {
      name: 'processDeregisterXpModifier';
      accounts: [
        {
          name: 'admin';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpVarsAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpModifierAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'modifier';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'processModifyXp';
      accounts: [
        {
          name: 'modifier';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'xpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'userXpAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'user';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'xpModifierAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'newXpValue';
          type: 'u64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'userXpAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'publicKey';
          },
          {
            name: 'xpType';
            type: 'publicKey';
          },
          {
            name: 'xp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'xpAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'label';
            type: 'string';
          },
          {
            name: 'tokenRequired';
            type: 'bool';
          },
          {
            name: 'tokenMint';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'tokenQty';
            type: 'u64';
          },
          {
            name: 'xpLimit';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'xpModifier';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'modifier';
            type: 'publicKey';
          },
          {
            name: 'xpType';
            type: 'publicKey';
          },
          {
            name: 'canIncrement';
            type: 'bool';
          },
          {
            name: 'canDecrement';
            type: 'bool';
          }
        ];
      };
    },
    {
      name: 'xpVars';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'admin';
            type: 'publicKey';
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'IncorrectAdminAddress';
      msg: 'Incorrect admin address.';
    },
    {
      code: 6001;
      name: 'IncorrectMintAddress';
      msg: 'Incorrect mint address.';
    },
    {
      code: 6002;
      name: 'IncorrectModifierAddress';
      msg: 'Incorrect modifier address.';
    },
    {
      code: 6003;
      name: 'IncorrectXpTypeAddress';
      msg: 'Incorrect owner address.';
    },
    {
      code: 6004;
      name: 'IncorrectOwner';
      msg: 'Incorrect XP Type.';
    },
    {
      code: 6005;
      name: 'IncrementNotAllowed';
      msg: 'Not allowed to increment XP.';
    },
    {
      code: 6006;
      name: 'DecrementNotAllowed';
      msg: 'Not allowed to decrement XP.';
    },
    {
      code: 6007;
      name: 'InsuficientTokenToBurn';
      msg: 'Insuficient token licenses to burn.';
    },
    {
      code: 6008;
      name: 'LicenseRequired';
      msg: 'License required to this type of XP.';
    },
    {
      code: 6009;
      name: 'LicenseNotRequired';
      msg: 'License NOT required to this type of XP.';
    }
  ];
};

export const IDL: Xp = {
  version: '0.1.0',
  name: 'xp',
  instructions: [
    {
      name: 'processInit',
      accounts: [
        {
          name: 'admin',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpVarsAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'processRegisterXpAccount',
      accounts: [
        {
          name: 'admin',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpVarsAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'label',
          type: 'string',
        },
        {
          name: 'tokenRequired',
          type: 'bool',
        },
        {
          name: 'tokenQty',
          type: {
            option: 'u64',
          },
        },
        {
          name: 'xpLimit',
          type: 'u64',
        },
      ],
    },
    {
      name: 'processUpdateXpLimit',
      accounts: [
        {
          name: 'admin',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpVarsAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'xpLimit',
          type: 'u64',
        },
      ],
    },
    {
      name: 'processCreateUserXpAccount',
      accounts: [
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'userXpAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'processCreateUserXpAccountWithLicense',
      accounts: [
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'userXpAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'licenseMintAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'processRegisterXpModifier',
      accounts: [
        {
          name: 'admin',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpVarsAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpModifierAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'modifier',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'canIncrement',
          type: 'bool',
        },
        {
          name: 'canDecrement',
          type: {
            option: 'bool',
          },
        },
      ],
    },
    {
      name: 'processDeregisterXpModifier',
      accounts: [
        {
          name: 'admin',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpVarsAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpModifierAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'modifier',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'processModifyXp',
      accounts: [
        {
          name: 'modifier',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'xpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'userXpAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'xpModifierAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'newXpValue',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'userXpAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'xpType',
            type: 'publicKey',
          },
          {
            name: 'xp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'xpAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'label',
            type: 'string',
          },
          {
            name: 'tokenRequired',
            type: 'bool',
          },
          {
            name: 'tokenMint',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'tokenQty',
            type: 'u64',
          },
          {
            name: 'xpLimit',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'xpModifier',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'modifier',
            type: 'publicKey',
          },
          {
            name: 'xpType',
            type: 'publicKey',
          },
          {
            name: 'canIncrement',
            type: 'bool',
          },
          {
            name: 'canDecrement',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'xpVars',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'IncorrectAdminAddress',
      msg: 'Incorrect admin address.',
    },
    {
      code: 6001,
      name: 'IncorrectMintAddress',
      msg: 'Incorrect mint address.',
    },
    {
      code: 6002,
      name: 'IncorrectModifierAddress',
      msg: 'Incorrect modifier address.',
    },
    {
      code: 6003,
      name: 'IncorrectXpTypeAddress',
      msg: 'Incorrect owner address.',
    },
    {
      code: 6004,
      name: 'IncorrectOwner',
      msg: 'Incorrect XP Type.',
    },
    {
      code: 6005,
      name: 'IncrementNotAllowed',
      msg: 'Not allowed to increment XP.',
    },
    {
      code: 6006,
      name: 'DecrementNotAllowed',
      msg: 'Not allowed to decrement XP.',
    },
    {
      code: 6007,
      name: 'InsuficientTokenToBurn',
      msg: 'Insuficient token licenses to burn.',
    },
    {
      code: 6008,
      name: 'LicenseRequired',
      msg: 'License required to this type of XP.',
    },
    {
      code: 6009,
      name: 'LicenseNotRequired',
      msg: 'License NOT required to this type of XP.',
    },
  ],
};

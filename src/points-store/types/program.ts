export type PointsStore = {
  version: '0.1.0';
  name: 'points_store';
  instructions: [
    {
      name: 'createPointsStore';
      accounts: [
        {
          name: 'store';
          isMut: true;
          isSigner: true;
          docs: ['The store to be created.'];
        },
        {
          name: 'storeSigner';
          isMut: false;
          isSigner: false;
          docs: ['The signer for the store.'];
        },
        {
          name: 'pointsAdmin';
          isMut: true;
          isSigner: false;
          docs: ['The admin for the points.'];
        },
        {
          name: 'pointsDomain';
          isMut: false;
          isSigner: false;
          docs: ['The domain of points.'];
        },
        {
          name: 'pointCategory';
          isMut: false;
          isSigner: false;
          docs: ['The category fore points to spend.'];
        },
        {
          name: 'pointsModifierAccount';
          isMut: true;
          isSigner: false;
          docs: ['The modifier account to use for this store.'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['The authority for the store.'];
        },
        {
          name: 'funder';
          isMut: true;
          isSigner: true;
          docs: ['The funder for the new store.'];
        },
        {
          name: 'bank';
          isMut: false;
          isSigner: false;
          docs: ['The bank for the tokens that can be bought'];
        },
        {
          name: 'pointsProgram';
          isMut: false;
          isSigner: false;
          docs: ['The [`Points`] program.'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program.'];
        }
      ];
      args: [
        {
          name: 'signerBump';
          type: 'u8';
        },
        {
          name: 'price';
          type: 'u64';
        }
      ];
    },
    {
      name: 'buy';
      accounts: [
        {
          name: 'store';
          isMut: false;
          isSigner: false;
          docs: ['The store to buy from.'];
        },
        {
          name: 'storeSigner';
          isMut: false;
          isSigner: false;
          docs: ["The store's signer."];
        },
        {
          name: 'bank';
          isMut: true;
          isSigner: false;
          docs: ["The store's bank."];
        },
        {
          name: 'user';
          isMut: false;
          isSigner: true;
          docs: ['The user buying the tokens.'];
        },
        {
          name: 'userPointsAccount';
          isMut: true;
          isSigner: false;
          docs: ["The user's points account."];
        },
        {
          name: 'tokensTo';
          isMut: true;
          isSigner: false;
          docs: ['The account where the tokens will be sent.'];
        },
        {
          name: 'pointCategory';
          isMut: false;
          isSigner: false;
          docs: ['The category of points to spend.'];
        },
        {
          name: 'pointsModifierAccount';
          isMut: false;
          isSigner: false;
          docs: ['The modifier account.'];
        },
        {
          name: 'pointsProgram';
          isMut: false;
          isSigner: false;
          docs: ['The points program.'];
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program.'];
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'changeStorePrice';
      accounts: [
        {
          name: 'store';
          isMut: true;
          isSigner: false;
          docs: ['The store to change the price of.'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
          docs: ["The store's authority."];
        }
      ];
      args: [
        {
          name: 'newPrice';
          type: 'u64';
        }
      ];
    },
    {
      name: 'removeStoreItems';
      accounts: [
        {
          name: 'store';
          isMut: false;
          isSigner: false;
          docs: ['The store to remove items from.'];
        },
        {
          name: 'storeSigner';
          isMut: false;
          isSigner: false;
          docs: ["The store's signer."];
        },
        {
          name: 'bank';
          isMut: false;
          isSigner: false;
          docs: ["The store's bank."];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
          docs: ["The store's authority."];
        },
        {
          name: 'tokensTo';
          isMut: false;
          isSigner: false;
          docs: ['Where the removed items will be sent.'];
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program.'];
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'closeStore';
      accounts: [
        {
          name: 'store';
          isMut: true;
          isSigner: false;
          docs: ['The store to close.'];
        },
        {
          name: 'storeSigner';
          isMut: false;
          isSigner: false;
          docs: ["The store's signer"];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
          docs: ["The store's authority."];
        },
        {
          name: 'bank';
          isMut: true;
          isSigner: false;
          docs: ["The store's bank."];
        },
        {
          name: 'fundsTo';
          isMut: true;
          isSigner: false;
          docs: ["Where the store's funds will be sent."];
        },
        {
          name: 'tokensTo';
          isMut: true;
          isSigner: false;
          docs: ['Where the remaining store items are sent.'];
        },
        {
          name: 'pointsAdmin';
          isMut: true;
          isSigner: false;
          docs: ["The point's domain admin."];
        },
        {
          name: 'pointsDomain';
          isMut: false;
          isSigner: false;
          docs: ["The point's domain."];
        },
        {
          name: 'pointCategory';
          isMut: false;
          isSigner: false;
          docs: ['The point category.'];
        },
        {
          name: 'pointsModifierAccount';
          isMut: true;
          isSigner: false;
          docs: ['The points modifier account.'];
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program.'];
        },
        {
          name: 'pointsProgram';
          isMut: false;
          isSigner: false;
          docs: ['The points program.'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program'];
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'pointsStore';
      docs: ['A set of tokens that can be bought with points from a category.'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'version';
            docs: ['The version of data in this struct.'];
            type: 'u8';
          },
          {
            name: 'pointCategory';
            docs: ['The category of points that can be spent'];
            type: 'publicKey';
          },
          {
            name: 'authority';
            docs: ['The authority of the points store.'];
            type: 'publicKey';
          },
          {
            name: 'bank';
            docs: ['The token wallet that stores the purchasable tokens.'];
            type: 'publicKey';
          },
          {
            name: 'price';
            docs: ['The points cost of each token.'];
            type: 'u64';
          },
          {
            name: 'signerBump';
            docs: ['The bump of the signer for the points store.'];
            type: 'u8';
          }
        ];
      };
    }
  ];
};

export const PointsStoreIDL: PointsStore = {
  version: '0.1.0',
  name: 'points_store',
  instructions: [
    {
      name: 'createPointsStore',
      accounts: [
        {
          name: 'store',
          isMut: true,
          isSigner: true,
          docs: ['The store to be created.'],
        },
        {
          name: 'storeSigner',
          isMut: false,
          isSigner: false,
          docs: ['The signer for the store.'],
        },
        {
          name: 'pointsAdmin',
          isMut: true,
          isSigner: false,
          docs: ['The admin for the points.'],
        },
        {
          name: 'pointsDomain',
          isMut: false,
          isSigner: false,
          docs: ['The domain of points.'],
        },
        {
          name: 'pointCategory',
          isMut: false,
          isSigner: false,
          docs: ['The category fore points to spend.'],
        },
        {
          name: 'pointsModifierAccount',
          isMut: true,
          isSigner: false,
          docs: ['The modifier account to use for this store.'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['The authority for the store.'],
        },
        {
          name: 'funder',
          isMut: true,
          isSigner: true,
          docs: ['The funder for the new store.'],
        },
        {
          name: 'bank',
          isMut: false,
          isSigner: false,
          docs: ['The bank for the tokens that can be bought'],
        },
        {
          name: 'pointsProgram',
          isMut: false,
          isSigner: false,
          docs: ['The [`Points`] program.'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program.'],
        },
      ],
      args: [
        {
          name: 'signerBump',
          type: 'u8',
        },
        {
          name: 'price',
          type: 'u64',
        },
      ],
    },
    {
      name: 'buy',
      accounts: [
        {
          name: 'store',
          isMut: false,
          isSigner: false,
          docs: ['The store to buy from.'],
        },
        {
          name: 'storeSigner',
          isMut: false,
          isSigner: false,
          docs: ["The store's signer."],
        },
        {
          name: 'bank',
          isMut: true,
          isSigner: false,
          docs: ["The store's bank."],
        },
        {
          name: 'user',
          isMut: false,
          isSigner: true,
          docs: ['The user buying the tokens.'],
        },
        {
          name: 'userPointsAccount',
          isMut: true,
          isSigner: false,
          docs: ["The user's points account."],
        },
        {
          name: 'tokensTo',
          isMut: true,
          isSigner: false,
          docs: ['The account where the tokens will be sent.'],
        },
        {
          name: 'pointCategory',
          isMut: false,
          isSigner: false,
          docs: ['The category of points to spend.'],
        },
        {
          name: 'pointsModifierAccount',
          isMut: false,
          isSigner: false,
          docs: ['The modifier account.'],
        },
        {
          name: 'pointsProgram',
          isMut: false,
          isSigner: false,
          docs: ['The points program.'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program.'],
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'changeStorePrice',
      accounts: [
        {
          name: 'store',
          isMut: true,
          isSigner: false,
          docs: ['The store to change the price of.'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
          docs: ["The store's authority."],
        },
      ],
      args: [
        {
          name: 'newPrice',
          type: 'u64',
        },
      ],
    },
    {
      name: 'removeStoreItems',
      accounts: [
        {
          name: 'store',
          isMut: false,
          isSigner: false,
          docs: ['The store to remove items from.'],
        },
        {
          name: 'storeSigner',
          isMut: false,
          isSigner: false,
          docs: ["The store's signer."],
        },
        {
          name: 'bank',
          isMut: false,
          isSigner: false,
          docs: ["The store's bank."],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
          docs: ["The store's authority."],
        },
        {
          name: 'tokensTo',
          isMut: false,
          isSigner: false,
          docs: ['Where the removed items will be sent.'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program.'],
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'closeStore',
      accounts: [
        {
          name: 'store',
          isMut: true,
          isSigner: false,
          docs: ['The store to close.'],
        },
        {
          name: 'storeSigner',
          isMut: false,
          isSigner: false,
          docs: ["The store's signer"],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
          docs: ["The store's authority."],
        },
        {
          name: 'bank',
          isMut: true,
          isSigner: false,
          docs: ["The store's bank."],
        },
        {
          name: 'fundsTo',
          isMut: true,
          isSigner: false,
          docs: ["Where the store's funds will be sent."],
        },
        {
          name: 'tokensTo',
          isMut: true,
          isSigner: false,
          docs: ['Where the remaining store items are sent.'],
        },
        {
          name: 'pointsAdmin',
          isMut: true,
          isSigner: false,
          docs: ["The point's domain admin."],
        },
        {
          name: 'pointsDomain',
          isMut: false,
          isSigner: false,
          docs: ["The point's domain."],
        },
        {
          name: 'pointCategory',
          isMut: false,
          isSigner: false,
          docs: ['The point category.'],
        },
        {
          name: 'pointsModifierAccount',
          isMut: true,
          isSigner: false,
          docs: ['The points modifier account.'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program.'],
        },
        {
          name: 'pointsProgram',
          isMut: false,
          isSigner: false,
          docs: ['The points program.'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program'],
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'pointsStore',
      docs: ['A set of tokens that can be bought with points from a category.'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'version',
            docs: ['The version of data in this struct.'],
            type: 'u8',
          },
          {
            name: 'pointCategory',
            docs: ['The category of points that can be spent'],
            type: 'publicKey',
          },
          {
            name: 'authority',
            docs: ['The authority of the points store.'],
            type: 'publicKey',
          },
          {
            name: 'bank',
            docs: ['The token wallet that stores the purchasable tokens.'],
            type: 'publicKey',
          },
          {
            name: 'price',
            docs: ['The points cost of each token.'],
            type: 'u64',
          },
          {
            name: 'signerBump',
            docs: ['The bump of the signer for the points store.'],
            type: 'u8',
          },
        ],
      },
    },
  ],
};

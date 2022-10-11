export type GmLogsIdl = {
  version: '0.1.0';
  name: 'gm_logs';
  instructions: [];
  events: [
    {
      name: 'RegisterCurrencyMemo';
      fields: [
        {
          name: 'updateAuthorityAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'registeredCurrency';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'currencyMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'saCurrencyVault';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'royalty';
          type: 'u64';
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
      name: 'InitializeMemo';
      fields: [
        {
          name: 'orderInitializerPubkey';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'currencyMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'assetMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'initializerCurrencyTokenAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'initializerAssetTokenAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'orderSide';
          type: 'u8';
          index: false;
        },
        {
          name: 'price';
          type: 'u64';
          index: false;
        },
        {
          name: 'orderOriginationQty';
          type: 'u64';
          index: false;
        },
        {
          name: 'orderRemainingQty';
          type: 'u64';
          index: false;
        },
        {
          name: 'createdAtTimestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'orderId';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'ExchangeMemo';
      fields: [
        {
          name: 'orderInitializerPubkey';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'currencyMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'assetMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'initializerCurrencyTokenAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'initializerAssetTokenAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'orderSide';
          type: 'u8';
          index: false;
        },
        {
          name: 'price';
          type: 'u64';
          index: false;
        },
        {
          name: 'orderOriginationQty';
          type: 'u64';
          index: false;
        },
        {
          name: 'orderRemainingQty';
          type: 'u64';
          index: false;
        },
        {
          name: 'createdAtTimestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'orderId';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'CancelOrderMemo';
      fields: [
        {
          name: 'orderInitializerPubkey';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'currencyMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'assetMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'initializerCurrencyTokenAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'initializerAssetTokenAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'orderSide';
          type: 'u8';
          index: false;
        },
        {
          name: 'price';
          type: 'u64';
          index: false;
        },
        {
          name: 'orderOriginationQty';
          type: 'u64';
          index: false;
        },
        {
          name: 'orderRemainingQty';
          type: 'u64';
          index: false;
        },
        {
          name: 'createdAtTimestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'orderId';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'StakeMemo';
      fields: [
        {
          name: 'user';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'registeredStake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stakingAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stakeAmount';
          type: 'u64';
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
      name: 'TransferMemo';
      fields: [
        {
          name: 'user';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'registeredStake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stakingAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'transferAmount';
          type: 'u64';
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
      name: 'WithdrawMemo';
      fields: [
        {
          name: 'user';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'registeredStake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stakingAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'withdrawAmount';
          type: 'u64';
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
      name: 'SettleMemo';
      fields: [
        {
          name: 'user';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'registeredStake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stakingAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        }
      ];
    }
  ];
  metadata: Record<string, unknown>;
};

export const baseIdl: GmLogsIdl = {
  version: '0.1.0',
  name: 'gm_logs',
  instructions: [],
  events: [
    {
      name: 'RegisterCurrencyMemo',
      fields: [
        {
          name: 'updateAuthorityAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'registeredCurrency',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'currencyMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'saCurrencyVault',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'royalty',
          type: 'u64',
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
      name: 'InitializeMemo',
      fields: [
        {
          name: 'orderInitializerPubkey',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'currencyMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'assetMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'initializerCurrencyTokenAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'initializerAssetTokenAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'orderSide',
          type: 'u8',
          index: false,
        },
        {
          name: 'price',
          type: 'u64',
          index: false,
        },
        {
          name: 'orderOriginationQty',
          type: 'u64',
          index: false,
        },
        {
          name: 'orderRemainingQty',
          type: 'u64',
          index: false,
        },
        {
          name: 'createdAtTimestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'orderId',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'ExchangeMemo',
      fields: [
        {
          name: 'orderInitializerPubkey',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'currencyMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'assetMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'initializerCurrencyTokenAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'initializerAssetTokenAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'orderSide',
          type: 'u8',
          index: false,
        },
        {
          name: 'price',
          type: 'u64',
          index: false,
        },
        {
          name: 'orderOriginationQty',
          type: 'u64',
          index: false,
        },
        {
          name: 'orderRemainingQty',
          type: 'u64',
          index: false,
        },
        {
          name: 'createdAtTimestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'orderId',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'CancelOrderMemo',
      fields: [
        {
          name: 'orderInitializerPubkey',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'currencyMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'assetMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'initializerCurrencyTokenAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'initializerAssetTokenAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'orderSide',
          type: 'u8',
          index: false,
        },
        {
          name: 'price',
          type: 'u64',
          index: false,
        },
        {
          name: 'orderOriginationQty',
          type: 'u64',
          index: false,
        },
        {
          name: 'orderRemainingQty',
          type: 'u64',
          index: false,
        },
        {
          name: 'createdAtTimestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'orderId',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'StakeMemo',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'registeredStake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stakingAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stakeAmount',
          type: 'u64',
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
      name: 'TransferMemo',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'registeredStake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stakingAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'transferAmount',
          type: 'u64',
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
      name: 'WithdrawMemo',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'registeredStake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stakingAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'withdrawAmount',
          type: 'u64',
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
      name: 'SettleMemo',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'registeredStake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stakingAccount',
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
  ],
  metadata: {},
};

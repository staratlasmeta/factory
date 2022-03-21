export const baseIdl: unknown =
{
  'version': '0.1.0',
  'name': 'marketplace',
  'instructions': [
    {
      'name': 'deregisterCurrency',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'marketVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'registeredCurrency',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'currencyMint',
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
      'name': 'initializeMarket',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'marketVarsAccount',
          'isMut': true,
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
      'name': 'processInitializeBuy',
      'accounts': [
        {
          'name': 'orderInitializer',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'marketVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'depositMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'receiveMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderVaultAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderVaultAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'initializerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'initializerReceiveTokenAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'registeredCurrency',
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
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'price',
          'type': 'u64'
        },
        {
          'name': 'originationQty',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processInitializeSell',
      'accounts': [
        {
          'name': 'orderInitializer',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'marketVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'depositMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'receiveMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderVaultAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderVaultAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'initializerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'initializerReceiveTokenAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'registeredCurrency',
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
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'price',
          'type': 'u64'
        },
        {
          'name': 'originationQty',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processExchange',
      'accounts': [
        {
          'name': 'orderTaker',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'orderTakerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderTakerReceiveTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'currencyMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'assetMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderInitializer',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'initializerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'initializerReceiveTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderVaultAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderVaultAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'saVault',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'registeredCurrency',
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
          'name': 'purchaseQty',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processCancel',
      'accounts': [
        {
          'name': 'orderInitializer',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'depositMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'initializerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderVaultAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'orderVaultAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'orderAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'registerCurrency',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'marketVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'registeredCurrency',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'currencyMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'saCurrencyVault',
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
          'name': 'royalty',
          'type': 'u64'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'MarketVars',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'updateAuthorityMaster',
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'OrderAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'orderInitializerPubkey',
            'type': 'publicKey'
          },
          {
            'name': 'currencyMint',
            'type': 'publicKey'
          },
          {
            'name': 'assetMint',
            'type': 'publicKey'
          },
          {
            'name': 'initializerCurrencyTokenAccount',
            'type': 'publicKey'
          },
          {
            'name': 'initializerAssetTokenAccount',
            'type': 'publicKey'
          },
          {
            'name': 'orderSide',
            'type': {
              'defined': 'OrderSide'
            }
          },
          {
            'name': 'price',
            'type': 'u64'
          },
          {
            'name': 'orderOriginationQty',
            'type': 'u64'
          },
          {
            'name': 'orderRemainingQty',
            'type': 'u64'
          },
          {
            'name': 'createdAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'RegisteredCurrency',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'tokenMint',
            'type': 'publicKey'
          },
          {
            'name': 'saCurrencyVault',
            'type': 'publicKey'
          },
          {
            'name': 'royalty',
            'type': 'u64'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'OrderSide',
      'type': {
        'kind': 'enum',
        'variants': [
          {
            'name': 'Buy'
          },
          {
            'name': 'Sell'
          }
        ]
      }
    },
    {
      'name': 'TokenType',
      'type': {
        'kind': 'enum',
        'variants': [
          {
            'name': 'Asset'
          },
          {
            'name': 'Currency'
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'InvalidDestinationAccount',
      'msg': 'Invalid Destination Token Account'
    },
    {
      'code': 6001,
      'name': 'InvalidInstruction',
      'msg': 'Invalid instruction.'
    },
    {
      'code': 6002,
      'name': 'InvalidMint',
      'msg': 'Invalid SPL Token mint'
    },
    {
      'code': 6003,
      'name': 'InvalidOfferAccountOwner',
      'msg': 'Invalid Offer Account Owner'
    },
    {
      'code': 6004,
      'name': 'InvalidTokenAccount',
      'msg': 'Invalid SPL Token account'
    },
    {
      'code': 6005,
      'name': 'NumericalOverflowError',
      'msg': 'Numerical overflow error'
    },
    {
      'code': 6006,
      'name': 'InvalidUpdateAuthorityAccount',
      'msg': 'Invalid Update Authority account'
    },
    {
      'code': 6007,
      'name': 'InvalidOrderVaultAuthorityAccount',
      'msg': 'Invalid Order Vault Authority account'
    },
    {
      'code': 6008,
      'name': 'UninitializedTokenAccount',
      'msg': 'Uninitialized Token Account'
    },
    {
      'code': 6009,
      'name': 'InsufficientBalance',
      'msg': 'Insufficient Balance'
    },
    {
      'code': 6010,
      'name': 'InvalidOrderDuration',
      'msg': 'Invalid Order Duration'
    },
    {
      'code': 6011,
      'name': 'OrderExpired',
      'msg': 'Order Expired'
    },
    {
      'code': 6012,
      'name': 'InsufficientOrderQty',
      'msg': 'Insufficient Order Quantity Remaining'
    }
  ],
  'metadata': {
  }
}

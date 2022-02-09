export const baseIdl: unknown =
{
  "version": "0.1.0",
  "name": "marketplace",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "updateAuthorityAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marketVarsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "processInitializeBuy",
      "accounts": [
        {
          "name": "orderInitializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "depositMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiveMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offerAccountBump",
          "type": "u8"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "originationQty",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processInitializeSell",
      "accounts": [
        {
          "name": "orderInitializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "depositMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiveMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offerAccountBump",
          "type": "u8"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "originationQty",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processExchange",
      "accounts": [
        {
          "name": "orderTaker",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "orderTakerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderTakerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializerReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderVaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "purchaseQty",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processCancel",
      "accounts": [
        {
          "name": "orderInitializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderVaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "MarketVars",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateAuthorityMaster",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "OrderAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderInitializerPubkey",
            "type": "publicKey"
          },
          {
            "name": "depositMint",
            "type": "publicKey"
          },
          {
            "name": "receiveMint",
            "type": "publicKey"
          },
          {
            "name": "initializerDepositTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initializerReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "orderSide",
            "type": {
              "defined": "OrderSide"
            }
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "orderOriginationQty",
            "type": "u64"
          },
          {
            "name": "orderRemainingQty",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RegisteredCurrency",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "saCurrencyVault",
            "type": "publicKey"
          },
          {
            "name": "royalty",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SaAsset",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetMint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "OrderSide",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidDestinationAccount",
      "msg": "Invalid Destiantion Token Account"
    },
    {
      "code": 6001,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction."
    },
    {
      "code": 6002,
      "name": "InvalidMint",
      "msg": "Invalid SPL Token mint"
    },
    {
      "code": 6003,
      "name": "InvalidOfferAccountOwner",
      "msg": "Invalid Offer Account Owner"
    },
    {
      "code": 6004,
      "name": "InvalidTokenAccount",
      "msg": "Invalid SPL Token account"
    },
    {
      "code": 6005,
      "name": "InvalidUpdateAuthorityAccount",
      "msg": "Numerical overflow error"
    },
    {
      "code": 6006,
      "name": "NumericalOverflowError",
      "msg": "Invalid Update Authority account"
    },
    {
      "code": 6007,
      "name": "UninitializedTokenAccount",
      "msg": "Uninitialized Token Account"
    }
  ],
  "metadata": {
    "address": ""
  }
}
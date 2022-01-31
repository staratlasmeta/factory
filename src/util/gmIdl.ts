export const baseIdl: unknown =
{
  'version': '0.1.0',
  'name': 'marketplace',
  'instructions': [
    {
      'name': 'processInitialize',
      'accounts': [
        {
          'name': 'offerInitializer',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'offerVaultAccount',
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
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'offerAccount',
          'isMut': true,
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
          'name': 'offerAccountBump',
          'type': 'u8'
        },
        {
          'name': 'offerAmount',
          'type': 'u64'
        },
        {
          'name': 'takerAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processExchange',
      'accounts': [
        {
          'name': 'offerTaker',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'offerTakerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'offerTakerReceiveTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'offerInitializer',
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
          'name': 'offerVaultAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'offerVaultAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'offerAccount',
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
      'name': 'processCancel',
      'accounts': [
        {
          'name': 'offerInitializer',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'initializerDepositTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'offerVaultAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'offerVaultAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'offerAccount',
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
    }
  ],
  'accounts': [
    {
      'name': 'OfferAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'offerInitializerPubkey',
            'type': 'publicKey'
          },
          {
            'name': 'initializerDepositTokenAccount',
            'type': 'publicKey'
          },
          {
            'name': 'initializerReceiveTokenAccount',
            'type': 'publicKey'
          },
          {
            'name': 'offerAmount',
            'type': 'u64'
          },
          {
            'name': 'takerAmount',
            'type': 'u64'
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'InvalidInstruction',
      'msg': 'Invalid instruction.'
    },
    {
      'code': 6001,
      'name': 'InvalidOfferAccountOwner',
      'msg': 'Invalid Offer Account Owner'
    },
    {
      'code': 6002,
      'name': 'InvalidDestinationAccount',
      'msg': 'Invalid Destiantion Token Account'
    },
    {
      'code': 6003,
      'name': 'InvalidMint',
      'msg': 'Invalid SPL Token mint'
    },
    {
      'code': 6004,
      'name': 'InvalidTokenAccount',
      'msg': 'Invalid SPL Token account'
    }
  ],
  'metadata': {
  }
}
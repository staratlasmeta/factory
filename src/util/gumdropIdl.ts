export const gumDropIdl = {
  version: '0.0.0',
  name: 'merkle_distributor',
  instructions: [
    {
      name: 'newDistributor',
      accounts: [
        {
          name: 'base',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: false,
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
        {
          name: 'root',
          type: {
            array: ['u8', 32],
          },
        },
        {
          name: 'temporal',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'closeDistributor',
      accounts: [
        {
          name: 'base',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'distributorWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiver',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'walletBump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'claim',
      accounts: [
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'claimStatus',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'from',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'to',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'temporal',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'index',
          type: 'u64',
        },
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'claimantSecret',
          type: 'publicKey',
        },
        {
          name: 'proof',
          type: {
            vec: {
              array: ['u8', 32],
            },
          },
        },
      ],
    },
    {
      name: 'claimCandy',
      accounts: [
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'distributorWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'claimCount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'temporal',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'candyMachineConfig',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'candyMachine',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'candyMachineWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'candyMachineMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'candyMachineMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'candyMachineMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'candyMachineProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'walletBump',
          type: 'u8',
        },
        {
          name: 'claimBump',
          type: 'u8',
        },
        {
          name: 'index',
          type: 'u64',
        },
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'claimantSecret',
          type: 'publicKey',
        },
        {
          name: 'proof',
          type: {
            vec: {
              array: ['u8', 32],
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'MerkleDistributor',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'base',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'temporal',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'ClaimStatus',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'isClaimed',
            type: 'bool',
          },
          {
            name: 'claimant',
            type: 'publicKey',
          },
          {
            name: 'claimedAt',
            type: 'i64',
          },
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ClaimCount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'count',
            type: 'u64',
          },
          {
            name: 'claimant',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'CandyMachine',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'tokenMint',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'config',
            type: 'publicKey',
          },
          {
            name: 'data',
            type: {
              defined: 'CandyMachineData',
            },
          },
          {
            name: 'itemsRedeemed',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'CandyMachineData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'uuid',
            type: 'string',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'itemsAvailable',
            type: 'u64',
          },
          {
            name: 'goLiveDate',
            type: {
              option: 'i64',
            },
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'ClaimedEvent',
      fields: [
        {
          name: 'index',
          type: 'u64',
          index: false,
        },
        {
          name: 'claimant',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 300,
      name: 'InvalidProof',
      msg: 'Invalid Merkle proof.',
    },
    {
      code: 301,
      name: 'DropAlreadyClaimed',
      msg: 'Drop already claimed.',
    },
    {
      code: 302,
      name: 'Unauthorized',
      msg: 'Account is not authorized to execute this instruction',
    },
    {
      code: 303,
      name: 'OwnerMismatch',
      msg: 'Token account owner did not match intended owner',
    },
    {
      code: 304,
      name: 'TemporalMismatch',
      msg: 'Temporal signer did not match distributor',
    },
  ],
};

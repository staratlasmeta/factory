export const baseIdl: unknown = {
  'version': '0.0.0',
  'name': 'score',
  'instructions': [
    {
      'name': 'processInitialize',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
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
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'treasuryAuthorityAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'atlasMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'toolkitMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'bump',
          'type': 'u8'
        },
        {
          'name': 'treasuryBump',
          'type': 'u8'
        },
        {
          'name': 'treasuryAuthBump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'processRegisterShip',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipMint',
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
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'rewardRatePerSecond',
          'type': 'u64'
        },
        {
          'name': 'fuelMaxReserve',
          'type': 'u16'
        },
        {
          'name': 'foodMaxReserve',
          'type': 'u16'
        },
        {
          'name': 'armsMaxReserve',
          'type': 'u16'
        },
        {
          'name': 'toolkitMaxReserve',
          'type': 'u16'
        },
        {
          'name': 'secondsToBurnOneFuel',
          'type': 'u16'
        },
        {
          'name': 'secondsToBurnOneFood',
          'type': 'u16'
        },
        {
          'name': 'secondsToBurnOneArms',
          'type': 'u16'
        },
        {
          'name': 'secondsToBurnOneToolkit',
          'type': 'u16'
        }
      ]
    },
    {
      'name': 'processUpdateRewardRate',
      'accounts': [
        {
          'name': 'updateAuthorityAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'newRewardRatePerSecond',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processInitialDeposit',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'playerFactionAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'shipQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processPartialDeposit',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'shipQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRefuel',
      'accounts': [
        {
          'name': 'tokenOwnerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'fuelQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRefeed',
      'accounts': [
        {
          'name': 'tokenOwnerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'foodQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRearm',
      'accounts': [
        {
          'name': 'tokenOwnerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'armsQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processRepair',
      'accounts': [
        {
          'name': 'tokenOwnerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'toolkitMint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'toolkitTokenAccountSource',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'toolkitQuantity',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processSettle',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'updateAuthorityAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'processHarvest',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'playerAtlasTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'treasuryAuthorityAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'treasuryBump',
          'type': 'u8'
        },
        {
          'name': 'treasuryAuthBump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'processWithdrawFuel',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountReturn',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'fuelMint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'withdrawAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processWithdrawFood',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountReturn',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'foodMint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'withdrawAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processWithdrawArms',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountReturn',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'armsMint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'withdrawAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'processWithdrawShips',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'scoreVarsShipAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'playerAtlasTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountReturn',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'toolkitTokenAccountSource',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'treasuryTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'treasuryAuthorityAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'toolkitMint',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsShipBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        },
        {
          'name': 'escrowBump',
          'type': 'u8'
        },
        {
          'name': 'treasuryAuthBump',
          'type': 'u8'
        },
        {
          'name': 'treasuryBump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'processCloseAccounts',
      'accounts': [
        {
          'name': 'playerAccount',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'shipStakingAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'scoreVarsAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'fuelTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'foodTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'armsTokenAccountEscrow',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'escrowAuthority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'shipMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'fuelMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'foodMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'armsMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'clock',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'stakingBump',
          'type': 'u8'
        },
        {
          'name': 'scorevarsBump',
          'type': 'u8'
        },
        {
          'name': 'shipBump',
          'type': 'u8'
        },
        {
          'name': 'fuelBump',
          'type': 'u8'
        },
        {
          'name': 'foodBump',
          'type': 'u8'
        },
        {
          'name': 'armsBump',
          'type': 'u8'
        },
        {
          'name': 'escrowAuthBump',
          'type': 'u8'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'ScoreVars',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'updateAuthorityMaster',
            'type': 'publicKey'
          },
          {
            'name': 'updateAuthority1',
            'type': 'publicKey'
          },
          {
            'name': 'updateAuthority2',
            'type': 'publicKey'
          },
          {
            'name': 'fuelMint',
            'type': 'publicKey'
          },
          {
            'name': 'foodMint',
            'type': 'publicKey'
          },
          {
            'name': 'armsMint',
            'type': 'publicKey'
          },
          {
            'name': 'toolkitMint',
            'type': 'publicKey'
          }
        ]
      }
    },
    {
      'name': 'ScoreVarsShip',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'shipMint',
            'type': 'publicKey'
          },
          {
            'name': 'rewardRatePerSecond',
            'type': 'u64'
          },
          {
            'name': 'fuelMaxReserve',
            'type': 'u16'
          },
          {
            'name': 'foodMaxReserve',
            'type': 'u16'
          },
          {
            'name': 'armsMaxReserve',
            'type': 'u16'
          },
          {
            'name': 'toolkitMaxReserve',
            'type': 'u16'
          },
          {
            'name': 'secondsToBurnOneFuel',
            'type': 'u16'
          },
          {
            'name': 'secondsToBurnOneFood',
            'type': 'u16'
          },
          {
            'name': 'secondsToBurnOneArms',
            'type': 'u16'
          },
          {
            'name': 'secondsToBurnOneToolkit',
            'type': 'u16'
          }
        ]
      }
    },
    {
      'name': 'ShipStaking',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'factionId',
            'type': 'u8'
          },
          {
            'name': 'shipMint',
            'type': 'publicKey'
          },
          {
            'name': 'shipQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'fuelQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'foodQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'armsQuantityInEscrow',
            'type': 'u64'
          },
          {
            'name': 'fuelCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'foodCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'armsCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'healthCurrentCapacity',
            'type': 'u64'
          },
          {
            'name': 'stakedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'fueledAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'fedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'armedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'repairedAtTimestamp',
            'type': 'i64'
          },
          {
            'name': 'currentCapacityTimestamp',
            'type': 'i64'
          },
          {
            'name': 'totalTimeStaked',
            'type': 'u64'
          },
          {
            'name': 'stakedTimePaid',
            'type': 'u64'
          },
          {
            'name': 'pendingRewards',
            'type': 'u64'
          },
          {
            'name': 'totalRewardsPaid',
            'type': 'u64'
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 300,
      'name': 'ScorevarsNotInitialized',
      'msg': 'Scorevars auth is not initialized'
    },
    {
      'code': 301,
      'name': 'ScorevarsAuthInvalid',
      'msg': 'Scorevars auth invalid'
    },
    {
      'code': 302,
      'name': 'FactionTypeError',
      'msg': 'Faction ID must be 0, 1, or 2.'
    },
    {
      'code': 303,
      'name': 'InvalidShipError',
      'msg': 'Invalid Ship Mint'
    },
    {
      'code': 304,
      'name': 'InvalidResourceError',
      'msg': 'Invalid Resource Mint'
    },
    {
      'code': 305,
      'name': 'ZeroResourceError',
      'msg': 'Resource Quantity must be >0.'
    },
    {
      'code': 306,
      'name': 'ZeroShipError',
      'msg': 'Ship Quantity must be >0.'
    },
    {
      'code': 307,
      'name': 'NumericalOverflowError',
      'msg': 'Numerical overflow error'
    },
    {
      'code': 308,
      'name': 'ResourceAmountTooSmall',
      'msg': 'Resource Amount Too Small, would add 0 seconds to capacity'
    },
    {
      'code': 309,
      'name': 'InvalidScoreVarsAccount',
      'msg': 'Invalid ScoreVars account for ship Staking Account given'
    },
    {
      'code': 310,
      'name': 'InvalidResourceWithdraw',
      'msg': 'Invalid Resource Withdraw, nothing to withdraw'
    },
    {
      'code': 311,
      'name': 'InvalidShipStakingOwner',
      'msg': 'Invalid Ship Staking Owner'
    },
    {
      'code': 312,
      'name': 'InvalidShipWithdraw',
      'msg': 'Invalid Ship Withdraw'
    },
    {
      'code': 313,
      'name': 'EscrowAccountNotZero',
      'msg': 'Escrow account must be 0 to close accounts'
    }
  ],
  'metadata': {
    'address': '3ed3LTq6kCu9pEkVDddDYPyrSddywsEpXb2F8Uav69CT'
  }
}
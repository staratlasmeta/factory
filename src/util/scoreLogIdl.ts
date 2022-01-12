export const scoreLogBaseIdl: unknown = {
  'version': '0.0.0',
  'name': 'score_logs',
  'instructions': [],
  'events': [
    {
      'name': 'ProcessInitialDepositMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'factionId',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'stakedAtTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessPartialDepositMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'previousShipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'addedShipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'newShipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'partialDepositTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessRearmMemo',
      'fields': [
        {
          'name': 'tokenOwnerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'armsQuantityToDeposit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'armedAtTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessRefeedMemo',
      'fields': [
        {
          'name': 'tokenOwnerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'foodQuantityToDeposit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'fedAtTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessRefuelMemo',
      'fields': [
        {
          'name': 'tokenOwnerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'fuelQuantityToDeposit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'fueledAtTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessRepairMemo',
      'fields': [
        {
          'name': 'tokenOwnerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'toolkitQuantityToDeposit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'repairedAtTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessHarvestMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'stakedTimePaid',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'rewardPayout',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'totalRewardsPaid',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'harvestTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessSettleMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'stakedTimePaid',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'totalRewardsPaid',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'settleTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessArmsWithdrawMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'armsQuantityWithdrawn',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'armsWithdrawTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessFoodWithdrawMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'foodQuantityWithdrawn',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'foodWithdrawTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessFuelWithdrawMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'fuelQuantityWithdrawn',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'fuelWithdrawTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessWithdrawShipsMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipQuantity',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'stakedTimePaid',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'totalRewardsPaid',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'shipsWithdrawTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ProcessCloseAccountMemo',
      'fields': [
        {
          'name': 'playerAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'shipMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'accountClosedTimestamp',
          'type': 'i64',
          'index': false
        }
      ]
    }
  ]
}
export type Points = {
  'version': '0.1.0',
  'name': 'points',
  'instructions': [
    {
      'name': 'initializeDomain',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity calling this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [DomainAccount] account'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'namespace',
          'type': {
            'array': [
              'u8',
              32
            ]
          }
        }
      ]
    },
    {
      'name': 'deregisterDomain',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'registerPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'input',
          'type': {
            'defined': 'RegisterPointCategoryAccountInput'
          }
        }
      ]
    },
    {
      'name': 'deregisterPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'updatePointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'input',
          'type': {
            'defined': 'UpdatePointCategoryAccountInput'
          }
        }
      ]
    },
    {
      'name': 'addPointCategoryAccountLevel',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'newLevel',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'createUserPointAccount',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that called this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System Program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'createUserPointAccountWithLicense',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that called this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              }
            ]
          }
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The User token account for the license to burn'
          ]
        },
        {
          'name': 'licenseMintAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The mint address for the license to burn'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana Token Program'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System Program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'registerPointModifier',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Points Modifier address'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'canIncrement',
          'type': 'bool'
        },
        {
          'name': 'canDecrement',
          'type': {
            'option': 'bool'
          }
        },
        {
          'name': 'canSpend',
          'type': {
            'option': 'bool'
          }
        }
      ]
    },
    {
      'name': 'deregisterPointModifier',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Points Modifier address'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'incrementPoints',
      'accounts': [
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user_points_account'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'pointsAmount',
          'type': 'u64'
        },
        {
          'name': 'newUserLevel',
          'type': {
            'option': 'u16'
          }
        }
      ]
    },
    {
      'name': 'decrementPoints',
      'accounts': [
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user_points_account'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'pointsAmount',
          'type': 'u64'
        },
        {
          'name': 'newUserLevel',
          'type': {
            'option': 'u16'
          }
        }
      ]
    },
    {
      'name': 'spendPoints',
      'accounts': [
        {
          'name': 'spender',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity calling this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user_points_account'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'spender'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'pointsAmount',
          'type': 'u64'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'domainAccount',
      'docs': [
        'PDA holding the class of points and the account with admin privileges for this point type'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'admin',
            'docs': [
              'admin'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'namespace',
            'docs': [
              'the name space'
            ],
            'type': {
              'array': [
                'u8',
                32
              ]
            }
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pointCategoryAccount',
      'docs': [
        'PDA for each specific type of Points'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'domain',
            'docs': [
              'the domain'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'tokenRequired',
            'docs': [
              'if this is true then token_mint should be a mint address'
            ],
            'type': 'u8'
          },
          {
            'name': 'tokenMint',
            'docs': [
              'the token mint'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'tokenQty',
            'docs': [
              'the token qty'
            ],
            'type': 'u64'
          },
          {
            'name': 'transferTokensToVault',
            'docs': [
              'if this is true then token_vault should be a token address'
            ],
            'type': 'u8'
          },
          {
            'name': 'tokenVault',
            'docs': [
              'the token vault'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'pointLimit',
            'docs': [
              'point limit'
            ],
            'type': 'u64'
          },
          {
            'name': 'isSpendable',
            'docs': [
              'is spendable?'
            ],
            'type': 'u8'
          },
          {
            'name': 'numLevels',
            'docs': [
              'the number of levels'
            ],
            'type': 'u16'
          },
          {
            'name': 'namespace',
            'docs': [
              'the namespace'
            ],
            'type': {
              'array': [
                'u8',
                32
              ]
            }
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pointsModifier',
      'docs': [
        'PDA containing one account that can modify an Points type'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'modifier',
            'docs': [
              'modifier'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'docs': [
              'point_category'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'canIncrement',
            'docs': [
              'can_increment'
            ],
            'type': 'u8'
          },
          {
            'name': 'canDecrement',
            'docs': [
              'can_decrement'
            ],
            'type': 'u8'
          },
          {
            'name': 'canSpend',
            'docs': [
              'can_spend'
            ],
            'type': 'u8'
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'userPointsAccount',
      'docs': [
        'PDA of an User for each specific type of Points'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'owner',
            'docs': [
              'owner'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'docs': [
              'point_category'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'earnedPoints',
            'docs': [
              'earned_points'
            ],
            'type': 'u64'
          },
          {
            'name': 'spentPoints',
            'docs': [
              'spent_points'
            ],
            'type': 'u64'
          },
          {
            'name': 'level',
            'docs': [
              'level'
            ],
            'type': 'u16'
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'RegisterPointCategoryAccountInput',
      'docs': [
        'Struct for data input to Update Moon'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'namespace',
            'docs': [
              'namespace'
            ],
            'type': {
              'array': [
                'u8',
                32
              ]
            }
          },
          {
            'name': 'tokenRequired',
            'docs': [
              'token_required'
            ],
            'type': 'bool'
          },
          {
            'name': 'tokenQty',
            'docs': [
              'token_qty'
            ],
            'type': {
              'option': 'u64'
            }
          },
          {
            'name': 'pointLimit',
            'docs': [
              'point_limit'
            ],
            'type': 'u64'
          },
          {
            'name': 'isSpendable',
            'docs': [
              'is_spendable'
            ],
            'type': 'bool'
          },
          {
            'name': 'transferTokensToVault',
            'docs': [
              'transfer_tokens_to_vault'
            ],
            'type': 'bool'
          }
        ]
      }
    },
    {
      'name': 'UpdatePointCategoryAccountInput',
      'docs': [
        'Struct for data input to Update Moon'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'pointLimit',
            'docs': [
              'point_limit'
            ],
            'type': {
              'option': 'u64'
            }
          },
          {
            'name': 'tokenQty',
            'docs': [
              'token_qty'
            ],
            'type': {
              'option': 'u64'
            }
          },
          {
            'name': 'tokenRequired',
            'docs': [
              'token_required'
            ],
            'type': {
              'option': 'bool'
            }
          },
          {
            'name': 'transferTokensToVault',
            'docs': [
              'transfer_tokens_to_vault'
            ],
            'type': {
              'option': 'bool'
            }
          },
          {
            'name': 'isSpendable',
            'docs': [
              'is_spendable'
            ],
            'type': {
              'option': 'bool'
            }
          },
          {
            'name': 'resetLevels',
            'docs': [
              'if true, the levels will be reset'
            ],
            'type': {
              'option': 'bool'
            }
          }
        ]
      }
    }
  ],
  'events': [
    {
      'name': 'CreatePointCategoryAccount',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'namespace',
          'type': {
            'array': [
              'u8',
              32
            ]
          },
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'transferTokensToVault',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenVault',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'createdAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'RemovePointCategoryAccount',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'transferTokensToVault',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenVault',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'deletedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'UpdatePointCategoryAccount',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'transferTokensToVault',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenVault',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'updatedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'AddPointCategoryAccountLevelEvent',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'newLevel',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'updatedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'CreateUserPointAccountEvent',
      'fields': [
        {
          'name': 'userPointsAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'owner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'earnedPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'spentPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'createdAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'CreatePointModifier',
      'fields': [
        {
          'name': 'pointsModifierAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'modifier',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'canIncrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'canSpend',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'createdAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'RemovePointModifier',
      'fields': [
        {
          'name': 'pointsModifierAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'modifier',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'canIncrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'deletedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ModifyPointEvent',
      'fields': [
        {
          'name': 'modifier',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointsCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'userPointsAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointsModifierAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'oldEarnedPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'newEarnedPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'userLevel',
          'type': {
            'option': 'u16'
          },
          'index': false
        },
        {
          'name': 'modifiedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'SpendPointsEvent',
      'fields': [
        {
          'name': 'spender',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointsCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'userPointsAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'spentPointsAmount',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        }
      ]
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'IncorrectAdminAddress',
      'msg': 'Incorrect admin address.'
    },
    {
      'code': 6001,
      'name': 'IncorrectMintAddress',
      'msg': 'Incorrect mint address.'
    },
    {
      'code': 6002,
      'name': 'IncorrectTokenAddress',
      'msg': 'Incorrect token address.'
    },
    {
      'code': 6003,
      'name': 'IncorrectModifierAddress',
      'msg': 'Incorrect modifier address.'
    },
    {
      'code': 6004,
      'name': 'IncorrectPointCategoryAddress',
      'msg': 'Incorrect owner address.'
    },
    {
      'code': 6005,
      'name': 'IncorrectOwner',
      'msg': 'Incorrect Point Category.'
    },
    {
      'code': 6006,
      'name': 'IncrementNotAllowed',
      'msg': 'Not allowed to increment Points.'
    },
    {
      'code': 6007,
      'name': 'DecrementNotAllowed',
      'msg': 'Not allowed to decrement Points.'
    },
    {
      'code': 6008,
      'name': 'InsufficientTokenToBurn',
      'msg': 'Insufficient token licenses to burn.'
    },
    {
      'code': 6009,
      'name': 'LicenseRequired',
      'msg': 'License required to this category of Points.'
    },
    {
      'code': 6010,
      'name': 'LicenseNotRequired',
      'msg': 'License NOT required to this category of Points.'
    },
    {
      'code': 6011,
      'name': 'TokenMintRequired',
      'msg': 'Token Mint account is required.'
    },
    {
      'code': 6012,
      'name': 'TokenVaultRequired',
      'msg': 'Token Vault account is required.'
    },
    {
      'code': 6013,
      'name': 'NotAllowedPointsQuantity',
      'msg': 'Points above permitted limit.'
    },
    {
      'code': 6014,
      'name': 'NotEnoughPoints',
      'msg': 'Not enough points.'
    },
    {
      'code': 6015,
      'name': 'SpendingNotAllowed',
      'msg': 'Points modifier not allowed to spend points.'
    },
    {
      'code': 6016,
      'name': 'TokenQuantityExpected',
      'msg': 'The token quantity must be provided.'
    },
    {
      'code': 6017,
      'name': 'NumericOverflow',
      'msg': 'Numeric overflow.'
    },
    {
      'code': 6018,
      'name': 'InvalidLevel',
      'msg': 'Invalid Level.'
    },
    {
      'code': 6019,
      'name': 'PointLevelAmountTooLow',
      'msg': 'Point level amount too low.'
    },
    {
      'code': 6020,
      'name': 'PointLevelAmountTooHigh',
      'msg': 'Point level amount too high.'
    },
    {
      'code': 6021,
      'name': 'PointLevelRequired',
      'msg': 'The Point Level is required.'
    },
    {
      'code': 6022,
      'name': 'InvalidIndex',
      'msg': 'The Index is invalid.'
    }
  ]
};

export const PointsIDL: Points = {
  'version': '0.1.0',
  'name': 'points',
  'instructions': [
    {
      'name': 'initializeDomain',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity calling this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [DomainAccount] account'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'namespace',
          'type': {
            'array': [
              'u8',
              32
            ]
          }
        }
      ]
    },
    {
      'name': 'deregisterDomain',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'registerPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'input',
          'type': {
            'defined': 'RegisterPointCategoryAccountInput'
          }
        }
      ]
    },
    {
      'name': 'deregisterPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'updatePointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'input',
          'type': {
            'defined': 'UpdatePointCategoryAccountInput'
          }
        }
      ]
    },
    {
      'name': 'addPointCategoryAccountLevel',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'newLevel',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'createUserPointAccount',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that called this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System Program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'createUserPointAccountWithLicense',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that called this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user'
              }
            ]
          }
        },
        {
          'name': 'userTokenAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The User token account for the license to burn'
          ]
        },
        {
          'name': 'licenseMintAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The mint address for the license to burn'
          ]
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana Token Program'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System Program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'registerPointModifier',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Points Modifier address'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'canIncrement',
          'type': 'bool'
        },
        {
          'name': 'canDecrement',
          'type': {
            'option': 'bool'
          }
        },
        {
          'name': 'canSpend',
          'type': {
            'option': 'bool'
          }
        }
      ]
    },
    {
      'name': 'deregisterPointModifier',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'the [DomainAccount] account'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Points Modifier address'
          ]
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': []
    },
    {
      'name': 'incrementPoints',
      'accounts': [
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user_points_account'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'pointsAmount',
          'type': 'u64'
        },
        {
          'name': 'newUserLevel',
          'type': {
            'option': 'u16'
          }
        }
      ]
    },
    {
      'name': 'decrementPoints',
      'accounts': [
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity that calls this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user_points_account'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'modifier'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The Solana System program'
          ]
        }
      ],
      'args': [
        {
          'name': 'pointsAmount',
          'type': 'u64'
        },
        {
          'name': 'newUserLevel',
          'type': {
            'option': 'u16'
          }
        }
      ]
    },
    {
      'name': 'spendPoints',
      'accounts': [
        {
          'name': 'spender',
          'isMut': false,
          'isSigner': true,
          'docs': [
            'The entity calling this instruction'
          ]
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointCategoryAccount]'
          ]
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
          'docs': [
            'The [UserPointsAccount]'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'UserPointsAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'user_points_account'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
          'docs': [
            'The [PointsModifier] account'
          ],
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointModifier'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'path': 'spender'
              }
            ]
          }
        }
      ],
      'args': [
        {
          'name': 'pointsAmount',
          'type': 'u64'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'domainAccount',
      'docs': [
        'PDA holding the class of points and the account with admin privileges for this point type'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'admin',
            'docs': [
              'admin'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'namespace',
            'docs': [
              'the name space'
            ],
            'type': {
              'array': [
                'u8',
                32
              ]
            }
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pointCategoryAccount',
      'docs': [
        'PDA for each specific type of Points'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'domain',
            'docs': [
              'the domain'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'tokenRequired',
            'docs': [
              'if this is true then token_mint should be a mint address'
            ],
            'type': 'u8'
          },
          {
            'name': 'tokenMint',
            'docs': [
              'the token mint'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'tokenQty',
            'docs': [
              'the token qty'
            ],
            'type': 'u64'
          },
          {
            'name': 'transferTokensToVault',
            'docs': [
              'if this is true then token_vault should be a token address'
            ],
            'type': 'u8'
          },
          {
            'name': 'tokenVault',
            'docs': [
              'the token vault'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'pointLimit',
            'docs': [
              'point limit'
            ],
            'type': 'u64'
          },
          {
            'name': 'isSpendable',
            'docs': [
              'is spendable?'
            ],
            'type': 'u8'
          },
          {
            'name': 'numLevels',
            'docs': [
              'the number of levels'
            ],
            'type': 'u16'
          },
          {
            'name': 'namespace',
            'docs': [
              'the namespace'
            ],
            'type': {
              'array': [
                'u8',
                32
              ]
            }
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pointsModifier',
      'docs': [
        'PDA containing one account that can modify an Points type'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'modifier',
            'docs': [
              'modifier'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'docs': [
              'point_category'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'canIncrement',
            'docs': [
              'can_increment'
            ],
            'type': 'u8'
          },
          {
            'name': 'canDecrement',
            'docs': [
              'can_decrement'
            ],
            'type': 'u8'
          },
          {
            'name': 'canSpend',
            'docs': [
              'can_spend'
            ],
            'type': 'u8'
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'userPointsAccount',
      'docs': [
        'PDA of an User for each specific type of Points'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'version',
            'docs': [
              'The data version of this account.'
            ],
            'type': 'u8'
          },
          {
            'name': 'owner',
            'docs': [
              'owner'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'docs': [
              'point_category'
            ],
            'type': 'publicKey'
          },
          {
            'name': 'earnedPoints',
            'docs': [
              'earned_points'
            ],
            'type': 'u64'
          },
          {
            'name': 'spentPoints',
            'docs': [
              'spent_points'
            ],
            'type': 'u64'
          },
          {
            'name': 'level',
            'docs': [
              'level'
            ],
            'type': 'u16'
          },
          {
            'name': 'bump',
            'docs': [
              'PDA bump'
            ],
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'RegisterPointCategoryAccountInput',
      'docs': [
        'Struct for data input to Update Moon'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'namespace',
            'docs': [
              'namespace'
            ],
            'type': {
              'array': [
                'u8',
                32
              ]
            }
          },
          {
            'name': 'tokenRequired',
            'docs': [
              'token_required'
            ],
            'type': 'bool'
          },
          {
            'name': 'tokenQty',
            'docs': [
              'token_qty'
            ],
            'type': {
              'option': 'u64'
            }
          },
          {
            'name': 'pointLimit',
            'docs': [
              'point_limit'
            ],
            'type': 'u64'
          },
          {
            'name': 'isSpendable',
            'docs': [
              'is_spendable'
            ],
            'type': 'bool'
          },
          {
            'name': 'transferTokensToVault',
            'docs': [
              'transfer_tokens_to_vault'
            ],
            'type': 'bool'
          }
        ]
      }
    },
    {
      'name': 'UpdatePointCategoryAccountInput',
      'docs': [
        'Struct for data input to Update Moon'
      ],
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'pointLimit',
            'docs': [
              'point_limit'
            ],
            'type': {
              'option': 'u64'
            }
          },
          {
            'name': 'tokenQty',
            'docs': [
              'token_qty'
            ],
            'type': {
              'option': 'u64'
            }
          },
          {
            'name': 'tokenRequired',
            'docs': [
              'token_required'
            ],
            'type': {
              'option': 'bool'
            }
          },
          {
            'name': 'transferTokensToVault',
            'docs': [
              'transfer_tokens_to_vault'
            ],
            'type': {
              'option': 'bool'
            }
          },
          {
            'name': 'isSpendable',
            'docs': [
              'is_spendable'
            ],
            'type': {
              'option': 'bool'
            }
          },
          {
            'name': 'resetLevels',
            'docs': [
              'if true, the levels will be reset'
            ],
            'type': {
              'option': 'bool'
            }
          }
        ]
      }
    }
  ],
  'events': [
    {
      'name': 'CreatePointCategoryAccount',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'namespace',
          'type': {
            'array': [
              'u8',
              32
            ]
          },
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'transferTokensToVault',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenVault',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'createdAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'RemovePointCategoryAccount',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'transferTokensToVault',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenVault',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'deletedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'UpdatePointCategoryAccount',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'transferTokensToVault',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'tokenVault',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'updatedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'AddPointCategoryAccountLevelEvent',
      'fields': [
        {
          'name': 'domain',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'newLevel',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'updatedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'CreateUserPointAccountEvent',
      'fields': [
        {
          'name': 'userPointsAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'owner',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'earnedPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'spentPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'createdAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'CreatePointModifier',
      'fields': [
        {
          'name': 'pointsModifierAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'modifier',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'canIncrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'canSpend',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'createdAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'RemovePointModifier',
      'fields': [
        {
          'name': 'pointsModifierAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'modifier',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'canIncrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'u8',
          'index': false
        },
        {
          'name': 'deletedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'ModifyPointEvent',
      'fields': [
        {
          'name': 'modifier',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointsCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'userPointsAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointsModifierAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'oldEarnedPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'newEarnedPoints',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'userLevel',
          'type': {
            'option': 'u16'
          },
          'index': false
        },
        {
          'name': 'modifiedAt',
          'type': 'i64',
          'index': false
        }
      ]
    },
    {
      'name': 'SpendPointsEvent',
      'fields': [
        {
          'name': 'spender',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'pointsCategory',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'userPointsAccount',
          'type': 'publicKey',
          'index': false
        },
        {
          'name': 'spentPointsAmount',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'timestamp',
          'type': 'i64',
          'index': false
        }
      ]
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'IncorrectAdminAddress',
      'msg': 'Incorrect admin address.'
    },
    {
      'code': 6001,
      'name': 'IncorrectMintAddress',
      'msg': 'Incorrect mint address.'
    },
    {
      'code': 6002,
      'name': 'IncorrectTokenAddress',
      'msg': 'Incorrect token address.'
    },
    {
      'code': 6003,
      'name': 'IncorrectModifierAddress',
      'msg': 'Incorrect modifier address.'
    },
    {
      'code': 6004,
      'name': 'IncorrectPointCategoryAddress',
      'msg': 'Incorrect owner address.'
    },
    {
      'code': 6005,
      'name': 'IncorrectOwner',
      'msg': 'Incorrect Point Category.'
    },
    {
      'code': 6006,
      'name': 'IncrementNotAllowed',
      'msg': 'Not allowed to increment Points.'
    },
    {
      'code': 6007,
      'name': 'DecrementNotAllowed',
      'msg': 'Not allowed to decrement Points.'
    },
    {
      'code': 6008,
      'name': 'InsufficientTokenToBurn',
      'msg': 'Insufficient token licenses to burn.'
    },
    {
      'code': 6009,
      'name': 'LicenseRequired',
      'msg': 'License required to this category of Points.'
    },
    {
      'code': 6010,
      'name': 'LicenseNotRequired',
      'msg': 'License NOT required to this category of Points.'
    },
    {
      'code': 6011,
      'name': 'TokenMintRequired',
      'msg': 'Token Mint account is required.'
    },
    {
      'code': 6012,
      'name': 'TokenVaultRequired',
      'msg': 'Token Vault account is required.'
    },
    {
      'code': 6013,
      'name': 'NotAllowedPointsQuantity',
      'msg': 'Points above permitted limit.'
    },
    {
      'code': 6014,
      'name': 'NotEnoughPoints',
      'msg': 'Not enough points.'
    },
    {
      'code': 6015,
      'name': 'SpendingNotAllowed',
      'msg': 'Points modifier not allowed to spend points.'
    },
    {
      'code': 6016,
      'name': 'TokenQuantityExpected',
      'msg': 'The token quantity must be provided.'
    },
    {
      'code': 6017,
      'name': 'NumericOverflow',
      'msg': 'Numeric overflow.'
    },
    {
      'code': 6018,
      'name': 'InvalidLevel',
      'msg': 'Invalid Level.'
    },
    {
      'code': 6019,
      'name': 'PointLevelAmountTooLow',
      'msg': 'Point level amount too low.'
    },
    {
      'code': 6020,
      'name': 'PointLevelAmountTooHigh',
      'msg': 'Point level amount too high.'
    },
    {
      'code': 6021,
      'name': 'PointLevelRequired',
      'msg': 'The Point Level is required.'
    },
    {
      'code': 6022,
      'name': 'InvalidIndex',
      'msg': 'The Index is invalid.'
    }
  ]
};

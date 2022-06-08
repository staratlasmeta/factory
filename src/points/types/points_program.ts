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
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'arg',
                'type': 'string',
                'path': 'name'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'name',
          'type': 'string'
        }
      ]
    },
    {
      'name': 'registerPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'arg',
                'type': 'string',
                'path': 'label'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'label',
          'type': 'string'
        },
        {
          'name': 'tokenRequired',
          'type': 'bool'
        },
        {
          'name': 'tokenQty',
          'type': {
            'option': 'u64'
          }
        },
        {
          'name': 'pointLimit',
          'type': 'u64'
        },
        {
          'name': 'isSpendable',
          'type': 'bool'
        },
        {
          'name': 'lvlRequiredPoints',
          'type': {
            'option': {
              'array': [
                'u64',
                20
              ]
            }
          }
        }
      ]
    },
    {
      'name': 'deregisterPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
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
      'name': 'updatePointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'pointLimit',
          'type': {
            'option': 'u64'
          }
        },
        {
          'name': 'tokenQty',
          'type': {
            'option': 'u64'
          }
        },
        {
          'name': 'tokenRequired',
          'type': {
            'option': 'bool'
          }
        }
      ]
    },
    {
      'name': 'createUserPointAccount',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isSigner': false
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
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isSigner': false
        },
        {
          'name': 'licenseMintAccount',
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
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
      'name': 'modifyPoints',
      'accounts': [
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'UserPointsAccount',
                'path': 'user_points_account.owner'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'newXpValue',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'spendPoints',
      'accounts': [
        {
          'name': 'spender',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'UserPointsAccount',
                'path': 'user_points_account.owner'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'admin',
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
      'name': 'pointCategoryAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'domain',
            'type': 'publicKey'
          },
          {
            'name': 'label',
            'type': 'string'
          },
          {
            'name': 'tokenRequired',
            'type': 'bool'
          },
          {
            'name': 'tokenMint',
            'type': {
              'option': 'publicKey'
            }
          },
          {
            'name': 'tokenQty',
            'type': 'u64'
          },
          {
            'name': 'pointLimit',
            'type': 'u64'
          },
          {
            'name': 'isSpendable',
            'type': 'bool'
          },
          {
            'name': 'lvlRequiredPoints',
            'type': {
              'array': [
                'u64',
                20
              ]
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pointsModifier',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'modifier',
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'type': 'publicKey'
          },
          {
            'name': 'canIncrement',
            'type': 'bool'
          },
          {
            'name': 'canDecrement',
            'type': 'bool'
          },
          {
            'name': 'canSpend',
            'type': 'bool'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'userPointsAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'type': 'publicKey'
          },
          {
            'name': 'earnedPoints',
            'type': 'u64'
          },
          {
            'name': 'spentPoints',
            'type': 'u64'
          },
          {
            'name': 'level',
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
          'name': 'label',
          'type': 'string',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': {
            'option': 'publicKey'
          },
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'bool',
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
          'name': 'label',
          'type': 'string',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': {
            'option': 'publicKey'
          },
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'bool',
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
          'name': 'label',
          'type': 'string',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': {
            'option': 'publicKey'
          },
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'bool',
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
          'type': 'bool',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'canSpend',
          'type': 'bool',
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
          'type': 'bool',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'bool',
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
          'name': 'spendedPointsAmount',
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
      'name': 'IncorrectModifierAddress',
      'msg': 'Incorrect modifier address.'
    },
    {
      'code': 6003,
      'name': 'IncorrectPointCategoryAddress',
      'msg': 'Incorrect owner address.'
    },
    {
      'code': 6004,
      'name': 'IncorrectOwner',
      'msg': 'Incorrect Point Category.'
    },
    {
      'code': 6005,
      'name': 'IncrementNotAllowed',
      'msg': 'Not allowed to increment Points.'
    },
    {
      'code': 6006,
      'name': 'DecrementNotAllowed',
      'msg': 'Not allowed to decrement Points.'
    },
    {
      'code': 6007,
      'name': 'InsufficientTokenToBurn',
      'msg': 'Insufficient token licenses to burn.'
    },
    {
      'code': 6008,
      'name': 'LicenseRequired',
      'msg': 'License required to this category of Points.'
    },
    {
      'code': 6009,
      'name': 'LicenseNotRequired',
      'msg': 'License NOT required to this category of Points.'
    },
    {
      'code': 6010,
      'name': 'TokenMintRequired',
      'msg': 'Token Mint account is required.'
    },
    {
      'code': 6011,
      'name': 'NotAllowedExperienceQuantity',
      'msg': 'Experience above permitted limit.'
    },
    {
      'code': 6012,
      'name': 'LabelTooLong',
      'msg': 'Label string above max length.'
    },
    {
      'code': 6013,
      'name': 'SpendingNotAllowed',
      'msg': 'Points modifier not allowed to spend points.'
    },
    {
      'code': 6014,
      'name': 'TokenQuantityExpected',
      'msg': 'The token quantity must be provided.'
    }
  ]
};

export const IDL: Points = {
  'version': '0.1.0',
  'name': 'points',
  'instructions': [
    {
      'name': 'initializeDomain',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'arg',
                'type': 'string',
                'path': 'name'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'name',
          'type': 'string'
        }
      ]
    },
    {
      'name': 'registerPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'arg',
                'type': 'string',
                'path': 'label'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'label',
          'type': 'string'
        },
        {
          'name': 'tokenRequired',
          'type': 'bool'
        },
        {
          'name': 'tokenQty',
          'type': {
            'option': 'u64'
          }
        },
        {
          'name': 'pointLimit',
          'type': 'u64'
        },
        {
          'name': 'isSpendable',
          'type': 'bool'
        },
        {
          'name': 'lvlRequiredPoints',
          'type': {
            'option': {
              'array': [
                'u64',
                20
              ]
            }
          }
        }
      ]
    },
    {
      'name': 'deregisterPointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': true,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
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
      'name': 'updatePointCategoryAccount',
      'accounts': [
        {
          'name': 'admin',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'pointLimit',
          'type': {
            'option': 'u64'
          }
        },
        {
          'name': 'tokenQty',
          'type': {
            'option': 'u64'
          }
        },
        {
          'name': 'tokenRequired',
          'type': {
            'option': 'bool'
          }
        }
      ]
    },
    {
      'name': 'createUserPointAccount',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isSigner': false
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
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isSigner': false
        },
        {
          'name': 'licenseMintAccount',
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
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'domainAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointsDomain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'DomainAccount',
                'path': 'domain_account.name'
              }
            ]
          }
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'DomainAccount',
                'path': 'domain_account'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
      'name': 'modifyPoints',
      'accounts': [
        {
          'name': 'modifier',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'UserPointsAccount',
                'path': 'user_points_account.owner'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'newXpValue',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'spendPoints',
      'accounts': [
        {
          'name': 'spender',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'pointCategoryAccount',
          'isMut': false,
          'isSigner': false,
          'pda': {
            'seeds': [
              {
                'kind': 'const',
                'type': 'string',
                'value': 'PointCategoryAccount'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.domain'
              },
              {
                'kind': 'account',
                'type': 'string',
                'account': 'PointCategoryAccount',
                'path': 'point_category_account.label'
              }
            ]
          }
        },
        {
          'name': 'userPointsAccount',
          'isMut': true,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
                'path': 'point_category_account'
              },
              {
                'kind': 'account',
                'type': 'publicKey',
                'account': 'UserPointsAccount',
                'path': 'user_points_account.owner'
              }
            ]
          }
        },
        {
          'name': 'pointsModifierAccount',
          'isMut': false,
          'isSigner': false,
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
                'account': 'PointCategoryAccount',
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
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'admin',
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
      'name': 'pointCategoryAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'domain',
            'type': 'publicKey'
          },
          {
            'name': 'label',
            'type': 'string'
          },
          {
            'name': 'tokenRequired',
            'type': 'bool'
          },
          {
            'name': 'tokenMint',
            'type': {
              'option': 'publicKey'
            }
          },
          {
            'name': 'tokenQty',
            'type': 'u64'
          },
          {
            'name': 'pointLimit',
            'type': 'u64'
          },
          {
            'name': 'isSpendable',
            'type': 'bool'
          },
          {
            'name': 'lvlRequiredPoints',
            'type': {
              'array': [
                'u64',
                20
              ]
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pointsModifier',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'modifier',
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'type': 'publicKey'
          },
          {
            'name': 'canIncrement',
            'type': 'bool'
          },
          {
            'name': 'canDecrement',
            'type': 'bool'
          },
          {
            'name': 'canSpend',
            'type': 'bool'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'userPointsAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'pointCategory',
            'type': 'publicKey'
          },
          {
            'name': 'earnedPoints',
            'type': 'u64'
          },
          {
            'name': 'spentPoints',
            'type': 'u64'
          },
          {
            'name': 'level',
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
          'name': 'label',
          'type': 'string',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': {
            'option': 'publicKey'
          },
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'bool',
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
          'name': 'label',
          'type': 'string',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': {
            'option': 'publicKey'
          },
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'bool',
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
          'name': 'label',
          'type': 'string',
          'index': false
        },
        {
          'name': 'tokenRequired',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'tokenMint',
          'type': {
            'option': 'publicKey'
          },
          'index': false
        },
        {
          'name': 'tokenQty',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'pointLimit',
          'type': 'u64',
          'index': false
        },
        {
          'name': 'isSpendable',
          'type': 'bool',
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
          'type': 'bool',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'bool',
          'index': false
        },
        {
          'name': 'canSpend',
          'type': 'bool',
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
          'type': 'bool',
          'index': false
        },
        {
          'name': 'canDecrement',
          'type': 'bool',
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
          'name': 'spendedPointsAmount',
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
      'name': 'IncorrectModifierAddress',
      'msg': 'Incorrect modifier address.'
    },
    {
      'code': 6003,
      'name': 'IncorrectPointCategoryAddress',
      'msg': 'Incorrect owner address.'
    },
    {
      'code': 6004,
      'name': 'IncorrectOwner',
      'msg': 'Incorrect Point Category.'
    },
    {
      'code': 6005,
      'name': 'IncrementNotAllowed',
      'msg': 'Not allowed to increment Points.'
    },
    {
      'code': 6006,
      'name': 'DecrementNotAllowed',
      'msg': 'Not allowed to decrement Points.'
    },
    {
      'code': 6007,
      'name': 'InsufficientTokenToBurn',
      'msg': 'Insufficient token licenses to burn.'
    },
    {
      'code': 6008,
      'name': 'LicenseRequired',
      'msg': 'License required to this category of Points.'
    },
    {
      'code': 6009,
      'name': 'LicenseNotRequired',
      'msg': 'License NOT required to this category of Points.'
    },
    {
      'code': 6010,
      'name': 'TokenMintRequired',
      'msg': 'Token Mint account is required.'
    },
    {
      'code': 6011,
      'name': 'NotAllowedExperienceQuantity',
      'msg': 'Experience above permitted limit.'
    },
    {
      'code': 6012,
      'name': 'LabelTooLong',
      'msg': 'Label string above max length.'
    },
    {
      'code': 6013,
      'name': 'SpendingNotAllowed',
      'msg': 'Points modifier not allowed to spend points.'
    },
    {
      'code': 6014,
      'name': 'TokenQuantityExpected',
      'msg': 'The token quantity must be provided.'
    }
  ]
};

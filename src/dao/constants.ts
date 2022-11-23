import { PublicKey } from '@solana/web3.js';

export const DAO_MAINNET_PROGRAM_ADDRESSES = {
  ProxyRewarder: new PublicKey('gateVwTnKyFrE8nxUUgfzoZTPKgJQZUbLsEidpG4Dp2'),
  LockedVoter: new PublicKey('Lock7kBijGCQLEFAmXcengzXKA88iDNQPriQ7TbgeyG'),
  Snapshots: new PublicKey('snapNQkxsiqDWdbNfz8KVB7e3NPzLwtHHA6WV8kKgUc'),
};

export const DAO_MAINNET_ACCOUNT_ADDRESSES = {
  REGISTERED_LOCKER: new PublicKey(
    'EAgUhz4LG8fqtrShFo1NDrvEiNPxEi7kHe96D76NzkAj'
  ),
  LOCKER: new PublicKey('5WmM9c9WE71y78Ah8Bp8vgyoStscM1ZZyaaFqRf8b2Qa'),
};

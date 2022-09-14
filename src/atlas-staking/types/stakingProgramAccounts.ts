import { web3 } from '@project-serum/anchor';
import type { AnchorTypes } from '@saberhq/anchor-contrib';

import * as STAKING_TYPES from './stakingIdl';

export type STAKING_PROGRAM = STAKING_TYPES.Staking;
export type StakingTypes = AnchorTypes<STAKING_PROGRAM>;
type Accounts = StakingTypes['Accounts'];
export type RegisteredStakeAccountInfo = Accounts['RegisteredStake'];
export type StakingAccountInfo = Accounts['StakingAccount'];
export type StakingVarsAccountInfo = Accounts['StakingVars'];

export interface StakingAccountItem {
    publicKey: web3.PublicKey;
    account: StakingAccountInfo;
}

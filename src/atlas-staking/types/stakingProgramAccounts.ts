import {
    BN,
    web3,
} from '@project-serum/anchor';
import type { AnchorTypes } from '@saberhq/anchor-contrib';

import * as STAKING_TYPES from './stakingIdl';

export type STAKING_PROGRAM = STAKING_TYPES.Staking;
export type StakingTypes = AnchorTypes<STAKING_PROGRAM>;
type Accounts = StakingTypes['Accounts'];
export type RegisteredStakeAccountInfo = Accounts['RegisteredStake'];


// export interface RegisteredStakeAccountInfo {
//     authority: web3.PublicKey,
//     stakeMint: web3.PublicKey,
//     rewardMint: web3.PublicKey,
//     rewardMultiplier: BN,
//     cooldownPeriod: BN,
// }

export interface StakingAccountInfo {
    owner: web3.PublicKey,
    registeredStake: web3.PublicKey,
    totalStake: BN,
    activeStake: BN,
    pendingRewards: BN,
    paidRewards: BN,
    stakedAt: BN,
    lastClaimedAt: BN,
    isCoolingDown: boolean,
    unstakedAt: BN,
}

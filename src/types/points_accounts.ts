import { PublicKey } from '@solana/web3.js';
import { IDL as PROGRAM_IDL } from './points_program';
import type { AnchorTypes } from '@saberhq/anchor-contrib';

export type XpTypes = AnchorTypes<typeof PROGRAM_IDL>;
type Accounts = XpTypes['Accounts'];

export type UserPointsAccount = Accounts['userPointsAccount'];
export type PointCategoryAccount = Accounts['pointCategoryAccount'];
export type PointsModifier = Accounts['pointsModifier'];
export type DomainAccount = Accounts['domainAccount'];

export interface UserPointsAccountItem {
  publicKey: PublicKey;
  account: UserPointsAccount;
}

export interface PointsModifierItem {
  publicKey: PublicKey;
  account: PointsModifier;
}

export interface PointCategoryAccountItem {
  publicKey: PublicKey;
  account: PointCategoryAccount;
}

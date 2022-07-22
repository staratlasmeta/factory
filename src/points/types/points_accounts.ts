import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { PointsIDL as PROGRAM_IDL } from './points_program';
import type { AnchorTypes } from '../../anchor/types';

export type XpTypes = AnchorTypes<typeof PROGRAM_IDL>;
type Accounts = XpTypes['Accounts'];

export type UserPointsAccount = Accounts['userPointsAccount'];
export type BasePointCategoryAccount = Accounts['pointCategoryAccount'];
export type PointsModifier = Accounts['pointsModifier'];
export type BaseDomainAccount = Accounts['domainAccount'];

export interface PointCategoryAccount extends BasePointCategoryAccount {
  prettyNamespace: string;
  levels: BN[];
}

export interface DomainAccount extends BaseDomainAccount {
  prettyNamespace: string;
}

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

type Events = XpTypes['Events'];
export type CreatePointCategoryAccountEvent = Events['CreatePointCategoryAccount']['data'];
export type RemovePointCategoryAccountEvent = Events['RemovePointCategoryAccount']['data'];
export type UpdatePointCategoryAccountEvent = Events['UpdatePointCategoryAccount']['data'];
export type CreateUserPointAccountEvent = Events['CreateUserPointAccountEvent']['data'];
export type CreatePointModifierEvent = Events['CreatePointModifier']['data'];
export type RemovePointModifierEvent = Events['RemovePointModifier']['data'];
export type ModifyPointEvent = Events['ModifyPointEvent']['data'];
export type SpendPointsEvent = Events['SpendPointsEvent']['data'];
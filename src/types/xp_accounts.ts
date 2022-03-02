import { PublicKey } from '@solana/web3.js';
import { IDL as PROGRAM_IDL } from './xp_program';
import type { AnchorTypes } from '@saberhq/anchor-contrib';

export type XpTypes = AnchorTypes<typeof PROGRAM_IDL>;
type Accounts = XpTypes['Accounts'];

export type UserXpAccount = Accounts['userXpAccount'];
export type XpAccount = Accounts['xpAccount'];
export type XpModifier = Accounts['xpModifier'];
export type XpVars = Accounts['xpVars'];

export interface UserXpAccountItem {
  publicKey: PublicKey;
  account: UserXpAccount;
}

export interface XpModifierItem {
  publicKey: PublicKey;
  account: XpModifier;
}

export interface XpAccountItem {
  publicKey: PublicKey;
  account: XpAccount;
}

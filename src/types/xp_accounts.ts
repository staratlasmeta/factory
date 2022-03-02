import type { AnchorTypes } from '@saberhq/anchor-contrib';
import { IDL as PROGRAM_IDL } from './xp_program';

export type XpTypes = AnchorTypes<typeof PROGRAM_IDL>;
type Accounts = XpTypes['Accounts'];

export type UserXpAccount = Accounts['userXpAccount'];
export type XpAccount = Accounts['xpAccount'];
export type XpModifier = Accounts['xpModifier'];
export type XpVars = Accounts['xpVars'];

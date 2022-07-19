import { IDL as PROGRAM_IDL } from './program';
import type { AnchorTypes } from '../../anchor/types';

export type PointsStoreTypes = AnchorTypes<typeof PROGRAM_IDL>;
type Accounts = PointsStoreTypes['Accounts'];

export type PointsStoreAccount = Accounts['pointsStore'];

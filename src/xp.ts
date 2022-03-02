import { PublicKey } from '@solana/web3.js';

const XP_VARS_GLOBAL_SEED = Buffer.from('XPVarsGlobal');
const XP_ACCOUNT_SEED = Buffer.from('XP_Account');
const XP_MODIFIER_SEED = Buffer.from('XP_Modifier');
const USER_XP_SEED = Buffer.from('UserXP');

export const findXpVarsAccount = async (
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([XP_VARS_GLOBAL_SEED], programId);
};

export const findXpAccount = async (
  label: string,
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [XP_ACCOUNT_SEED, Buffer.from(label)],
    programId
  );
};

export const findUserXpAccount = async (
  xpAccountKey: PublicKey,
  userAccountKey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [USER_XP_SEED, xpAccountKey.toBuffer(), userAccountKey.toBuffer()],
    programId
  );
};

export const findXpModifierAccount = async (
  xpAccountKey: PublicKey,
  modifierKey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [XP_MODIFIER_SEED, xpAccountKey.toBuffer(), modifierKey.toBuffer()],
    programId
  );
};

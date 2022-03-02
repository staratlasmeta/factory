import { PublicKey } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';
import type { Xp } from './types/xp_program';

const XP_VARS_GLOBAL_SEED = Buffer.from('XPVarsGlobal');
const XP_ACCOUNT_SEED = Buffer.from('XP_Account');
const XP_MODIFIER_SEED = Buffer.from('XP_Modifier');
const USER_XP_SEED = Buffer.from('UserXP');

/**
 * Returns the public key and bump seed for the Xp Vars Account
 *
 * @param programId - deployed program ID for XP program
 * @returns [Xp Vars account public key, bump seed]
 */
export const findXpVarsAccount = async (
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([XP_VARS_GLOBAL_SEED], programId);
};

/**
 * Returns the public key and bump seed for the Xp Account
 *
 * @param label - XP Account label
 * @param programId - deployed program ID for XP program
 * @returns [Xp Account public key, bump seed]
 */
export const findXpAccount = async (
  label: string,
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [XP_ACCOUNT_SEED, Buffer.from(label)],
    programId
  );
};

/**
 * Returns the public key and bump seed for the User Xp Account
 *
 * @param xpAccountKey - XP Account public key
 * @param userAccountKey - User's Account public key
 * @param programId - deployed program ID for XP program
 * @returns [User Xp Account public key, bump seed]
 */
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

/**
 * Returns the public key and bump seed for the Xp Modifier Account
 *
 * @param xpAccountKey - XP Account public key
 * @param modifierKey - Modifier public key
 * @param programId - deployed program ID for XP program
 * @returns [Xp Modifier Account public key, bump seed]
 */
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

/** Params for Init instruction */
interface InitParams {
  admin: PublicKey /** the admin public key */;
  program: Program<Xp> /** the XP Program */;
}

/**
 * Initialize the XP Vars Account
 * @param param0 
 */
export const initIx = async ({ admin, program }: InitParams) => {
  const [xpVarsAccountKey] = await findXpVarsAccount(program.programId);

  const instructions = [
    program.instruction.processInit({
      accounts: {
        admin,
        xpVarsAccount: xpVarsAccountKey,
        systemProgram: web3.SystemProgram.programId,
      },
    }),
  ];

  return {
    admin,
    xpVarsAccount: xpVarsAccountKey,
    instructions,
  };
};

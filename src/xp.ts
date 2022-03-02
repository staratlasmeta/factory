import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3, BN } from '@project-serum/anchor';
import { IDL } from './types/xp_program';
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

/**
 * Returns the base IDL for the XP program following as generated by Anchor with provided program ID appended to metadata.
 *
 * @param programId - Deployed program ID for the XP program
 * @returns - The base IDL object
 */
export function getXpIDL(programId: web3.PublicKey): unknown {
  const _tmp = IDL;
  _tmp['metadata']['address'] = programId.toBase58();
  return _tmp;
}

/**
 * Get the XP Anchor program
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the XP program
 * @returns the XP anchor program
 */
export const getXpProgram = (
  connection: Connection,
  programId: web3.PublicKey
) => {
  const idl = getXpIDL(programId);
  const provider = new Provider(connection, null, null);
  const program = new Program(<Xp>idl, programId, provider);
  return program;
};

/** Params for Init instruction */
export interface InitXpVarsParams {
  admin: PublicKey /** the admin public key */;
  connection: Connection /** the Solana connection object */;
  programId: web3.PublicKey /** Deployed program ID for the XP program */;
}

/**
 * Initialize the XP Vars Account
 * @param param - the input parameters
 */
export const initXpVarsIx = async ({
  admin,
  connection,
  programId,
}: InitXpVarsParams) => {
  const program = getXpProgram(connection, programId);
  const [xpVarsAccountKey] = await findXpVarsAccount(program.programId);

  const instructions = [
    program.instruction.init({
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

/** Params for Register XP Account instruction */
export interface RegisterXpAccountParams {
  admin: PublicKey /** the admin public key */;
  connection: Connection /** the Solana connection object */;
  label: string /** The XP account label */;
  programId: web3.PublicKey /** Deployed program ID for the XP program */;
}

/**
 * Registers an XP Account
 * @param param - the input parameters
 */
export const registerXpAccountIx = async ({
  admin,
  connection,
  label,
  programId,
}: RegisterXpAccountParams) => {
  const program = getXpProgram(connection, programId);
  const [xpVarsAccountKey] = await findXpVarsAccount(program.programId);
  const [xpAccountKey] = await findXpAccount(label, program.programId);

  const instructions = [
    program.instruction.registerXpAccount(label, {
      accounts: {
        admin,
        xpVarsAccount: xpVarsAccountKey,
        xpAccount: xpAccountKey,
        systemProgram: web3.SystemProgram.programId,
      },
    }),
  ];

  return {
    admin,
    xpVarsAccount: xpVarsAccountKey,
    xpAccount: xpAccountKey,
    instructions,
  };
};

/** Params for Update XP Account instruction */
export interface UpdateXpAccountLimitParams {
  admin: PublicKey /** the admin public key */;
  connection: Connection /** the Solana connection object */;
  xpAccountKey: PublicKey /** the admin public key */;
  xpLimit: BN /** The XP account label */;
  programId: web3.PublicKey /** Deployed program ID for the XP program */;
}

/**
 * Updates an XP Account
 * @param param - the input parameters
 */
export const updateXpAccountLimitIx = async ({
  admin,
  connection,
  xpAccountKey,
  xpLimit,
  programId,
}: UpdateXpAccountLimitParams) => {
  const program = getXpProgram(connection, programId);
  const [xpVarsAccountKey] = await findXpVarsAccount(program.programId);

  const instructions = [
    program.instruction.updateXpLimit(xpLimit, {
      accounts: {
        admin,
        xpVarsAccount: xpVarsAccountKey,
        xpAccount: xpAccountKey,
        systemProgram: web3.SystemProgram.programId,
      },
    }),
  ];

  return {
    admin,
    xpVarsAccount: xpVarsAccountKey,
    xpAccount: xpAccountKey,
    instructions,
  };
};

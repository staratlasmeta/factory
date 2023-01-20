import { BN, web3 } from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';
import { FactoryReturn } from '../../types';
import { getFeeExemptAccount } from '../pda_getters';

/**  Params for Register Currency instruction */
export interface RemoveFeeExemptParams extends BaseParams {
  updateAuthorityAccount: web3.PublicKey;
  funder: web3.PublicKey;
  feeExemptTarget: web3.PublicKey;
}

export interface AddFeeExemptParams extends RemoveFeeExemptParams {
  discount: number;
}

/**
 * Returns an instruction which flags an account as fee exempt. Update authority must match marketVarsAccount.
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of registered update authority
 * @param funder - Who pays for the account initialization
 * @param feeExemptTarget - Target account to exempt from fees
 * @param programId - Deployed program ID for GM program
 */
export async function createAddFeeExemptionInstruction({
  connection,
  updateAuthorityAccount,
  funder,
  feeExemptTarget,
  programId,
}: AddFeeExemptParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });
  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  const FEE_EXEMPTION = 1_000_000;
  const [feeExemptAccount] = await getFeeExemptAccount(
    feeExemptTarget,
    programId
  );
  const instruction = [
    await program.methods
      .addFeeExemption(new BN(FEE_EXEMPTION))
      .accounts({
        updateAuthorityMaster: updateAuthorityAccount,
        funder,
        feeExemptTarget,
        feeExemptAccount,
      })
      .instruction(),
  ];
  ixSet.instructions.push(...instruction);
  return ixSet;
}

/**
 * Returns an instruction which removes fee exemption from an account. Update authority must match marketVarsAccount.
 *
 * @param connection
 * @param updateAuthorityAccount - Public key of registered update authority
 * @param funder - Who pays for the account initialization
 * @param feeExemptTarget - Target account to exempt from fees
 * @param programId - Deployed program ID for GM program
 */
export async function createRemoveFeeExemptionInstruction({
  connection,
  updateAuthorityAccount,
  funder,
  feeExemptTarget,
  programId,
}: RemoveFeeExemptParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });
  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  const [feeExemptAccount] = await getFeeExemptAccount(
    feeExemptTarget,
    programId
  );
  const instruction = [
    await program.methods
      .removeFeeExemption()
      .accounts({
        updateAuthorityMaster: updateAuthorityAccount,
        funder,
        feeExemptAccount,
      })
      .instruction(),
  ];
  ixSet.instructions.push(...instruction);
  return ixSet;
}

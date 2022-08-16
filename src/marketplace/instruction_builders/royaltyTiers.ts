import { BN, web3 } from '@project-serum/anchor';
import { FactoryReturn } from '../../types';
import { getMarketplaceProgram } from '../utils';
import { BaseParams } from './BaseParams';

export interface RoyaltyTierParams extends BaseParams {
  updateAuthorityAccount: web3.PublicKey;
  registeredCurrency: web3.PublicKey;
  stakeAmount: number;
}

export interface UpdateRoyaltyTierParams extends RoyaltyTierParams {
  discount: number;
}

export async function addRoyaltyTier({
  connection,
  updateAuthorityAccount,
  registeredCurrency,
  stakeAmount,
  discount,
  programId,
}: UpdateRoyaltyTierParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });
  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  const ix = await program.methods
    .addRoyaltyTier(new BN(stakeAmount), new BN(discount))
    .accounts({
      updateAuthorityAccount,
      registeredCurrency,
    })
    .instruction();

  ixSet.instructions.push(ix);

  return ixSet;
}

export async function deleteRoyaltyTier({
  connection,
  updateAuthorityAccount,
  registeredCurrency,
  stakeAmount,
  programId,
}: RoyaltyTierParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });
  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  const ix = await program.methods
    .deleteRoyaltyTier(new BN(stakeAmount))
    .accounts({
      updateAuthorityAccount,
      registeredCurrency,
    })
    .instruction();

  ixSet.instructions.push(ix);

  return ixSet;
}

export async function updateRoyaltyTier({
  connection,
  updateAuthorityAccount,
  registeredCurrency,
  stakeAmount,
  discount,
  programId,
}: UpdateRoyaltyTierParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });
  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  const ix = await program.methods
    .updateRoyaltyTier(new BN(stakeAmount), new BN(discount))
    .accounts({
      updateAuthorityAccount,
      registeredCurrency,
    })
    .instruction();

  ixSet.instructions.push(ix);

  return ixSet;
}

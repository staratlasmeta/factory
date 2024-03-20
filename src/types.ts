import { web3 } from '@coral-xyz/anchor';

export type FactoryReturn = {
  signers: web3.Keypair[];
  instructions: web3.TransactionInstruction[];
};

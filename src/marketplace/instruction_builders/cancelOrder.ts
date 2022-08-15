import { web3 } from '@project-serum/anchor';
import { getMarketplaceProgram, getOrderSide } from '../utils';
import { FactoryReturn } from '../../types';
import { BaseParams } from './BaseParams';
import { OrderAccountInfo } from '../types';
import { getTokenAccount } from '../../util';

/**  Params for Register Currency instruction */
export interface CancelOrderParams extends BaseParams {
  orderInitializer: web3.PublicKey;
  orderAccount: web3.PublicKey;
}

/**
 * Returns an instruction which cancels an open order, returns the balance in escrow to the order initializer, closes the orderAccount,
 * and refunds rent fees.
 *
 * @param connection
 * @param orderInitializer - Public key of order initializer
 * @param initializerDepositTokenAccount - Public key of token account for token being returned
 * @param orderAccount - Public key of orderAccount being closed
 * @param programId - Deployed program ID for GM program
 */
export async function createCancelOrderInstruction({
  connection,
  orderInitializer,
  orderAccount,
  programId,
}: CancelOrderParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  // Fetch order account and get order info
  const orderAccountInfo = (await program.account.orderAccount.fetch(
    orderAccount
  )) as OrderAccountInfo;
  const orderSide = getOrderSide(orderAccountInfo);
  const depositMint =
    orderSide === 'SellSide'
      ? orderAccountInfo.assetMint
      : orderAccountInfo.currencyMint;

  // Get user's token account for deposit mint
  let tokenAccount: web3.PublicKey | web3.Keypair = null;
  let initializerDepositTokenAccount: web3.PublicKey = null;
  const response = await getTokenAccount(
    connection,
    orderInitializer,
    depositMint
  );
  tokenAccount = response.tokenAccount;
  if ('createInstruction' in response) {
    ixSet.instructions.push(response.createInstruction);
  }

  if (tokenAccount instanceof web3.Keypair) {
    initializerDepositTokenAccount = tokenAccount.publicKey;
    ixSet.signers.push(tokenAccount);
  } else {
    initializerDepositTokenAccount = tokenAccount;
  }

  const ix = await program.methods
    .processCancel()
    .accounts({
      depositMint,
      orderInitializer,
      initializerDepositTokenAccount,
      orderAccount,
    })
    .instruction();

  ixSet.instructions.push(ix);
  return ixSet;
}

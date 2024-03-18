import { BN, web3 } from '@project-serum/anchor';
import { getMarketplaceProgram } from '../utils';
import { getTokenAccount } from '../../util';
import { FactoryReturn } from '../../types';
import { BaseParams } from './BaseParams';
import { getOpenOrdersCounter } from '../pda_getters';
import { createOrderCounterInstruction } from './createOrderCounter';
import { createAccountInstruction } from '../../util';

/**  Params for Register Currency instruction */
export interface InitializeOrderParameters extends BaseParams {
  initializerMainAccount: web3.PublicKey;
  initializerDepositTokenAccount: web3.PublicKey;
  price: BN;
  originationQty: number;
  depositMint: web3.PublicKey;
  receiveMint: web3.PublicKey;
}

/**
 * Returns an instruction which creates an order to purchase originationQty of ReceiveToken at 'price' value per unit
 *
 * @param connection
 * @param initializerMainAccount - Public key of user creating order
 * @param initializerDepositTokenAccount - Public key of token account for token being ordered
 * @param initializerReceiveTokenAccount - Public key of token account for token to be received
 * @param orderAccount - Keypair of an initialized orderAccount
 * @param price - Price of individual unit
 * @param originationQty - Number of units to purchase
 * @param depositMint - Mint address of token being ordered
 * @param receiveMint - Mint address of token being purchased
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeBuyOrderInstruction({
  connection,
  initializerMainAccount,
  initializerDepositTokenAccount,
  price,
  originationQty,
  depositMint,
  receiveMint,
  programId,
}: InitializeOrderParameters): Promise<{
  orderAccount: web3.PublicKey;
  ixSet: FactoryReturn;
}> {
  const program = getMarketplaceProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  // Derive ATAs for deposit and receive mints
  let tokenAccount: web3.PublicKey | web3.Keypair = null;
  let initializerReceiveTokenAccount: web3.PublicKey = null;

  const response = await getTokenAccount(
    connection,
    initializerMainAccount,
    receiveMint,
  );

  tokenAccount = response.tokenAccount;
  if ('createInstruction' in response) {
    ixSet.instructions.push(...response.createInstruction);
  }

  if (tokenAccount instanceof web3.Keypair) {
    initializerReceiveTokenAccount = tokenAccount.publicKey;
    ixSet.signers.push(tokenAccount);
  } else {
    initializerReceiveTokenAccount = tokenAccount;
  }
  // Derive the open orders counter, initializing if necessary
  const [counterAddress] = await getOpenOrdersCounter(
    initializerMainAccount,
    depositMint,
    programId,
  );
  const orderCounter = await connection.getAccountInfo(counterAddress);
  if (orderCounter === null) {
    const createCounterIx = await createOrderCounterInstruction({
      connection,
      payer: initializerMainAccount,
      initializerMainAccount,
      depositMint,
      programId,
    });
    ixSet.instructions.push(createCounterIx);
  }

  const orderAccount = web3.Keypair.generate();
  ixSet.signers.push(orderAccount);

  const orderAccountIx = await createAccountInstruction(
    connection,
    initializerMainAccount,
    orderAccount,
    programId,
  );
  ixSet.instructions.push(orderAccountIx);

  const ix = await program.methods
    .processInitializeBuy(price, new BN(originationQty))
    .accounts({
      orderInitializer: initializerMainAccount,
      initializerDepositTokenAccount,
      initializerReceiveTokenAccount,
      orderAccount: orderAccount.publicKey,
      depositMint,
      receiveMint,
    })
    .signers([orderAccount])
    .instruction();
  ixSet.instructions.push(ix);
  return { orderAccount: orderAccount.publicKey, ixSet };
}

/*
 * Returns an instruction which creates an order to sell originationQty of DepositToke;n at 'price' value per unit
 *
 * @param connection
 * @param orderInitializer - Public key of order initializer
 * @param initializerDepositTokenAccount - Public key of token account for token being ordered
 * @param initializerReceiveTokenAccount - Public key of token account for token to be received
 * @param orderAccount - Keypair of an initialized orderAccount
 * @param price - Price of individual unit
 * @param originationQty - Number of units to purchase
 * @param depositMint - Mint address of token being ordered
 * @param receiveMint - Mint address of token being purchased
 * @param programId - Deployed program ID for GM program
 */
export async function createInitializeSellOrderInstruction({
  connection,
  initializerMainAccount,
  initializerDepositTokenAccount,
  price,
  originationQty,
  depositMint,
  receiveMint,
  programId,
}: InitializeOrderParameters): Promise<{
  orderAccount: web3.PublicKey;
  ixSet: FactoryReturn;
}> {
  const program = getMarketplaceProgram({ connection, programId });

  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  // Derive ATAs for deposit and receive mints
  let tokenAccount: web3.PublicKey | web3.Keypair = null;
  let initializerReceiveTokenAccount: web3.PublicKey = null;

  const response = await getTokenAccount(
    connection,
    initializerMainAccount,
    receiveMint,
  );

  tokenAccount = response.tokenAccount;
  if ('createInstruction' in response) {
    ixSet.instructions.push(...response.createInstruction);
  }

  if (tokenAccount instanceof web3.Keypair) {
    initializerReceiveTokenAccount = tokenAccount.publicKey;
    ixSet.signers.push(tokenAccount);
  } else {
    initializerReceiveTokenAccount = tokenAccount;
  }

  // Derive the open orders counter, initializing if necessary
  const [counterAddress] = await getOpenOrdersCounter(
    initializerMainAccount,
    depositMint,
    programId,
  );
  const orderCounter = await connection.getAccountInfo(counterAddress);
  if (orderCounter === null) {
    const createCounterIx = await createOrderCounterInstruction({
      connection,
      payer: initializerMainAccount,
      initializerMainAccount,
      depositMint,
      programId,
    });
    ixSet.instructions.push(createCounterIx);
  }

  const orderAccount = web3.Keypair.generate();
  ixSet.signers.push(orderAccount);

  const orderAccountIx = await createAccountInstruction(
    connection,
    initializerMainAccount,
    orderAccount,
    programId,
  );
  ixSet.instructions.push(orderAccountIx);

  const ix = await program.methods
    .processInitializeSell(price, new BN(originationQty))
    .accounts({
      orderInitializer: initializerMainAccount,
      initializerDepositTokenAccount,
      initializerReceiveTokenAccount,
      orderAccount: orderAccount.publicKey,
      depositMint,
      receiveMint,
    })
    .signers([orderAccount])
    .instruction();

  ixSet.instructions.push(ix);
  return { orderAccount: orderAccount.publicKey, ixSet };
}

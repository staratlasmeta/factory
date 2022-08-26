import { BN, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { getMarketplaceProgram } from '../utils';
import { getOrderVault } from '../pda_getters';
import { BaseParams } from './BaseParams';
import { getOpenOrdersCounter } from '../pda_getters';
import { FactoryReturn } from '../../types';
import { getTokenAccount } from '../../util';
import { OrderSide } from '../models';

/**  Params for Exchange instruction */
export interface ExchangeOrderParams extends BaseParams {
    orderAccount: web3.PublicKey
    purchaseQty: number
    orderTaker: web3.PublicKey
    orderTakerDepositTokenAccount: web3.PublicKey
    expectedPrice: BN,
    orderType: OrderSide,
    assetMint: PublicKey,
    currencyMint: PublicKey,
    orderInitializer: PublicKey,
    saVault: PublicKey,
    stakingProgramId: web3.PublicKey,
    registeredStake: web3.PublicKey,
    stakingAccount: web3.PublicKey,
}

/**
 * Creates an instruction which exchanges tokens between order initializer and order taker to satisfy the exchange detailed in orderAccount
 *
 * @param connection
 * @param orderAccount - an initialized orderAccount
 * @param purchaseQty - Number of items to be purchased
 * @param orderTaker - Public key of the order taker
 * @param orderTakerDepositTokenAccount - Public key of token account for token being sent by taker
 * @param programId - Deployed program ID for GM program
 * @param expectedPrice - Expected price of the order in base token units
 * @param orderType - The OrderSide for this order - Buy or Sell
 * @param assetMint - Mint of the underlying asset
 * @param currencyMint - Mint of the currency being exchanged
 * @param orderInitializer - Public key of the order initializer
 * @param saVault - Token account for SA currency mint royalties
 * @param stakingProgramId - Deployed program ID for the Staking program
 * @param registeredStake - ATLAS staking `RegisteredStake` account
 * @param stakingAccount - Seller's ATLAS staking account
 */
export async function createExchangeInstruction ({
    connection,
    orderAccount,
    purchaseQty,
    orderTaker,
    orderTakerDepositTokenAccount,
    programId,
    expectedPrice,
    orderType,
    assetMint,
    currencyMint,
    orderInitializer,
    saVault,
    stakingProgramId,
    registeredStake,
    stakingAccount,
}: ExchangeOrderParams): Promise<FactoryReturn> {
  const program = getMarketplaceProgram({ connection, programId });
  const ixSet: FactoryReturn = {
    signers: [],
    instructions: [],
  };

  // Get order account and info
  const initializerDepositMint =
    orderType === OrderSide.Sell
      ? new PublicKey(assetMint)
      : new PublicKey(currencyMint);
  const initializerReceiveMint =
    orderType === OrderSide.Sell
      ? new PublicKey(currencyMint)
      : new PublicKey(assetMint);

  // Get user's token accounts
  let initializerDepositTokenAccount: web3.PublicKey = null;
  let initializerReceiveTokenAccount: web3.PublicKey = null;
  let orderTakerReceiveTokenAccount: web3.PublicKey = null;

    // Get initializer deposit mint token account
    let response = await getTokenAccount(
        connection,
        orderInitializer,
        initializerDepositMint,
        orderTaker
    );
    if ('createInstruction' in response) {
        ixSet.instructions.push(response.createInstruction);

      if (response.tokenAccount instanceof web3.Keypair) {
        initializerDepositTokenAccount = response.tokenAccount.publicKey;
        ixSet.signers.push(response.tokenAccount);
      } else {
        initializerDepositTokenAccount = response.tokenAccount;
      }
    }
        else {
        initializerDepositTokenAccount = response.tokenAccount;
    }
    


  // Get initializer receive mint token account
  response = await getTokenAccount(
    connection,
    orderInitializer,
    initializerReceiveMint,
    orderTaker
  );
  if ('createInstruction' in response) {
    ixSet.instructions.push(response.createInstruction);

    if (response.tokenAccount instanceof web3.Keypair) {
      initializerReceiveTokenAccount = response.tokenAccount.publicKey;
      ixSet.signers.push(response.tokenAccount);
    } else {
      initializerReceiveTokenAccount = response.tokenAccount;
    }
  } else {
    initializerReceiveTokenAccount = response.tokenAccount;
  }
>>>>>>> 6a28e45 (Added prettier)

  const [orderVaultAccount] = await getOrderVault(
    orderInitializer,
    initializerDepositMint,
    programId
  );
  const [openOrdersCounter] = await getOpenOrdersCounter(
    orderInitializer,
    initializerDepositMint,
    programId
  );

    // Get order taker receive token account
    response = await getTokenAccount(
        connection,
        orderTaker,
        initializerDepositMint,
    );
    if ('createInstruction' in response) {
        ixSet.instructions.push(response.createInstruction);

        if (response.tokenAccount instanceof web3.Keypair) {
            orderTakerReceiveTokenAccount = response.tokenAccount.publicKey;
            ixSet.signers.push(response.tokenAccount)
        } else {
            orderTakerReceiveTokenAccount = response.tokenAccount;
        }
    } else {
        orderTakerReceiveTokenAccount = response.tokenAccount;
    }

    const seller = ((orderType === OrderSide.Buy) ? orderTaker : orderInitializer);

    const exchangeIx =
        await program.methods
            .processExchange(new BN(purchaseQty), expectedPrice, seller)
            .accounts({
                orderTaker,
                orderTakerDepositTokenAccount,
                orderTakerReceiveTokenAccount,
                currencyMint,
                assetMint,
                orderInitializer,
                initializerDepositTokenAccount,
                initializerReceiveTokenAccount,
                orderVaultAccount,
                orderAccount,
                openOrdersCounter,
                saVault,
                atlasStaking: stakingProgramId,
                registeredStake,
                stakingAccount
            })
            .instruction();

  ixSet.instructions.push(exchangeIx);

  return ixSet;
}

import { web3 } from '@project-serum/anchor';
import { associatedAddress } from '@project-serum/anchor/dist/cjs/utils/token';
import { FactoryReturn } from '../../types';
import { getTokenAccount } from '../../util';
import { getRegisteredStakeAccountInfo } from '../pda_getters';
import { getStakingProgram } from '../utils';
import { BaseStakingParams } from './baseParams';

export interface UnstakeTokensParams extends BaseStakingParams {
    user: web3.PublicKey,
    registeredStake: web3.PublicKey,
    stakingAccount: web3.PublicKey,
}

/**
 * Returns an instruction which transfers a user's tokens to an escrow account owned by the program
 *
 * @param connection
 * @param user - Public key of user creating the staking account
 * @param registeredStake - Public key of `RegisteredStake` which this staking account corresponds to
 * @param stakingAccount - Public key of user's `StakingAccount` associated with the provided `RegisteredStake`
 * @param programId - Deployed program ID for Staking program
 */
export async function unstakeTokensInstruction({
    connection,
    user,
    registeredStake,
    stakingAccount,
    programId
}: UnstakeTokensParams): Promise<FactoryReturn> {
    const program = getStakingProgram({connection, programId});

    const ixSet: FactoryReturn = {
        signers: [],
        instructions: []
    }

    // Derive ATA for user's reward account
    const registeredStakeInfo =  await getRegisteredStakeAccountInfo(connection, registeredStake, programId);
    const rewardMint = registeredStakeInfo.rewardMint;

    // Derive ATA for user's reward account
    let tokenAccount: web3.PublicKey | web3.Keypair = null;
    let userRewardAccount: web3.PublicKey = null;

    const response = await getTokenAccount(
        connection,
        user,
        rewardMint
    );
    tokenAccount = response.tokenAccount;
    if ('createInstruction' in response) {
        ixSet.instructions.push(response.createInstruction);
    }

    if (tokenAccount instanceof web3.Keypair) {
        userRewardAccount = tokenAccount.publicKey;
        ixSet.signers.push(tokenAccount);
    } else {
        userRewardAccount = tokenAccount;
    }

    const rewardAta = await associatedAddress({owner: registeredStake, mint: rewardMint});

    const ix = await program.methods
            .unstakeTokens()
            .accounts({
                user,
                rewardMint,
                registeredStake,
                stakingAccount,
                userRewardAccount,
                rewardAta
            })
            .instruction();

    ixSet.instructions.push(ix);
    return ixSet;
}

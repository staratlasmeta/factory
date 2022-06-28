import { web3 } from '@project-serum/anchor'

export type FactoryReturn = {
    signers: web3.Keypair[],
    instructions: web3.TransactionInstruction[]
}
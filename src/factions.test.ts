import {
    getPlayerFactionPDA,
    getEnlistInfoPDA,
    enlistToFactionInstruction,
    createEnlistInfoAccount,
} from '.';

import {
    PublicKey,
    Keypair
} from '@solana/web3.js';

import { byteArrayToLong } from './util';

let programId = new PublicKey('7xFaGmxg62o9MNBrkXS9MAVoAUMXLyrxtBZqdd1eRk1b')
let playerKey = new PublicKey('9Zu5fUZY7GYBAiEeRPfBsKMtohUGBn9SUpmgXTLcmSD4')
let payerAccount = new Keypair()

test('Should return a player faction PDA as a public key which is not on the ed25519 curve', () => {
    return getPlayerFactionPDA(playerKey, programId).then(response => {
        expect(PublicKey.isOnCurve(response[0].toBytes())).toBeFalsy()
        expect(response[0].toString()).toEqual('AGo8tMdVVLfwyZcBVJCE1FrJgc3v2BrWPhoMA61jDbkq')
    })
})

test('Should return an enlist info PDA as a public key which is not on the ed25519 curve', () => {
    return getEnlistInfoPDA(programId).then(response => {
        expect(response[0].toString()).toEqual('76wLar7UnGK5jFjZZiNSvbT75cYNJdA8SEusMUgdHUV7')
        expect(PublicKey.isOnCurve(response[0].toBytes())).toBeFalsy()
    })
})

const factionIdList = [[0, 0], [1, 1], [2, 2]]

describe('Should return an instruction that can be used to enlist a player in a desired function by carrying faction ID in instruction data', () => {
    test.each(factionIdList)('returns $expected when $a passed as factionId', (a, expected) => {
        return enlistToFactionInstruction(a, playerKey, programId).then(response => {
            let data = byteArrayToLong(response.data.slice(1,2))
            expect(data).toEqual(expected)
        })
    })
})

test('Should return a transaction with 5 keys, a programId, and data as cargo', () => {
    return enlistToFactionInstruction(2, playerKey, programId).then(response => {
        expect((response.keys.length)).toBe(5)
        expect(response.programId).toBeInstanceOf(PublicKey)
    })
})

test('Should return a transaction which can be used to create an enlist info acount', () => {
    return createEnlistInfoAccount(payerAccount, programId).then(response => {
        expect(response.instructions[0].keys.length).toBe(3)
        expect(response.instructions[0].keys[1].pubkey.toString()).toEqual('76wLar7UnGK5jFjZZiNSvbT75cYNJdA8SEusMUgdHUV7')
        expect(response.instructions[0].programId).toBeInstanceOf(PublicKey)
    })
})

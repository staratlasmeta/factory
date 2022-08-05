import { BN } from '@project-serum/anchor';

import { convertDecimalPriceToBn } from './gmHelper';

test('convertDecimalPriceToBn() should convert floating point values correctly', () => {
    expect(convertDecimalPriceToBn(2.000001, 6)).toEqual(new BN(2000001));
});

test('convertDecimalPriceToBn() should convert integer values correctly', () => {
    expect(convertDecimalPriceToBn(40001, 8)).toEqual(new BN(4000100000000));
});

test('convertDecimalPriceToBn() should convert values with floating point lengths greater than expected correctly', () => {
    expect(convertDecimalPriceToBn(2.222, 2)).toEqual(new BN(222));
});

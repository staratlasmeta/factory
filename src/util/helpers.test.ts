import { longToByteArray } from '.';

test('should convert a long to a byte array', () => {
  expect(longToByteArray(257)).toStrictEqual([1, 1, 0, 0, 0, 0, 0, 0]);
});

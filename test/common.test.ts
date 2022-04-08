import { expect, describe, it } from 'vitest';
import { getByteArrayFromHexString } from '../src/common';

describe('getByteArrayFromHexString', () => {
  it('should transform an hex string to an int array', () => {
    expect(getByteArrayFromHexString('')).toEqual([]);
    expect(getByteArrayFromHexString('ff')).toEqual([255]);
    expect(getByteArrayFromHexString('ffffffff')).toEqual([255, 255, 255, 255]);
    expect(getByteArrayFromHexString('063679ca')).toEqual([6, 54, 121, 202]);
    expect(getByteArrayFromHexString('0102030405060708090a0b0c0d0e0f')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it('should transform no matter the case', () => {
    expect(getByteArrayFromHexString('0a0b0c0d0e0f')).toEqual([10, 11, 12, 13, 14, 15]);
    expect(getByteArrayFromHexString('0A0B0C0D0E0F')).toEqual([10, 11, 12, 13, 14, 15]);
  });
});

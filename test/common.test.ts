import { expect, describe, it } from 'vitest';
import { generateEntropy, getByteArrayFromHexString, getIntegerFromBin } from '../src/common';

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

describe('getIntegerFromBin', () => {
  it('should transform a binary string to its integer representation', () => {
    expect(getIntegerFromBin('0')).toEqual(0);
    expect(getIntegerFromBin('1')).toEqual(1);
    expect(getIntegerFromBin('10')).toEqual(2);
    expect(getIntegerFromBin('11')).toEqual(3);
    expect(getIntegerFromBin('100')).toEqual(4);
    expect(getIntegerFromBin('101')).toEqual(5);
    expect(getIntegerFromBin('110')).toEqual(6);
    expect(getIntegerFromBin('111')).toEqual(7);
    expect(getIntegerFromBin('1111')).toEqual(15);
    expect(getIntegerFromBin('11111')).toEqual(31);
    expect(getIntegerFromBin('111111')).toEqual(63);
    expect(getIntegerFromBin('111111')).toEqual(63);
    expect(getIntegerFromBin('110011110110100')).toEqual(26548);
    expect(getIntegerFromBin('1011111110111111011000')).toEqual(3141592);
  });

  it('should transform a minus prefixed binary string to its negative integer representation', () => {
    expect(getIntegerFromBin('-0')).toEqual(-0);
    expect(getIntegerFromBin('-1')).toEqual(-1);
    expect(getIntegerFromBin('-10')).toEqual(-2);
    expect(getIntegerFromBin('-11')).toEqual(-3);
    expect(getIntegerFromBin('-100')).toEqual(-4);
    expect(getIntegerFromBin('-101')).toEqual(-5);
    expect(getIntegerFromBin('-110')).toEqual(-6);
    expect(getIntegerFromBin('-111')).toEqual(-7);
    expect(getIntegerFromBin('-1111')).toEqual(-15);
    expect(getIntegerFromBin('-11111')).toEqual(-31);
    expect(getIntegerFromBin('-111111')).toEqual(-63);
    expect(getIntegerFromBin('-111111')).toEqual(-63);
    expect(getIntegerFromBin('-110011110110100')).toEqual(-26548);
    expect(getIntegerFromBin('-1011111110111111011000')).toEqual(-3141592);
  });

  it('should transform invalid strings to NaN', () => {
    expect(getIntegerFromBin('')).toBeNaN();
    expect(getIntegerFromBin('2')).toBeNaN();
    expect(getIntegerFromBin('foo')).toBeNaN();
    expect(getIntegerFromBin('42')).toBeNaN();
    expect(getIntegerFromBin('-*/-')).toBeNaN();
  });
});

describe('generateEntropy', () => {
  describe('when no args is passed', () => {
    it('it should generate a 32 hexadecimal characters string', () => {
      const entropy = generateEntropy();

      expect(entropy).toHaveLength(32);
      expect(entropy).toMatch(/^[a-z0-9]+$/);
    });
  });

  describe('when a length within the [128,256] range and is a multiple of 32 is passed', () => {
    it('it should create a random string with a lenght of (the input / 4)', () => {
      expect(generateEntropy(20)).toHaveLength(20);
    });
  });

  describe('when a length greater than 32 is passed', () => {
    it('it should throw an error', () => {
      expect(() => generateEntropy(33)).toThrow();
      expect(() => generateEntropy(1000)).toThrow();
      expect(() => generateEntropy(Infinity)).toThrow();
    });
  });

  describe('when a length lower than 16 is passed', () => {
    it('it should throw an error', () => {
      expect(() => generateEntropy(15)).toThrow();
      expect(() => generateEntropy(0)).toThrow();
      expect(() => generateEntropy(-1000)).toThrow();
      expect(() => generateEntropy(-Infinity)).toThrow();
    });
  });

  describe('when a length within the [128,256] range but not a multiple of 32 is passed', () => {
    it('it should throw an error', () => {
      expect(() => generateEntropy(17)).toThrow();
      expect(() => generateEntropy(21)).toThrow();
      expect(() => generateEntropy(31)).toThrow();
    });
  });
});

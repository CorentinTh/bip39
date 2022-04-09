import { expect, describe, it } from 'vitest';
import { entropyToMnemonic } from '../src/entropy';

describe('entropyToMnemonic', () => {
  describe('when the entropy is a 32 characters hex string)', () => {
    it('should compute the mnemonic', () => {
      expect(entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e')).toEqual('alert record income curve mercy tree heavy loan hen recycle mean devote');
      expect(entropyToMnemonic('1d60683972011cb97322ed6ae96225f3')).toEqual('buddy addict atom tomato balcony frequent smart frozen helmet enrich maximum travel');
      expect(entropyToMnemonic('7fd38fa28ee3762eac4c91b508368e3f')).toEqual('lemon organ trim build danger blanket raise mutual relax double phone lend');
      expect(entropyToMnemonic('d97e4d00dc26d31165073a081a3e80a9')).toEqual('sunny venue dizzy reunion honey master neglect trap amount spin parent fall');
      expect(entropyToMnemonic('d97e4d00dc26d31165073a081a3e80a9')).toEqual('sunny venue dizzy reunion honey master neglect trap amount spin parent fall');
    });
  });

  describe('when the entropy not an hex string)', () => {
    it('should throw an error', () => {
      expect(() => entropyToMnemonic('hello world this is a string')).toThrow();
      expect(() => entropyToMnemonic('zzzzzzzzzzzzzzzzzzzzzzz')).toThrow();
    });
  });

  describe('when the entropy is a 16 characters hex string)', () => {
    it('should compute the mnemonic', () => {
      expect(entropyToMnemonic('063679ca1b28b5cf')).toEqual('alert record income curve mercy treat');
    });
  });

  describe('when the entropy is a 17 characters hex string)', () => {
    it('should throw an error', () => {
      expect(() => entropyToMnemonic('063679ca1b28b5cfa')).toThrow();
    });
  });

  describe('when the entropy length is outside the 16-32 range', () => {
    it('should throw an error', () => {
      expect(() => entropyToMnemonic('a')).toThrow();
      expect(() => entropyToMnemonic('aaaa')).toThrow();
      expect(() => entropyToMnemonic('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toThrow();
    });
  });
});

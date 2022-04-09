import { expect, describe, it } from 'vitest';
import { mnemonicToEntropy } from '../src/mnemonic';

describe('mnemonicToEntropy', () => {
  describe('when the checksum is valid', () => {
    it('should compute the entropy', () => {
      expect(mnemonicToEntropy('alert record income curve mercy tree heavy loan hen recycle mean devote')).toEqual('063679ca1b28b5cfda9c186b367e271e');
      expect(mnemonicToEntropy('buddy addict atom tomato balcony frequent smart frozen helmet enrich maximum travel')).toEqual('1d60683972011cb97322ed6ae96225f3');
      expect(mnemonicToEntropy('lemon organ trim build danger blanket raise mutual relax double phone lend')).toEqual('7fd38fa28ee3762eac4c91b508368e3f');
      expect(mnemonicToEntropy('sunny venue dizzy reunion honey master neglect trap amount spin parent fall')).toEqual('d97e4d00dc26d31165073a081a3e80a9');
    });
  });

  describe('when the checksum is invalid', () => {
    it('should thow an error', () => {
      expect(() => mnemonicToEntropy('alert record income curve mercy tree heavy loan hen recycle mean mean')).toThrow();
      expect(() => mnemonicToEntropy('alert record income curve mercy tree heavy loan hen recycle mean s')).toThrow();
    });
  });
});

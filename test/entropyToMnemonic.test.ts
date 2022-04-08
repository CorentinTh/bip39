import { expect, describe, it } from 'vitest';
import { entropyToMnemonic } from '../src/index';

describe('entropyToMnemonic', () => {
  it('should match bip39', () => {
    expect(entropyToMnemonic('1d60683972011cb97322ed6ae96225f3')).toEqual('buddy addict atom tomato balcony frequent smart frozen helmet enrich maximum travel');
    expect(entropyToMnemonic('7fd38fa28ee3762eac4c91b508368e3f')).toEqual('lemon organ trim build danger blanket raise mutual relax double phone lend');
    expect(entropyToMnemonic('d97e4d00dc26d31165073a081a3e80a9')).toEqual('sunny venue dizzy reunion honey master neglect trap amount spin parent fall');
  });
});

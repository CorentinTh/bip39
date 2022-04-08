import { expect, describe, it } from 'vitest';
import { entropyToMnemonic } from '../src/entropyToMnemonic';
import { frenchWordList } from '../src/wordLists';

describe('entropyToMnemonic', () => {
  it('should compute the mnemonic', () => {
    console.log(entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e', frenchWordList));
    expect(entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e')).toEqual('alert record income curve mercy tree heavy loan hen recycle mean devote');
    expect(entropyToMnemonic('1d60683972011cb97322ed6ae96225f3')).toEqual('buddy addict atom tomato balcony frequent smart frozen helmet enrich maximum travel');
    expect(entropyToMnemonic('7fd38fa28ee3762eac4c91b508368e3f')).toEqual('lemon organ trim build danger blanket raise mutual relax double phone lend');
    expect(entropyToMnemonic('d97e4d00dc26d31165073a081a3e80a9')).toEqual('sunny venue dizzy reunion honey master neglect trap amount spin parent fall');
  });
});

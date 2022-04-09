import { getChecksumBin, getIntegerFromBin } from './common';
import { defaultList } from './wordLists';
import { IWordList } from './wordLists/WordList';

export function mnemonicToEntropy(mnemonic: string, wordList: IWordList = defaultList) {
  const words = mnemonic.trim().split(wordList.spacer).filter(Boolean);
  const bits = words.map((word) => wordList.words.indexOf(word).toString(2).padStart(11, '0')).join('');

  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);

  const entropyBytes = (entropyBits.match(/(.{1,8})/g) ?? []).map((byte) => getIntegerFromBin(byte));
  const newChecksum = getChecksumBin(entropyBytes);

  if (newChecksum !== checksumBits) {
    throw new Error('[bip39] Invalid checksum.');
  }

  return Array.from(entropyBytes, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
}

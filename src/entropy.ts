import { IWordList } from './wordLists/WordList';
import { defaultList } from './wordLists';
import { bytesToBinary, getByteArrayFromHexString, getChecksumBin, getIntegerFromBin, validateEntropyLength } from './common';

export function entropyToMnemonic(entropy: string, wordList: IWordList = defaultList) {
  validateEntropyLength(entropy.length);

  if (!entropy.match(/^[a-zA-Z0-9]+$/)) {
    throw new Error('[bip39] Invalid entropy: it should be an hexadecimal string (char from: [a-zA-Z0-9])');
  }

  const entropyBuffer = getByteArrayFromHexString(entropy);
  const entropyBits = bytesToBinary(entropyBuffer);
  const checksumBits = getChecksumBin(entropyBuffer);

  const bits = entropyBits + checksumBits;
  const chunks = bits.match(/(.{1,11})/g) ?? [];

  const words = chunks.map((binary) => wordList.words[getIntegerFromBin(binary)]);

  return words.join(wordList.spacer);
}

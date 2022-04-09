import { sha256 } from 'js-sha256';
import { customAlphabet } from 'nanoid';

const getRandom = customAlphabet('1234567890abcdef');

export function validateEntropyLength(length: number) {
  if (length < 16) {
    throw new Error('[bip39] Invalid entropy: the length of the entropy string should be >= 16 ');
  }
  if (length > 32) {
    throw new Error('[bip39] Invalid entropy: the length of the entropy string should be <= 32');
  }
  if (length % 4 !== 0) {
    throw new Error('[bip39] Invalid entropy: the length of the entropy string should be a multiple of 4');
  }
}

export function generateEntropy(length = 32) {
  validateEntropyLength(length);

  return getRandom(length);
}

export function getChecksumBin(entropyBuffer: number[]) {
  const lengthInBit = entropyBuffer.length * 8;
  const chunkCount = lengthInBit / 32;
  const hash = sha256.hex(entropyBuffer);

  return bytesToBinary(getByteArrayFromHexString(hash)).slice(0, chunkCount);
}

export function bytesToBinary(bytes: number[]) {
  return bytes.reduce((acc, x) => acc + x.toString(2).padStart(8, '0'), '');
}

export function getIntegerFromBin(bin: string) {
  return parseInt(bin, 2);
}

export function getByteArrayFromHexString(string: string) {
  return (string.match(/.{1,2}/g) ?? []).map((char) => parseInt(char, 16));
}

import { sha256 } from 'js-sha256';

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

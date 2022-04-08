import { sha256 } from 'js-sha256';
import wordList from './wordLists/english.json';

function stringToUint8Array(string: string) {
  return new TextEncoder().encode(string);
}

function deriveChecksumBits(entropyBuffer: Uint8Array) {
  const lengthInBit = entropyBuffer.length * 8;
  const chunkCount = lengthInBit / 32;

  const hash = sha256(entropyBuffer);
  return stringToUint8Array(hash).slice(0, chunkCount);
}

function uint8ArrayToInt(array: Uint8Array) {
  return new DataView(array.buffer, 0).getUint32(0, true);
}

function chunkArray(array: Uint8Array) {
  const chunkSize = 11;
  const acc = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    acc.push(array.slice(i, i + chunkSize));
  }
  return acc;
}

export function entropyToMnemonic(entropy: string) {
  const entropyBits = stringToUint8Array(entropy);
  const checksumBits = deriveChecksumBits(entropyBits);
  const bits = new Uint8Array([...entropyBits, ...checksumBits]);
  const chunks = chunkArray(bits);
  const a = chunks.map((b) => uint8ArrayToInt(b));
  return;
}

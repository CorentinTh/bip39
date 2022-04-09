<div align="center">

![logo](.github/logo.png)

</div>

<div align="center">

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/CorentinTh/bip39/Node%20CI)](https://github.com/CorentinTh/bip39/actions?query=workflow%3A%22Node+CI%22)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@it-tools/bip39.svg)](https://www.npmjs.com/package/@it-tools/bip39)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/CorentinTh/bip39.svg)](https://github.com/CorentinTh/bip39/blob/master/package.json)
[![Licence Badge](https://img.shields.io/github/license/CorentinTh/bip39.svg)](LICENCE)

</div>

A simple and complete bip39 mnemonic (passphrase) and entropy generator in typescript.

This package is similar to [bitcoinjs/bip39](https://github.com/bitcoinjs/bip39) but lighter, strongly typed and without the heavy dependency to `Buffer` in order to be easily used in the browser.

## Installation

### Node JS

Install using yarn or npm.

```bash
npm install @it-tools/bip39
# or
yarn add @it-tools/bip39
```

And import :

```typescript
// EMAScript import
import { entropyToMnemonic, mnemonicToEntropy } from '@it-tools/bip39';
// Or Common JS:
const { entropyToMnemonic, mnemonicToEntropy } = require('@it-tools/bip39');

const passphrase = entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e');

console.log(passphrase);
// alert record income curve mercy tree heavy loan hen recycle mean devote
```

## Usage

### Create mnemonic (passphrase) from entropy

Default language is `english`. The entropy must an hexadecimal string with a length >= 16 or <= 32 and that is a multiple or 4.

```typescript
import { entropyToMnemonic } from '@it-tools/bip39';

const passphrase = entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e');

console.log(passphrase);
// alert record income curve mercy tree heavy loan hen recycle mean devote
```

### Get entropy from a mnemonic (passphrase)

Default language is `english`.

```typescript
import { mnemonicToEntropy } from '@it-tools/bip39';

const entropy = mnemonicToEntropy('alert record income curve mercy tree heavy loan hen recycle mean devote');

console.log(entropy);
// 063679ca1b28b5cfda9c186b367e271e
```

### Generate an entropy

```typescript
import { generateEntropy } from '@it-tools/bip39';

// Default is a 32 long entropy
const entropy = generateEntropy();

console.log(entropy);
// 063679ca1b28b5cfda9c186b367e271e
```

```typescript
import { generateEntropy } from '@it-tools/bip39';

const entropy = generateEntropy(16);

console.log(entropy);
// b063679ca1b28b5c
```

### Other languages

To use another language, just import the wordlist an use it in the function:

```typescript
import { entropyToMnemonic, mnemonicToEntropy, frenchWordList } from '@it-tools/bip39';

const passphrase = entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e', frenchWordList);

console.log(passphrase);
// adroit pastèque glace commande lanceur tarder forcer insigne fougère paternel label culminer

const entropy = entropyToMnemonic('adroit pastèque glace commande lanceur tarder forcer insigne fougère paternel label culminer', frenchWordList);

console.log(entropy);
// a063679ca1b28b5cfda9c186b367e271e
```

Available languages are:

- **chineseSimplified**: `import { chineseSimplifiedWordList } from '@it-tools/bip39';`
- **chineseTraditional**: `import { chineseTraditionalWordList } from '@it-tools/bip39';`
- **czech**: `import { czechWordList } from '@it-tools/bip39';`
- **english**: `import { englishWordList } from '@it-tools/bip39';`
- **french**: `import { frenchWordList } from '@it-tools/bip39';`
- **italian**: `import { italianWordList } from '@it-tools/bip39';`
- **japanese**: `import { japaneseWordList } from '@it-tools/bip39';`
- **korean**: `import { koreanWordList } from '@it-tools/bip39';`
- **portuguese**: `import { portugueseWordList } from '@it-tools/bip39';`
- **spanish**: `import { spanishWordList } from '@it-tools/bip39';`

You can event define your custom language:

```typescript
import { entropyToMnemonic, IWordList } from '@it-tools/bip39';

const customWordList: IWordList = {
  language: 'my-language',
  spacer: ' ', // character used to split word in a sentence, mainly space
  words: [
    'word1',
    'word2',
    // ...
  ],
};

const passphrase = entropyToMnemonic('063679ca1b28b5cfda9c186b367e271e', customWordList);
```

## Contribute

**Pull requests are welcome !** Feel free to contribute.

## Credits

Coded with ❤️ by [Corentin Thomasset](//corentin-thomasset.fr).

Inspired from [bitcoinjs/bip39](https://github.com/bitcoinjs/bip39)

## License

This project is under the [MIT license](LICENSE).

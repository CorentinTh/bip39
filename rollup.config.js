import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'BIP39',
      sourcemap: true,
    },
    {
      dir: 'es',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
    },
  ],
  external: [...Object.keys(pkg.dependencies ?? {})],
  plugins: [
    json(),
    typescript({
      resolveJsonModule: true,
    }),
    terser(),
  ],
};

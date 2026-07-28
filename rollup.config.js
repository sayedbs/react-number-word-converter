import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

import { readFileSync } from 'fs';
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const baseConfig = {
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};

export default [
  // UMD build for browsers
  {
    ...baseConfig,
    output: {
      file: packageJson.main,
      format: 'umd',
      name: 'ReactNumberWordConverter',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  },
  // ES module build
  {
    ...baseConfig,
    output: {
      file: packageJson.module,
      format: 'es',
    },
  },
  // Minified UMD build
  {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
    output: {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'ReactNumberWordConverter',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  },
  // TypeScript definitions
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.types,
      format: 'es',
    },
    plugins: [dts()],
    external: [/\.css$/],
  },
];

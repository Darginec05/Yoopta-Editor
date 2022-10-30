import json from 'rollup-plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
// import html from '@rollup/plugin-html';
// import serve from 'rollup-plugin-serve';

import pkg from './package.json' assert { type: 'json' };

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ['src/index.ts', 'src/YoptaRenderer.tsx'],
  output: [
    {
      // file: pkg.module,
      format: 'esm',
      dir: 'dist',
      sourcemap: isDev,
      globals: { react: 'React' },
    },
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    commonjs(),
    nodeResolve(),
    svgr({
      typescript: true,
    }),
    postcss({
      extract: true,
      modules: true,
      minimize: true,
      use: ['sass'],
    }),
    typescript({
      clean: isProd,
      useTsconfigDeclarationDir: true,
    }),
    sourceMaps(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    isProd && terser(),
    // isDev && html(),
    // isDev && serve({
    //   open: true,
    //   verbose: true,
    //   contentBase: 'examples',
    //   host: 'localhost',
    //   port: 3000,
    // }),
  ].filter(Boolean),
  cache: isDev,
  external: [...Object.keys(pkg.peerDependencies), 'react/jsx-runtime'],
};

export default config;

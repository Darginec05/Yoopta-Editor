import json from 'rollup-plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from '../packages/yopta-editor/package.json' assert { type: 'json' };
import blockquotePkg from '../packages/yopta-blockquote/package.json' assert { type: 'json' };

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('rollup').RollupOptions}
 */
const CoreConfig = {
  input: `packages/${pkg.name}/src/index.ts`,
  output: [
    {
      format: 'esm',
      sourcemap: isDev,
      globals: { react: 'React' },
      file: `packages/${pkg.name}/${pkg.module}`,
      exports: 'named',
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
      modules: {
        generateScopedName: isProd ? '[hash:base64:8]' : '[name]_[local]',
      },
      autoModules: true,
      minimize: true,
      use: ['sass'],
    }),
    typescript({
      clean: isProd,
      useTsconfigDeclarationDir: true,
      abortOnError: false,
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: `packages/${pkg.name}/tsconfig.json`,
    }),
    sourceMaps(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    isProd && terser(),
  ].filter(Boolean),
  cache: isDev,
  external: [...Object.keys(pkg.peerDependencies)],
};

const BlockquoteConfig = {
  input: `packages/${blockquotePkg.name}/src/index.ts`,
  output: [
    {
      format: 'esm',
      sourcemap: isDev,
      globals: { react: 'React' },
      file: `packages/${blockquotePkg.name}/${blockquotePkg.module}`,
      exports: 'named',
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
      modules: {
        generateScopedName: isProd ? '[hash:base64:8]' : '[name]_[local]',
      },
      autoModules: true,
      minimize: true,
      use: ['sass'],
    }),
    typescript({
      clean: isProd,
      useTsconfigDeclarationDir: true,
      abortOnError: false,
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: `packages/${blockquotePkg.name}/tsconfig.json`,
    }),
    sourceMaps(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    isProd && terser(),
  ].filter(Boolean),
  cache: isDev,
  external: [...Object.keys(blockquotePkg.peerDependencies)],
};

export default [CoreConfig, BlockquoteConfig];

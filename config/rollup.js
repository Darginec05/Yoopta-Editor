// const json = require('rollup-plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const sourceMaps = require('rollup-plugin-sourcemaps');
const replace = require('@rollup/plugin-replace');
const terser = require('@rollup/plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const svgr = require('@svgr/rollup');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const tailwindcss = require('tailwindcss');

// const tailwindConfig = require('./tailwind.config.js');
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

function getPlugins() {
  return [
    // json(),
    peerDepsExternal(),
    commonjs(),
    nodeResolve(),
    svgr({
      typescript: true,
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extract: false,
      modules: {
        generateScopedName: isProd ? '[hash:base64:8]' : '[name]_[local]',
      },
      autoModules: true,
      minimize: true,
      use: ['sass'],
      plugins: [
        tailwindcss({
          content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
          theme: {
            extend: {},
          },
          plugins: [],
        }),
      ],
    }),
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true,
      abortOnError: false,
      tsconfig: `./tsconfig.json`,
      tsconfigOverride: {
        compilerOptions: {
          declaration: isProd,
          declarationDir: './dist/types',
        },
      },
    }),
    sourceMaps(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    isProd && terser(),
  ].filter(Boolean);
}

/**
 * @type {import('rollup').RollupOptions}
 */
export function createRollupConfig({ pkg }) {
  return {
    input: `./src/index.ts`,
    output: [
      {
        format: 'esm',
        sourcemap: isDev,
        globals: { react: 'React' },
        file: `./${pkg.module}`,
        exports: 'named',
      },
    ],
    plugins: getPlugins(),
    cache: isDev,
    external: [...Object.keys(pkg.peerDependencies)],
  };
}

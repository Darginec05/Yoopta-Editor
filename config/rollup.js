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
const autoprefixer = require('autoprefixer');
const postcssNesting = require('postcss-nesting');

// const tailwindConfig = require('./tailwind.config.js');
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

function getPlugins({ tailwindConfig }) {
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
        postcssNesting(),
        tailwindcss({
          theme: {
            extend: {},
          },
          plugins: [],
          /* SHOULD BE REMOVED */
          // corePlugins: {
          //   preflight: false,
          // },
          ...tailwindConfig,
          content: tailwindConfig?.content || ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
        }),
        autoprefixer(),
      ],
    }),
    typescript({
      clean: true,
      check: true,
      abortOnError: false,
      tsconfig: `./tsconfig.json`,

      tsconfigOverride: {
        compilerOptions: {
          declarationDir: isProd ? './dist/types' : undefined,
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
export function createRollupConfig({ pkg, tailwindConfig }) {
  return {
    input: `./src/index.ts`,
    output: [
      {
        format: 'es',
        sourcemap: isDev,
        globals: { react: 'React' },
        file: `./${pkg.module}`,
        exports: 'named',
      },
      // {
      //   file: `./${pkg.main}`,
      //   format: 'cjs',
      //   globals: { react: 'React' },
      //   exports: 'named',
      //   sourcemap: isDev,
      // },
    ],
    plugins: getPlugins({ tailwindConfig }),
    cache: isDev,
    external: [...Object.keys(pkg.peerDependencies)],
  };
}

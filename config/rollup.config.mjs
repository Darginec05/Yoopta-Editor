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

import corePkg from '../packages/yopta-editor/package.json' assert { type: 'json' };
import blockquotePkg from '../packages/yopta-blockquote/package.json' assert { type: 'json' };
import paragraphPkg from '../packages/yopta-paragraph/package.json' assert { type: 'json' };
import calloutPkg from '../packages/yopta-callout/package.json' assert { type: 'json' };
import codePkg from '../packages/yopta-code/package.json' assert { type: 'json' };
import linkPkg from '../packages/yopta-link/package.json' assert { type: 'json' };

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const aliases = {
  '@yopta/editor': 'yopta-editor',
  '@yopta/blockquote': 'yopta-blockquote',
  '@yopta/paragraph': 'yopta-paragraph',
  '@yopta/callout': 'yopta-callout',
  '@yopta/code': 'yopta-code',
  '@yopta/link': 'yopta-link',
};

/**
 * @type {import('rollup').RollupOptions}
 */
const createConfig = ({ pkg, postcssConfig }) => {
  const packageDist = aliases[pkg.name] || pkg.name;

  return {
    input: `packages/${packageDist}/src/index.ts`,
    output: [
      {
        format: 'esm',
        sourcemap: isDev,
        globals: { react: 'React' },
        file: `packages/${packageDist}/${pkg.module}`,
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
        ...postcssConfig,
      }),
      typescript({
        clean: isProd,
        useTsconfigDeclarationDir: true,
        abortOnError: false,
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfig: `packages/${packageDist}/tsconfig.json`,
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
};

const CoreConfig = createConfig({ pkg: corePkg });
const BlockquoteConfig = createConfig({ pkg: blockquotePkg, postcssConfig: { extract: false } });
const ParagraphPkgConfig = createConfig({ pkg: paragraphPkg, postcssConfig: { extract: false } });
const CalloutPkgConfig = createConfig({ pkg: calloutPkg, postcssConfig: { extract: false } });
const CodePkgConfig = createConfig({ pkg: codePkg, postcssConfig: { extract: false } });
const LinkPkgConfig = createConfig({ pkg: linkPkg, postcssConfig: { extract: false } });

export default [CoreConfig, BlockquoteConfig, ParagraphPkgConfig, CalloutPkgConfig, CodePkgConfig, LinkPkgConfig];

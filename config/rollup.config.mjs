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
import listsPkg from '../packages/yopta-lists/package.json' assert { type: 'json' };
import headingsPkg from '../packages/yopta-headings/package.json' assert { type: 'json' };
import imagePkg from '../packages/yopta-image/package.json' assert { type: 'json' };
import videoPkg from '../packages/yopta-video/package.json' assert { type: 'json' };

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const aliases = {
  '@yopta/editor': 'yopta-editor',
  '@yopta/blockquote': 'yopta-blockquote',
  '@yopta/paragraph': 'yopta-paragraph',
  '@yopta/callout': 'yopta-callout',
  '@yopta/code': 'yopta-code',
  '@yopta/link': 'yopta-link',
  '@yopta/lists': 'yopta-lists',
  '@yopta/headings': 'yopta-headings',
  '@yopta/image': 'yopta-image',
  '@yopta/video': 'yopta-video',
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
        extract: false,
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

const CoreConfig = createConfig({ pkg: corePkg, postcssConfig: { extract: true } });
const BlockquoteConfig = createConfig({ pkg: blockquotePkg });
const ParagraphPkgConfig = createConfig({ pkg: paragraphPkg });
const CalloutPkgConfig = createConfig({ pkg: calloutPkg });
const CodePkgConfig = createConfig({ pkg: codePkg });
const LinkPkgConfig = createConfig({ pkg: linkPkg });
const ListsPkgConfig = createConfig({ pkg: listsPkg });
const HeadingsPkgConfig = createConfig({ pkg: headingsPkg });
const ImagePkgConfig = createConfig({ pkg: imagePkg });
const VideoPkgConfig = createConfig({ pkg: videoPkg });

export default [
  CoreConfig,
  BlockquoteConfig,
  ParagraphPkgConfig,
  CalloutPkgConfig,
  CodePkgConfig,
  LinkPkgConfig,
  ListsPkgConfig,
  HeadingsPkgConfig,
  ImagePkgConfig,
  VideoPkgConfig,
];

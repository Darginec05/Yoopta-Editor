const fs = require('fs');
const path = require('path');
const json = require('rollup-plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const sourceMaps = require('rollup-plugin-sourcemaps');
const replace = require('@rollup/plugin-replace');
const terser = require('@rollup/plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const svgr = require('@svgr/rollup');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const generatePackageJson = require('rollup-plugin-generate-package-json');

const corePkg = require('@yopta/editor/package.json');
const blockquotePkg = require('../packages/yopta-blockquote/package.json');
const paragraphPkg = require('../packages/yopta-paragraph/package.json');
const calloutPkg = require('../packages/yopta-callout/package.json');
const codePkg = require('../packages/yopta-code/package.json');
const linkPkg = require('../packages/yopta-link/package.json');
const listsPkg = require('../packages/yopta-lists/package.json');
const headingsPkg = require('../packages/yopta-headings/package.json');
const imagePkg = require('../packages/yopta-image/package.json');
const videoPkg = require('../packages/yopta-video/package.json');
const suggestionListPkg = require('../packages/actionMenu/package.json');
// const UIHelpersPkg = require('../packages/ui-helpers/package.json');

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
  '@yopta/action-menu-list': 'actionMenu',
  // '@yopta/ui': 'ui-helpers',
};

const getPlugins = ({ postcssConfig, packagePathname }) => {
  return [
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
      tsconfig: `packages/${packagePathname}/tsconfig.json`,
    }),
    sourceMaps(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    isProd && terser(),
  ].filter(Boolean);
};

/**
 * @type {import('rollup').RollupOptions}
 */
const createConfig = ({ pkg, postcssConfig }) => {
  const packagePathname = aliases[pkg.name] || pkg.name;

  return {
    input: `packages/${packagePathname}/src/index.ts`,
    output: [
      {
        format: 'esm',
        sourcemap: isDev,
        globals: { react: 'React' },
        file: `packages/${packagePathname}/${pkg.module}`,
        exports: 'named',
      },
    ],
    plugins: getPlugins({ postcssConfig, packagePathname }),
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
const SuggestionListPkgConfig = createConfig({ pkg: suggestionListPkg });
// const UIHelpersPkgConfig = createConfig({ pkg: UIHelpersPkg });

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
  SuggestionListPkgConfig,
];

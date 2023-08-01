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

const corePkg = require('../packages/yoopta-editor/package.json');
const blockquotePkg = require('../packages/yoopta-blockquote/package.json');
const paragraphPkg = require('../packages/yoopta-paragraph/package.json');
const calloutPkg = require('../packages/yoopta-callout/package.json');
const codePkg = require('../packages/yoopta-code/package.json');
const linkPkg = require('../packages/yoopta-link/package.json');
const listsPkg = require('../packages/yoopta-lists/package.json');
const headingsPkg = require('../packages/yoopta-headings/package.json');
const imagePkg = require('../packages/yoopta-image/package.json');
const videoPkg = require('../packages/yoopta-video/package.json');
const suggestionListPkg = require('../packages/actionMenu/package.json');
const toolbarListPkg = require('../packages/toolbar/package.json');
const marksPkg = require('../packages/marks/package.json');
const rendererPkg = require('../packages/yoopta-renderer/package.json');
const chatGPTPkg = require('../packages/yoopta-chatGPT-assistant/package.json');
const exportsPkg = require('../packages/exports/package.json');
const embedPkg = require('../packages/yoopta-embed/package.json');
const linkToolPkg = require('../packages/linkTool/package.json');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const aliases = {
  '@yoopta/editor': 'yoopta-editor',
  '@yoopta/blockquote': 'yoopta-blockquote',
  '@yoopta/paragraph': 'yoopta-paragraph',
  '@yoopta/callout': 'yoopta-callout',
  '@yoopta/code': 'yoopta-code',
  '@yoopta/link': 'yoopta-link',
  '@yoopta/lists': 'yoopta-lists',
  '@yoopta/headings': 'yoopta-headings',
  '@yoopta/image': 'yoopta-image',
  '@yoopta/video': 'yoopta-video',
  '@yoopta/embed': 'yoopta-embed',
  '@yoopta/action-menu-list': 'actionMenu',
  '@yoopta/toolbar': 'toolbar',
  '@yoopta/marks': 'marks',
  '@yoopta/renderer': 'yoopta-renderer',
  '@yoopta/chat-gpt-assistant': 'yoopta-chatGPT-assistant',
  '@yoopta/exports': 'exports',
  '@yoopta/link-tool': 'linkTool',
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

const CoreConfig = createConfig({ pkg: corePkg });
const BlockquoteConfig = createConfig({ pkg: blockquotePkg });
const ParagraphPkgConfig = createConfig({ pkg: paragraphPkg });
const CalloutPkgConfig = createConfig({ pkg: calloutPkg });
const CodePkgConfig = createConfig({ pkg: codePkg });
const LinkPkgConfig = createConfig({ pkg: linkPkg });
const ListsPkgConfig = createConfig({ pkg: listsPkg });
const HeadingsPkgConfig = createConfig({ pkg: headingsPkg });
const ImagePkgConfig = createConfig({ pkg: imagePkg });
const VideoPkgConfig = createConfig({ pkg: videoPkg });
const EmbedPkgConfig = createConfig({ pkg: embedPkg });
const SuggestionListPkgConfig = createConfig({ pkg: suggestionListPkg });
const ToolbarPkgConfig = createConfig({ pkg: toolbarListPkg });
const MarksPkgConfig = createConfig({ pkg: marksPkg });
const RendererPkgConfig = createConfig({ pkg: rendererPkg });
const ChatGPTPkgConfig = createConfig({ pkg: chatGPTPkg });
const ExportsConfig = createConfig({ pkg: exportsPkg });
const LinkToolConfig = createConfig({ pkg: linkToolPkg });

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
  ToolbarPkgConfig,
  MarksPkgConfig,
  RendererPkgConfig,
  ChatGPTPkgConfig,
  EmbedPkgConfig,
  ExportsConfig,
  LinkToolConfig,
];

import Prism from 'prismjs';
import { NodeEntry, Range } from 'slate';

import 'prismjs/components/prism-antlr4';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cmake';
import 'prismjs/components/prism-coffeescript';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-dart';
// import 'prismjs/components/prism-django';
import 'prismjs/components/prism-docker';
// import 'prismjs/components/prism-ejs';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-perl';
// import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-properties';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-scheme';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-wasm';
import 'prismjs/components/prism-yaml';

const getLength = (token) => {
  if (typeof token === 'string') {
    return token.length;
  }
  if (typeof token.content === 'string') {
    return token.content.length;
  }
  return token.content.reduce((l, t) => l + getLength(t), 0);
};

export function codeDecorator([node, path]: NodeEntry): Range[] {
  const ranges = [];
  // @ts-ignore
  const tokens = Prism.tokenize(node.children[0].text, Prism.languages.javascript);
  let start = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    if (typeof token !== 'string') {
      // @ts-ignore
      ranges.push({
        token: token.type,
        anchor: { path, offset: start },
        focus: { path, offset: end },
      });
    }

    start = end;
  }

  return ranges;
}

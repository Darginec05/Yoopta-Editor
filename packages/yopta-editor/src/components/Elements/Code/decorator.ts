import Prism from 'prismjs';
import { NodeEntry, Range } from 'slate';

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

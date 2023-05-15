import { YoEditor } from '@yoopta/editor';
import Prism from 'prismjs';
import { Editor, Element, Node, NodeEntry, Range, Transforms } from 'slate';
import { normalizeTokens } from './normalizeTokens';

export const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
  console.log('mergeMaps ');

  const map = new Map<K, V>();

  for (const m of maps) {
    for (const item of m) {
      map.set(...item);
    }
  }

  return map;
};

export const getChildNodeToDecorations = ([block, blockPath]: NodeEntry<any>) => {
  const nodeToDecorations = new Map<Element, Range[]>();

  const text = block.children.map((line) => Node.string(line)).join('\n');
  const language = block.data.language;
  let tokens;

  try {
    tokens = Prism.tokenize(text, Prism.languages[language]);
  } catch (error) {
    tokens = Prism.tokenize(text, Prism.languages.javascript);
  }

  const normalizedTokens = normalizeTokens(tokens); // make tokens flat and grouped by line

  const blockChildren = block.children as Element[];

  for (let index = 0; index < normalizedTokens.length; index++) {
    const tokens = normalizedTokens[index];
    const element = blockChildren[index];

    if (!nodeToDecorations.has(element)) {
      nodeToDecorations.set(element, []);
    }

    let start = 0;
    for (const token of tokens) {
      const length = token.content.length;

      if (!length) {
        continue;
      }

      const end = start + length;

      const path = [...blockPath, index, 0];

      const range = {
        anchor: { path, offset: start },
        focus: { path, offset: end },
        token: true,
        ...Object.fromEntries(token.types.map((type) => ['token_type', type])),
      };

      nodeToDecorations.get(element)!.push(range);

      start = end;
    }
  }

  return nodeToDecorations;
};

export const codeLineDecorator =
  (editor: YoEditor) =>
  ([node, path]: NodeEntry) => {
    if (Element.isElement(node) && node.type === 'code-line') {
      const ranges =
        (editor as YoEditor & { nodeToDecorations: (n: Element) => Range[] }).nodeToDecorations(node) || [];

      return ranges;
    }

    return [];
  };

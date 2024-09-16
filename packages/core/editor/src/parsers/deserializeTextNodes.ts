import { Descendant } from 'slate';
import { YooEditor } from '../editor/types';
import { generateId } from '../utils/generateId';

// Move to @yoopta/utils or @yoopta/editor/utils
// helpers for deserializing text nodes when you use custom parsers in your plugins
export function deserializeTextNodes(editor: YooEditor, nodes: NodeListOf<ChildNode>): Descendant[] {
  const deserializedNodes: Descendant[] = [];

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      deserializedNodes.push({
        text: node.textContent || '',
      });
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      if (element.nodeName === 'B' || element.nodeName === 'STRONG') {
        deserializedNodes.push({
          // @ts-ignore [FIXME] - Fix this
          bold: true,
          ...deserializeTextNodes(editor, element.childNodes)[0],
        });
      }

      if (element.nodeName === 'I' || element.nodeName === 'EM') {
        deserializedNodes.push({
          // @ts-ignore [FIXME] - Fix this
          italic: true,
          ...deserializeTextNodes(editor, element.childNodes)[0],
        });
      }

      if (element.nodeName === 'S' || element.nodeName === 'STRIKE') {
        deserializedNodes.push({
          // @ts-ignore [FIXME] - Fix this
          strike: true,
          ...deserializeTextNodes(editor, element.childNodes)[0],
        });
      }

      if (element.nodeName === 'U' || element.nodeName === 'INS') {
        deserializedNodes.push({
          // @ts-ignore [FIXME] - Fix this
          underline: true,
          ...deserializeTextNodes(editor, element.childNodes)[0],
        });
      }

      if (element.nodeName === 'CODE') {
        deserializedNodes.push({
          // @ts-ignore [FIXME] - Fix this
          code: true,
          ...deserializeTextNodes(editor, element.childNodes)[0],
        });
      }

      if (element.nodeName === 'A') {
        deserializedNodes.push({
          id: generateId(),
          type: 'link',
          props: {
            url: element.getAttribute('href') || '',
            target: element.getAttribute('target') || '',
            rel: element.getAttribute('rel') || '',
          },
          children: deserializeTextNodes(editor, element.childNodes),
        });
      }
    }
  });

  // @ts-ignore [FIXME] - Fix this
  if (deserializedNodes.length === 0 && !deserializedNodes[0]?.text) {
    deserializedNodes.push({ text: '' });
  }

  return deserializedNodes;
}

import { generateId, SlateEditor, SlateElement } from '@yoopta/editor';
import { Element, Node, Transforms } from 'slate';

export function withNormalize(slate: SlateEditor): SlateEditor {
  const { normalizeNode } = slate;

  slate.normalizeNode = (entry, options) => {
    const [node, path] = entry;

    if (Element.isElement(node) && node.type === 'table-row') {
      for (const [child, childPath] of Node.children(slate, path)) {
        if (!Element.isElement(child) || child.type !== 'table-data-cell') {
          return Transforms.wrapNodes(
            slate,
            {
              id: generateId(),
              type: 'table-data-cell',
              children: [child],
            } as Element,
            { at: childPath },
          );
        }
      }
    }

    normalizeNode(entry, options);
  };

  return slate;
}

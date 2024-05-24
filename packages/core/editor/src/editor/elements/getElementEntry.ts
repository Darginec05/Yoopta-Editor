import { Editor, Element, Location, NodeEntry, Span } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateElement, YooEditor } from '../types';

export type GetBlockElementEntryOptions = {
  atPath?: Location | Span;
};

export function getElementEntry<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  options?: GetBlockElementEntryOptions,
): NodeEntry<SlateElement<TElementKeys>> | undefined {
  const block = editor.children[blockId];

  if (!block) {
    throw new Error(`Block with id ${blockId} not found`);
  }

  const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });

  if (!slate) {
    console.warn('No slate found');
    return;
  }

  try {
    const [elementEntry] = Editor.nodes<SlateElement>(slate, {
      at: options?.atPath || slate.selection || [0],
      match: (n) => Element.isElement(n) && n.type === elementType,
      mode: 'lowest',
    });

    return elementEntry as NodeEntry<SlateElement<TElementKeys>>;
  } catch (error) {}
}

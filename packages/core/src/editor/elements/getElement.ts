import { Editor, Element, NodeEntry, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateElement, YooEditor } from '../types';

export function getBlockElement<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
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

  const [elementEntry] = Editor.nodes<SlateElement>(slate, {
    at: slate.selection || [0],
    match: (n) => Element.isElement(n) && n.type === elementType,
  });

  return elementEntry as NodeEntry<SlateElement<TElementKeys>>;
}

import { Editor, Element, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateElement, YooEditor } from '../types';

export function deleteBlockElement<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
) {
  const block = editor.children[blockId];

  if (!block) {
    throw new Error(`Block with id ${blockId} not found`);
  }

  const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });

  if (!slate) {
    console.warn('No slate found');
    return;
  }

  Editor.withoutNormalizing(slate, () => {
    const [elementEntry] = Editor.nodes<SlateElement>(slate, {
      at: [0],
      match: (n) => Element.isElement(n) && n.type === elementType,
    });

    editor.applyChanges();
    editor.emit('change', editor.children);
  });
}

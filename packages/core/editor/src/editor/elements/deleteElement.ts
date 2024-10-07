import { Editor, Element, Path, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor } from '../types';

export type DeleteBlockElement = {
  type: string;
  path: Path;
};

export function deleteElement(editor: YooEditor, blockId: string, element: DeleteBlockElement) {
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
    Transforms.removeNodes(slate, {
      at: element.path,
      match: (n) => Element.isElement(n) && n.type === element.type,
    });

    // editor.applyChanges();
    editor.emit('change', editor.children);
  });
}

import { Editor, Transforms } from 'slate';
import { YooEditor } from '../../../types';
import { generateId } from '../../../utils/generateId';
import { getDefaultParagraphLine } from '../utils';

export const withNonEmptyEditor = (editor: YooEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node] = entry;

    if (Editor.isEditor(node) && editor.children.length === 0) {
      const defaultNode = getDefaultParagraphLine(generateId());
      Transforms.insertNodes(editor, defaultNode, {
        at: [0],
      });

      return;
    }

    normalizeNode(entry);
  };

  return editor;
};

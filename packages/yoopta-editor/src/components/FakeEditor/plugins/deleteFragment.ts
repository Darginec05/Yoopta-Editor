import { Editor, Range, Transforms } from 'slate';
import { YooEditor } from '../../../types';

export const withDeleteFragment = (editor: YooEditor) => {
  const { deleteFragment } = editor;

  // Fixes https://github.com/ianstormtaylor/slate/issues/3605
  editor.deleteFragment = () => {
    const { selection } = editor;

    if (!selection) return;

    const [, firstElementPath] = Editor.first(editor, [0]);
    const [, lastElementPath] = Editor.last(editor, [editor.children.length - 1]);

    const fullRange = Editor.range(editor, firstElementPath, lastElementPath);
    const isAllNodesSelected = Range.equals(selection, fullRange);

    if (isAllNodesSelected) {
      Transforms.removeNodes(editor, { mode: 'highest', hanging: true });
      Transforms.select(editor, [0]);
      return;
    }

    deleteFragment();
  };

  return editor;
};

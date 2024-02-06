import { Editor, Node, NodeEntry, Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor, YooptaEditorOptions } from '../types';

export function focusBlock(editor: YooEditor, id: string, options: YooptaEditorOptions = {}) {
  const focusTimeout = setTimeout(() => {
    const slate = editor.blockEditorsMap[id];

    const [firstEntry] = Editor.nodes(slate, {
      at: [0, 0],
      mode: 'lowest',
    });

    // [TODO] - handle case when firstEntry is not defined
    const firstLeafPath = firstEntry[1] || [0, 0];

    Transforms.select(slate, { path: firstLeafPath, offset: 0 });
    ReactEditor.focus(slate);

    clearTimeout(focusTimeout);
  }, 0);
}

import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor, YooptaEditorOptions } from '../types';

// [TODO] - update editor.selection after focus
export function focusBlock(editor: YooEditor, blockId: string, options: YooptaEditorOptions = {}) {
  const focusTimeout = setTimeout(() => {
    const slate = editor.blockEditorsMap[blockId];

    const [firstEntry] = Editor.nodes(slate, {
      at: [0, 0],
      mode: 'lowest',
    });

    // [TODO] - handle case when firstEntry is not defined
    const firstLeafPath = firstEntry[1] || [0, 0];

    // [TODO] - handle offset position. Add 'focusAt' property to options
    Transforms.select(slate, { path: firstLeafPath, offset: 0 });
    ReactEditor.focus(slate);
    editor.setSelection([editor.children[blockId].meta.order]);

    clearTimeout(focusTimeout);
  }, 0);
}

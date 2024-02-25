import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

// [TODO] - update editor.selection after focus
export function focusBlock(
  editor: YooEditor,
  blockId: string,
  options: Pick<YooptaEditorTransformOptions, 'focus' | 'focusAt' | 'slate'> = {},
) {
  setTimeout(() => {
    const slate = options.slate || editor.blockEditorsMap[blockId];
    const block = editor.children[blockId];

    const [firstEntry] = Editor.nodes(slate, {
      at: [0, 0],
      mode: 'lowest',
    });

    // [TODO] - handle case when firstEntry is not defined
    const firstLeafPath = firstEntry[1] || [0, 0];

    // [TODO] - handle offset position. Add 'focusAt' property to options
    Transforms.select(slate, { path: firstLeafPath, offset: 0 });
    ReactEditor.focus(slate);
    editor.setSelection([block.meta.order]);

    // editor.applyChanges();
  }, 0);
}

import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor, YooptaEditorOptions } from '../types';

export function focusBlock(editor: YooEditor, id: string, options: YooptaEditorOptions = {}) {
  const focusTimeout = setTimeout(() => {
    const slate = editor.blockEditorsMap[id];

    Transforms.select(slate, { path: [0, 0], offset: 0 });
    ReactEditor.focus(slate);

    clearTimeout(focusTimeout);
  }, 0);
}

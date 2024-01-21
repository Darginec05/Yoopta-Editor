import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor } from '../../components/Editor/contexts/UltraYooptaContext/UltraYooptaContext';

export function focusBlock(editor: YooEditor, id: string, options = {}) {
  const focusTimeout = setTimeout(() => {
    const slate = editor.blockEditorsMap[id];
    console.log('focusBlock slate', slate);

    Transforms.select(slate, { path: [0, 0], offset: 0 });
    ReactEditor.focus(slate);

    clearTimeout(focusTimeout);
  }, 0);
}

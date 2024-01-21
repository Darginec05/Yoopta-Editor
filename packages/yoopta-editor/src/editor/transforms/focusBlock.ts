import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor } from '../../components/Editor/contexts/UltraYooptaContext/UltraYooptaContext';

export function focusBlock(editor: YooEditor, id: string, options = {}) {
  const focusTimeout = setTimeout(() => {
    console.log('editor', editor);

    const slate = editor.blockEditorsMap[id];
    console.log('slate', slate);
    console.log('id', id);

    Transforms.select(slate, { path: [0, 0], offset: 0 });
    ReactEditor.focus(slate);

    clearTimeout(focusTimeout);
  }, 0);
}

import { createDraft, finishDraft } from 'immer';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorOptions } from '../types';

export function insertBlock(editor: YooEditor, data, options: YooptaEditorOptions = {}) {
  editor.children = createDraft(editor.children);

  const { at = null, focus = false } = options;

  const newBlock = {
    id: generateId(),
    value: data.value,
    type: data.type,
    meta: {
      ...data.meta,
      order: 0,
    },
  };

  if (at) {
    const [position] = at;
    Object.values(editor.children).forEach((plugin) => {
      if (plugin.meta.order >= position) {
        plugin.meta.order += 1;
      }
    });

    newBlock.meta.order = position;
  } else {
    const newIndex = Object.keys(editor.children).length;
    newBlock.meta.order = newIndex;
  }

  editor.children[newBlock.id] = newBlock;
  editor.children = finishDraft(editor.children);

  const slate = withHistory(withReact(createEditor()));
  editor.blockEditorsMap[newBlock.id] = slate;
  editor.applyChanges();

  if (focus) {
    editor.focusBlock(newBlock.id);
  }
}

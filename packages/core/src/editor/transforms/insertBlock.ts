import { createDraft, finishDraft } from 'immer';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorOptions } from '../types';

export function insertBlock(editor: YooEditor, data, options: YooptaEditorOptions = {}) {
  editor.children = createDraft(editor.children);
  const { at = null, focus = false, slate = null } = options;

  const currentBlock = findPluginBlockBySelectionPath(editor);

  const nextBlockPath = at;
  const newPluginBlock = {
    id: generateId(),
    value: data.value,
    type: data.type,
    meta: {
      ...data.meta,
      order: 0,
    },
  };

  let insertBefore = false;

  if (slate && slate.selection) {
    const string = Editor.string(slate, slate.selection.anchor.path);

    const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);
    insertBefore = isStart && string.length > 0;
  }

  if (nextBlockPath) {
    const [position] = nextBlockPath;
    Object.values(editor.children).forEach((plugin) => {
      if (plugin.meta.order >= position) {
        plugin.meta.order += 1;
      }
    });

    newPluginBlock.meta.order = position;
  } else {
    const newIndex = Object.keys(editor.children).length;
    newPluginBlock.meta.order = newIndex;
  }

  const newSlateEditor = withHistory(withReact(createEditor()));
  editor.blockEditorsMap[newPluginBlock.id] = newSlateEditor;

  if (insertBefore && currentBlock) {
    newPluginBlock.meta.order = currentBlock.meta.order;
    currentBlock.meta.order += 1;
  }

  const currentBlockId = currentBlock!.id;

  editor.children[newPluginBlock.id] = newPluginBlock;
  editor.children = finishDraft(editor.children);

  editor.applyChanges();

  if (focus) {
    editor.focusBlock(insertBefore ? currentBlockId : newPluginBlock.id);
  }
}

import { createDraft, finishDraft } from 'immer';
import { Editor } from 'slate';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions, YooptaBlockData } from '../types';

// make blockData optional
export function insertBlock(editor: YooEditor, blockData: YooptaBlockData, options: YooptaEditorTransformOptions = {}) {
  editor.children = createDraft(editor.children);
  const { at = null, focus = false, slate = null } = options;

  const currentBlock = findPluginBlockBySelectionPath(editor);
  const nextBlockPath = at;
  const newPluginBlock = {
    id: generateId(),
    value: blockData.value,
    type: blockData.type,
    meta: {
      ...blockData.meta,
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

  const newSlateEditor = buildSlateEditor(editor);
  editor.blockEditorsMap[newPluginBlock.id] = newSlateEditor;

  if (insertBefore && currentBlock) {
    newPluginBlock.meta.order = currentBlock.meta.order;
    currentBlock.meta.order += 1;
  }

  editor.children[newPluginBlock.id] = newPluginBlock;
  const currentBlockId = currentBlock?.id;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
  editor.emit('change', editor.children);

  if (focus) {
    editor.focusBlock(insertBefore && currentBlockId ? currentBlockId : newPluginBlock.id);
  }
}

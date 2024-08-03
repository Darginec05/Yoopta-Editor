import { createDraft, finishDraft } from 'immer';
import { buildBlockData } from '../../components/Editor/utils';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export type DeleteBlocksOptions = Pick<YooptaEditorTransformOptions, 'focus' | 'focusAt' | 'slate'> & {
  blockIds?: string[];
  paths?: number[];
  deleteAll?: boolean;
};

export function deleteBlocks(editor: YooEditor, options: DeleteBlocksOptions = {}) {
  const { deleteAll = false, paths, blockIds, focus = true } = options;

  if (deleteAll || Object.keys(editor.children).length === 1) {
    editor.children = {};
    editor.blockEditorsMap = {};
    const block = buildBlockData({ id: generateId() });
    const slate = buildSlateEditor(editor);

    editor.children[block.id] = block;
    editor.blockEditorsMap[block.id] = slate;

    editor.setSelection([0]);
    editor.applyChanges();
    editor.emit('change', editor.children);

    if (focus) editor.focusBlock(block.id, { waitExecution: true });

    return;
  }

  if (Array.isArray(blockIds) && blockIds.length > 0) {
    editor.children = createDraft(editor.children);

    blockIds.forEach((id) => {
      delete editor.children[id];
      delete editor.blockEditorsMap[id];
    });

    const blockDataIds = Object.keys(editor.children).sort((a, b) =>
      editor.children[a].meta.order > editor.children[b].meta.order ? 1 : -1,
    );

    blockDataIds.forEach((id, index) => {
      editor.children[id].meta.order = index;
    });

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    editor.emit('change', editor.children);

    if (focus) editor.focusBlock(blockDataIds[0], { waitExecution: true });
    return;
  }

  if (Array.isArray(paths) && paths.length > 0) {
    editor.children = createDraft(editor.children);

    paths.forEach((path) => {
      const block = findPluginBlockBySelectionPath(editor, { at: [path] });
      if (block) {
        delete editor.children[block.id];
        delete editor.blockEditorsMap[block.id];
      }
    });

    const blockDataIds = Object.keys(editor.children).sort((a, b) =>
      editor.children[a].meta.order > editor.children[b].meta.order ? 1 : -1,
    );

    blockDataIds.forEach((id, index) => {
      editor.children[id].meta.order = index;
    });

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    editor.emit('change', editor.children);

    if (focus) editor.focusBlock(blockDataIds[0], { waitExecution: true });

    return;
  }
}

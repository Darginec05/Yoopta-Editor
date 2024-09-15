import { createDraft, finishDraft } from 'immer';
import { buildBlockData } from '../../components/Editor/utils';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export type DeleteBlockOptions = YooptaEditorTransformOptions & {
  deleteAll?: boolean;
  fromPaths?: number[];
};

export function deleteBlock(editor: YooEditor, options: DeleteBlockOptions = {}) {
  const { at = editor.selection, deleteAll = false, fromPaths, focus } = options;

  if (Array.isArray(fromPaths) && fromPaths.length > 0) {
    editor.children = createDraft(editor.children);

    // [TODO] - check deleting blocks from paths before
    fromPaths.forEach((path) => {
      const block = findPluginBlockBySelectionPath(editor, { at: [path] });
      if (block) {
        delete editor.children[block.id];
        delete editor.blockEditorsMap[block.id];

        const plugin = editor.plugins[block.type];
        const pluginEvents = plugin.events || {};
        const { onDestroy } = pluginEvents;

        onDestroy?.(editor, block.id);
      }
    });

    // Reorder blocks
    const blockDataKeys = Object.keys(editor.children);

    blockDataKeys.forEach((id, index) => {
      editor.children[id].meta.order = index;
    });

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    editor.emit('change', editor.children);
    return;
  }

  if (deleteAll || Object.keys(editor.children).length === 1) {
    editor.children = {};
    editor.blockEditorsMap = {};
    const block = buildBlockData({ id: generateId() });
    const slate = buildSlateEditor(editor);

    editor.children[block.id] = block;
    editor.blockEditorsMap[block.id] = slate;

    editor.setSelection([0]);
    editor.setBlockSelected(null);
    editor.focusBlock(block.id, { slate, waitExecution: true });

    editor.applyChanges();
    editor.emit('change', editor.children);
    return;
  }

  if (!at) return;
  editor.children = createDraft(editor.children);

  const [position] = at;
  const blockDataKeys = Object.keys(editor.children);

  const blockIdToDelete = blockDataKeys.find((id) => editor.children[id].meta.order === position);

  blockDataKeys.forEach((blockId) => {
    const blockData = editor.children[blockId];
    if (blockData.meta.order > position) blockData.meta.order -= 1;
  });

  if (blockIdToDelete) {
    const block = editor.children[blockIdToDelete];
    const plugin = editor.plugins[block.type];

    delete editor.children[blockIdToDelete];
    delete editor.blockEditorsMap[blockIdToDelete];

    const pluginEvents = plugin.events || {};
    const { onDestroy } = pluginEvents;

    onDestroy?.(editor, blockIdToDelete);
  }

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
  editor.emit('change', editor.children);

  if (focus) {
    const prevBlockPathIndex = editor.selection ? editor.selection[0] - 1 : 0;
    const prevBlock = findPluginBlockBySelectionPath(editor, { at: [prevBlockPathIndex] });

    if (prevBlock) editor.focusBlock(prevBlock.id, { focusAt: options.focusAt });
  }
}

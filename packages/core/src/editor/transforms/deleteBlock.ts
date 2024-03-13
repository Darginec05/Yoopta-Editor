import { createDraft, finishDraft } from 'immer';
import { buildBlockData } from '../../components/Editor/utils';
import { buildSlateEditor } from '../../utils/editorBuilders';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export type DeleteBlockOptions = YooptaEditorTransformOptions & {
  deleteAll?: boolean;
  fromPaths?: number[];
};

export function deleteBlock(editor: YooEditor, options: DeleteBlockOptions = {}) {
  const { at = editor.selection, deleteAll = false, fromPaths, focus } = options;

  console.log('BEFORE options.focusAt', options.focusAt);

  if (Array.isArray(fromPaths) && fromPaths.length > 0) {
    editor.children = createDraft(editor.children);

    // [TODO] - check deleting blocks from paths before
    fromPaths.forEach((path) => {
      const block = findPluginBlockBySelectionPath(editor, { at: [path] });
      if (block) {
        delete editor.children[block.id];
        delete editor.blockEditorsMap[block.id];
      }
    });

    // Reorder blocks
    const pluginKeys = Object.keys(editor.children);

    pluginKeys.forEach((id, index) => {
      editor.children[id].meta.order = index;
    });

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    return;
  }

  if (deleteAll || Object.keys(editor.children).length === 1) {
    editor.children = {};
    editor.blockEditorsMap = {};
    const defaultBlock = buildBlockData({ id: generateId() });
    const slate = buildSlateEditor(editor);

    editor.children[defaultBlock.id] = defaultBlock;
    editor.blockEditorsMap[defaultBlock.id] = slate;

    editor.setSelection([0]);
    editor.setBlockSelected(null);
    editor.focusBlock(defaultBlock.id, { slate, waitExecution: true });

    editor.applyChanges();
    return;
  }

  if (!at) return;
  editor.children = createDraft(editor.children);

  const [position] = at;
  const pluginKeys = Object.keys(editor.children);

  const pluginToDeleteId = pluginKeys.find((id) => editor.children[id].meta.order === position);

  pluginKeys.forEach((blockId) => {
    const plugin = editor.children[blockId];
    if (plugin.meta.order > position) plugin.meta.order -= 1;
  });

  if (pluginToDeleteId) {
    delete editor.children[pluginToDeleteId];
    delete editor.blockEditorsMap[pluginToDeleteId];
  }

  editor.children = finishDraft(editor.children);
  editor.applyChanges();

  if (focus) {
    const prevBlockPathIndex = editor.selection ? editor.selection[0] - 1 : 0;
    const prevBlock = findPluginBlockBySelectionPath(editor, { at: [prevBlockPathIndex] });

    console.log('AFTER options.focusAt', options.focusAt);

    if (prevBlock) editor.focusBlock(prevBlock.id, { focusAt: options.focusAt });
  }
}

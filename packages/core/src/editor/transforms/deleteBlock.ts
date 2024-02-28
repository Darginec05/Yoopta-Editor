import { createDraft, finishDraft } from 'immer';
import { getDefaultParagraphBlock } from '../../components/Editor/defaultValue';
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

  if (Array.isArray(fromPaths) && fromPaths.length > 0) {
    editor.children = createDraft(editor.children);

    fromPaths.forEach((path) => {
      const plugin = findPluginBlockBySelectionPath(editor, { at: [path] });
      if (plugin) {
        delete editor.children[plugin.id];
        delete editor.blockEditorsMap[plugin.id];
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

  if (deleteAll) {
    editor.children = {};
    editor.blockEditorsMap = {};
    const defaultBlock = getDefaultParagraphBlock(generateId());
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

  if (pluginKeys.length === 1) return;

  const pluginToDeleteId = pluginKeys.find((id) => editor.children[id].meta.order === position);

  pluginKeys.forEach((pluginId) => {
    const plugin = editor.children[pluginId];
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

    if (prevBlock) editor.focusBlock(prevBlock.id, { focusAt: options.focusAt });
  }
}

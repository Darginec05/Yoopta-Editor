import { createDraft, finishDraft } from 'immer';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export function deleteBlock(editor: YooEditor, options: YooptaEditorTransformOptions = {}) {
  const { at = editor.selection, focus } = options;

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

    // [TODO] - add focusAt property to options to focus at offset
    if (prevBlock) editor.focusBlock(prevBlock.id);
  }
}

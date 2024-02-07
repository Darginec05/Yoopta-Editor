import { createDraft, finishDraft } from 'immer';
import { YooEditor, YooptaEditorOptions } from '../types';

export function deleteBlock(editor: YooEditor, options: YooptaEditorOptions = {}) {
  const { at = editor.selection } = options;

  if (!at) return;

  editor.children = createDraft(editor.children);
  const [position] = at;
  const pluginKeys = Object.keys(editor.children);
  const pluginToDeleteId = pluginKeys.find((id) => editor.children[id].meta.order === position);

  pluginKeys.forEach((pluginId) => {
    const plugin = editor.children[pluginId];
    if (plugin.meta.order > position) plugin.meta.order -= 1;
  });

  if (pluginToDeleteId) delete editor.children[pluginToDeleteId];

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
}

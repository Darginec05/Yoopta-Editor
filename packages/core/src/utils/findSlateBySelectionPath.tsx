import { YooEditor } from '../editor/types';

export function findSlateBySelectionPath(editor: YooEditor) {
  const childrenKeys = Object.keys(editor.children);

  const pluginId = childrenKeys.find((childrenId) => {
    const plugin = editor.children[childrenId];
    return plugin.meta.order === editor.selection?.[0];
  });

  if (!pluginId) return null;
  return editor.blockEditorsMap[pluginId];
}

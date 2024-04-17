import { YooEditor } from '../editor/types';

type Options = {
  type: string;
};

export function findPluginBlockByType(editor: YooEditor, options: Options) {
  const childrenKeys = Object.keys(editor.children);
  const { type } = options || {};

  const blockId = childrenKeys.find((childrenId) => {
    const plugin = editor.children[childrenId];
    return plugin.type === type;
  });

  if (!blockId) return null;
  return editor.children[blockId];
}

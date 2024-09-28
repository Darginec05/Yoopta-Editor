import { YooEditor, YooptaBlockPath } from '../types';

export type GetBlockOptions = {
  at?: YooptaBlockPath | null;
  id?: string;
};

export function getBlock(editor: YooEditor, options: GetBlockOptions) {
  if (!options?.id && !options?.at) {
    throw new Error('getBlock requires either an id or at');
  }

  if (options?.id) {
    return editor.children[options?.id];
  }

  const childrenKeys = Object.keys(editor.children);

  const blockId = childrenKeys.find((childrenId) => {
    const plugin = editor.children[childrenId];
    return plugin.meta.order === options?.at?.[0];
  });

  if (!blockId) return null;
  return editor.children[blockId];
}

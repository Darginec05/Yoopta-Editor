import { SlateEditor, YooEditor, YooptaBlockData, YooptaBlockPath } from '../types';

export type GetSlateOptions = {
  at?: YooptaBlockPath;
  id?: string;
};

export function getSlate(editor: YooEditor, options: GetSlateOptions): SlateEditor {
  if (!options?.id && !options?.at) {
    throw new Error('getSlate requires either an id or at');
  }

  const blockId =
    options?.id ||
    Object.keys(editor.children).find((childrenId) => {
      const plugin = editor.children[childrenId];
      return plugin.meta.order === options?.at?.[0];
    });

  const slate = editor.blockEditorsMap[blockId || ''];
  const blockData = editor.children[blockId || ''] as YooptaBlockData;
  const blockEntity = editor.blocks[blockData?.type || ''];

  if (!blockEntity?.hasCustomEditor && !slate) {
    throw new Error(`Slate not found with params: ${JSON.stringify(options)}`);
  }

  return slate;
}

import { YooEditor, YooptaBlockData, YooptaPath } from '../types';

export function isBlockSelected(editor: YooEditor, block: YooptaBlockData): boolean {
  const selected = editor.path.selected;

  if (Array.isArray(selected)) {
    return selected.includes(block.meta.order);
  }

  return false;
}

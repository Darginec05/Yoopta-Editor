import { YooptaBlockData, YooptaBlockPath } from '../types';

export function isBlockSelected(block: YooptaBlockData, selection: YooptaBlockPath): boolean {
  const selected = selection[1];

  if (Array.isArray(selected)) {
    return selected.includes(block.meta.order);
  }

  return false;
}

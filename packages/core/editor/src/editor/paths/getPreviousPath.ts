import { YooptaBlockPath } from '../types';

export function getPreviousPath(selection: YooptaBlockPath): YooptaBlockPath | null {
  const path = selection[0];
  const selected = selection[1];
  if (typeof path === 'number') {
    return [path - 1, selected];
  }

  return null;
}

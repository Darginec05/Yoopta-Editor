import { YooptaBlockPath } from '../types';

export function getSelectedPaths(selection: YooptaBlockPath): YooptaBlockPath[1] {
  const selected = selection[1];
  return selected;
}

import { YooptaBlockPath } from '../types';

export function getPath(selection: YooptaBlockPath): YooptaBlockPath[0] {
  const path = selection[0];
  return path;
}

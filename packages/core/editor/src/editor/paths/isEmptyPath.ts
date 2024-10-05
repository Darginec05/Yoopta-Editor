import { YooptaBlockPath } from '../types';

export function isEmptyPath(path: YooptaBlockPath): boolean {
  return path[0] === null;
}

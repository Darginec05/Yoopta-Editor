import { getPreviousPath } from './getPreviousPath';
import { getNextPath } from './getNextPath';
import { isBlockSelected } from './isBlockSelected';
import { getPath } from './getPath';
import { getSelectedPaths } from './getSelectedPaths';
import { isPathEmpty } from './isPathEmpty';
import { setPath } from './setPath';

export const Paths = {
  getPath,
  getNextPath,
  getPreviousPath,
  isBlockSelected,
  getSelectedPaths,
  isPathEmpty,
  setPath,
};

export type Paths = typeof Paths;

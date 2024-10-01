import { getPreviousPath } from './getPreviousPath';
import { getNextPath } from './getNextPath';
import { isBlockSelected } from './isBlockSelected';
import { getPath } from './getPath';
import { getSelectedPaths } from './getSelectedPaths';

export const Paths = {
  getPath,
  getNextPath,
  getPreviousPath,
  isBlockSelected,
  getSelectedPaths,
};

export type Paths = typeof Paths;

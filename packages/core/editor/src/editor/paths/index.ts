import { getPreviousPath } from './getPreviousPath';
import { getNextPath } from './getNextPath';
import { isBlockSelected } from './isBlockSelected';
import { getPath } from './getPath';
import { getSelectedPaths } from './getSelectedPaths';
import { isEmptyPath } from './isEmptyPath';

export const Paths = {
  getPath,
  getNextPath,
  getPreviousPath,
  isBlockSelected,
  getSelectedPaths,
  isEmptyPath,
};

export type Paths = typeof Paths;

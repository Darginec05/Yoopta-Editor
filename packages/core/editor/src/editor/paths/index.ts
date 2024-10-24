import { getPreviousPath } from './getPreviousPath';
import { getNextPath } from './getNextPath';
import { isBlockSelected } from './isBlockSelected';
import { getPath } from './getPath';
import { getSelectedPaths } from './getSelectedPaths';
import { isPathEmpty } from './isPathEmpty';
import { setPath } from './setPath';
import { getLastNodePoint } from '../../utils/getLastNodePoint';

export const Paths = {
  getPath,
  getNextPath,
  getPreviousPath,
  isBlockSelected,
  getSelectedPaths,
  isPathEmpty,
  setPath,
  getLastNodePoint,
};

export type Paths = typeof Paths;

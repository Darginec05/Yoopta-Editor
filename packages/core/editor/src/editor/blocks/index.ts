import { insertBlock } from './insertBlock';
import { deleteBlock } from './deleteBlock';
import { moveBlock } from './moveBlock';
import { focusBlock } from './focusBlock';
import { splitBlock } from './splitBlock';
import { increaseBlockDepth } from './increaseBlockDepth';
import { decreaseBlockDepth } from './decreaseBlockDepth';
import { duplicateBlock } from './duplicateBlock';
import { updateBlock } from './updateBlock';
import { toggleBlock } from './toggleBlock';
import { getBlock } from './getBlock';
import { getSlate } from './getSlate';
import { buildDefaultChildren, buildBlockData } from './buildBlockData';

export const Blocks = {
  insertBlock,
  deleteBlock,
  moveBlock,
  focusBlock,
  splitBlock,
  increaseBlockDepth,
  decreaseBlockDepth,
  duplicateBlock,
  updateBlock,
  toggleBlock,
  getBlock,
  getSlate,
  buildDefaultChildren,
  buildBlockData,
};

export type Blocks = typeof Blocks;

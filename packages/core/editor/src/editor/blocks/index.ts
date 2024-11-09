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
import { getBlockSlate } from './getBlockSlate';
import { mergeBlock } from './mergeBlock';
import { buildBlockData } from './buildBlockData';

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
  getBlockSlate,
  buildBlockData,
  mergeBlock,
};

export type Blocks = typeof Blocks;

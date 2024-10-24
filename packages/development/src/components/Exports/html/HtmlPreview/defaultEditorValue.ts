import { Blocks } from '@yoopta/editor';

const block = Blocks.buildBlockData();

export const HTML_EDITOR_DEFAULT_VALUE = {
  [block.id]: block,
};

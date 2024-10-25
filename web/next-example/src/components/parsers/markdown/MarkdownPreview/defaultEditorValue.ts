import { Blocks } from '@yoopta/editor';

const block = Blocks.buildBlockData();

export const MARKDOWN_EDITOR_DEFAULT_VALUE = {
  [block.id]: block,
};

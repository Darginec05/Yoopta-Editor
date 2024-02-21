import { createYooptaPlugin } from '@yoopta/editor';
import { BlockquoteRender } from '../ui/Blockquote';

const Blockquote = createYooptaPlugin({
  type: 'BlockquotePlugin',
  elements: {
    blockquote: {
      render: BlockquoteRender,
    },
  },
  options: {
    displayLabel: 'Blockquote',
    shortcuts: ['>'],
  },
});

export { Blockquote };

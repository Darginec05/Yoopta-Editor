import { YooptaPlugin } from '@yoopta/editor';
import { BlockquoteRender } from '../ui/Blockquote';

const Blockquote = new YooptaPlugin({
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

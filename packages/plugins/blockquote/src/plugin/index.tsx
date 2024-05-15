import { YooptaPlugin } from '@yoopta/editor';
import { BlockquoteRender } from '../ui/Blockquote';

const Blockquote = new YooptaPlugin({
  type: 'Blockquote',
  elements: {
    blockquote: {
      render: BlockquoteRender,
    },
  },
  options: {
    display: {
      title: 'Blockquote',
      description: 'Capture quote',
    },
    shortcuts: ['>'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['BLOCKQUOTE'],
      },
    },
  },
});

export { Blockquote };

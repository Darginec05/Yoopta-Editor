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
      serialize: (element, text) => {
        return `<blockquote style="border-left: 3px solid; color: #292929; padding: 2px 14px; margin-top: 8px;">${text}</blockquote>`;
      },
    },
  },
});

export { Blockquote };

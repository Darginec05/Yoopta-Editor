import { Elements, generateId, YooptaPlugin } from '@yoopta/editor';
import { Element, Transforms } from 'slate';
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
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        return `<blockquote data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}; border-left: 3px solid; color: #292929; padding: 2px 14px; margin-top: 8px;">${text}</blockquote>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `> ${text}`;
      },
    },
  },
});

export { Blockquote };

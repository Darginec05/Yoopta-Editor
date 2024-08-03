import { YooptaPlugin } from '@yoopta/editor';
import { Element, Transforms } from 'slate';
import { ParagraphRender } from '../ui/Paragraph';

const Paragraph = new YooptaPlugin({
  type: 'Paragraph',
  elements: {
    paragraph: {
      render: ParagraphRender,
    },
  },
  options: {
    display: {
      title: 'Text',
      description: 'Start writing plain text.',
    },
    shortcuts: ['p', 'text'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['P'],
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        return `<p data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">${text}</p>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `${text}\n`;
      },
    },
  },
});

export { Paragraph };

import { YooptaPlugin } from '@yoopta/editor';
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
      serialize: (element, text) => {
        return `<p>${text}</p>`;
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

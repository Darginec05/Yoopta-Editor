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
        return `<p style="color: #292929; padding: 0; margin: 0">${text}</p>`;
      },
    },
  },
});

export { Paragraph };

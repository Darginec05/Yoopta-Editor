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
});

export { Paragraph };

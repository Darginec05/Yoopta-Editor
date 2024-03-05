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
    displayLabel: 'Text',
    shortcuts: ['p', 'text'],
  },
});

export { Paragraph };

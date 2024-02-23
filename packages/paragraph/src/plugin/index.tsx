import { createYooptaPlugin } from '@yoopta/editor';
import { ParagraphRender } from '../ui/Paragraph';

const Paragraph = createYooptaPlugin({
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

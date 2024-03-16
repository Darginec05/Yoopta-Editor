import { YooptaPlugin } from '@yoopta/editor';
import { BlockquoteRender } from '../ui/Blockquote';

const Blockquote = new YooptaPlugin({
  type: 'Blockquote',
  elements: {
    blockquote: {
      render: BlockquoteRender,
    },
  },
  // parsers: {
  //   html: {
  //     deserialize: (el, next) => {
  //       if (el.tagName.toLowerCase() === 'blockquote') {
  //         return {
  //           object: 'block',
  //           type: 'blockquote',
  //           nodes: next(el.childNodes),
  //         };
  //       }
  //     }
  //   }
  // },
  options: {
    display: {
      title: 'Blockquote',
      description: 'Capture quote',
    },
    shortcuts: ['>'],
  },
});

export { Blockquote };

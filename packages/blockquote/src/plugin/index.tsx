import { YooptaPlugin } from '@yoopta/editor';
import { BlockquoteRenderer } from '../render/BlockquoteRenderer';

const Blockquote = new YooptaPlugin({
  type: 'Blockquote',
  elements: {
    blockquote: {
      render: (props) => (
        <BlockquoteRenderer element={props.element} attributes={props.attributes} block={props.block}>
          {props.children}
        </BlockquoteRenderer>
      ),
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

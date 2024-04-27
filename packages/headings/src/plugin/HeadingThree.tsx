import { YooptaPlugin } from '@yoopta/editor';
import { HeadingThreeRender } from '../render/HeadingThreeRender';

const HeadingThree = new YooptaPlugin({
  type: 'HeadingThree',
  elements: {
    'heading-three': {
      render: (props) => (
        <HeadingThreeRender
          attributes={props.attributes}
          element={props.element}
          block={props.block}
          blockId={props.blockId}
        >
          {props.children}
        </HeadingThreeRender>
      ),
      props: {
        nodeType: 'block',
      },
    },
  },
  options: {
    display: {
      title: 'Heading 3',
      description: 'Small section heading',
    },
    shortcuts: ['h3', '###'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['H3'],
      },
    },
  },
});

export { HeadingThree };

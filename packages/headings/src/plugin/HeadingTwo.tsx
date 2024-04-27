import { YooptaPlugin } from '@yoopta/editor';
import { HeadingTwoRender } from '../render/HeadingTwoRender';

const HeadingTwo = new YooptaPlugin({
  type: 'HeadingTwo',
  elements: {
    'heading-two': {
      render: (props) => (
        <HeadingTwoRender
          attributes={props.attributes}
          element={props.element}
          block={props.block}
          blockId={props.blockId}
        >
          {props.children}
        </HeadingTwoRender>
      ),
      props: {
        nodeType: 'block',
      },
    },
  },
  options: {
    display: {
      title: 'Heading 2',
      description: 'Medium section heading',
    },
    shortcuts: ['h2', '##'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['H2'],
      },
    },
  },
});

export { HeadingTwo };

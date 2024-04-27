import { YooptaPlugin, PluginElementRenderProps } from '@yoopta/editor';
import { HeadingOneRender } from '../render/HeadingOneRender';

const HeadingOne = new YooptaPlugin({
  type: 'HeadingOne',
  elements: {
    'heading-one': {
      render: (props) => (
        <HeadingOneRender
          attributes={props.attributes}
          element={props.element}
          block={props.block}
          blockId={props.blockId}
        >
          {props.children}
        </HeadingOneRender>
      ),
      props: {
        nodeType: 'block',
      },
    },
  },
  options: {
    display: {
      title: 'Heading 1',
      description: 'Big section heading',
    },
    shortcuts: ['h1', '#', '*'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['H1'],
      },
      serialize: (block) => '',
    },
  },
});

export { HeadingOne };

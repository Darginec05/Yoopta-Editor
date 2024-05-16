import { PluginElementRenderProps, YooptaPlugin } from '@yoopta/editor';

const HeadingThreeRender = ({ attributes, children, element, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  return (
    <h3
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className={`yoopta-heading-three ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = new YooptaPlugin({
  type: 'HeadingThree',
  elements: {
    'heading-three': {
      render: HeadingThreeRender,
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

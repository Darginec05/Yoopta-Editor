import { PluginElementRenderProps, YooptaPlugin } from '@yoopta/editor';

const HeadingTwoRender = ({ attributes, children, element, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  return (
    <h2 id={element.id} draggable={false} className={`yoopta-heading-two ${className}`} {...htmlAttrs} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = new YooptaPlugin({
  type: 'HeadingTwo',
  elements: {
    'heading-two': {
      render: HeadingTwoRender,
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

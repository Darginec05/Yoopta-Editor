import { YooptaPlugin, PluginElementRenderProps } from '@yoopta/editor';

const HeadingOneRender = ({ attributes, children, element, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  return (
    <h1 id={element.id} draggable={false} className={`yoopta-heading-one ${className}`} {...htmlAttrs} {...attributes}>
      {children}
    </h1>
  );
};

HeadingOneRender.displayName = 'HeadingOne';

const HeadingOne = new YooptaPlugin({
  type: 'HeadingOne',
  elements: {
    'heading-one': {
      render: HeadingOneRender,
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
      serialize: (element, text) => {
        return `<h1>${text}</h1>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `# ${text}`;
      },
    },
  },
});

export { HeadingOne };

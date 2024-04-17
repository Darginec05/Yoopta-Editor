import { YooptaPlugin, PluginElementRenderProps } from '@yoopta/editor';

const HeadingOneRender = ({ attributes, children, element, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className, ...htmlAttrs } = HTMLAttributes;

  return (
    <h1
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className={`yoo-h-mt-6 yoo-h-scroll-m-20 yoo-h-text-4xl yoo-h-font-bold yoo-h-tracking-tight yoo-h-lg:text-3x ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
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
      serialize: (block) => '',
    },
  },
});

export { HeadingOne };

import { PluginElementRenderProps, YooptaPlugin } from '@yoopta/editor';

const HeadingThreeRender = ({ attributes, children, element, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className, ...htmlAttrs } = HTMLAttributes;

  return (
    <h3
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className={`yoo-h-mt-2 yoo-h-scroll-m-20 yoo-h-text-2xl yoo-h-font-semibold yoo-h-tracking-tight ${className}`}
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

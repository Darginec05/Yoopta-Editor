import { PluginElementRenderProps, YooptaPlugin } from '@yoopta/editor';

const HeadingThreeRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, HTMLAttributes = {}, attributes, children } = props;
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  if (extendRender) return extendRender(props);

  return (
    <h3
      id={element.id}
      draggable={false}
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
      serialize: (element, text) => {
        return `<h3>${text}</h3>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `### ${text}\n`;
      },
    },
  },
});

export { HeadingThree };

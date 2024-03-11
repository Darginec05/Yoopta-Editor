import { YooptaPlugin } from '@yoopta/editor';

const HeadingOneRender = ({ attributes, children, element }) => {
  return (
    <h1
      id={element.id}
      draggable={false}
      className="yoo-h-mt-6 yoo-h-scroll-m-20 yoo-h-text-4xl yoo-h-font-bold yoo-h-tracking-tight yoo-h-lg:text-5xl"
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
    displayLabel: 'Heading 1',
    shortcuts: ['h1', '#', '*'],
  },
});

export { HeadingOne };

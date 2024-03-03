import { createYooptaPlugin } from '@yoopta/editor';

const HeadingOneRender = ({ attributes, children, element }) => {
  return (
    <h1
      id={element.id}
      draggable={false}
      className="mt-6 scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl"
      {...attributes}
    >
      {children}
    </h1>
  );
};

HeadingOneRender.displayName = 'HeadingOne';

const HeadingOne = createYooptaPlugin({
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

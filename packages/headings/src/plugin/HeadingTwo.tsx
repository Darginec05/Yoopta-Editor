import { YooptaPlugin } from '@yoopta/editor';

const HeadingTwoRender = ({ attributes, children, element }) => {
  return (
    <h2
      id={element.id}
      draggable={false}
      className="scroll-m-20 mt-4 text-3xl font-semibold tracking-tight"
      {...attributes}
    >
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
    displayLabel: 'Heading 2',
    shortcuts: ['h2', '##'],
  },
});

export { HeadingTwo };

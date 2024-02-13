import { createYooptaPlugin } from '@yoopta/editor';

const HeadingTwoRender = ({ attributes, children, element }) => {
  return (
    <h2
      id={element.id}
      draggable={false}
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      {...attributes}
    >
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = createYooptaPlugin({
  type: 'HeadingTwo',
  elements: {
    'heading-two': {
      render: HeadingTwoRender,
      options: {
        nodeType: 'block',
      },
    },
  },
});

export { HeadingTwo };

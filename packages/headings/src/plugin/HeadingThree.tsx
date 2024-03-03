import { createYooptaPlugin } from '@yoopta/editor';

const HeadingThreeRender = ({ attributes, children, element }) => {
  return (
    <h3
      id={element.id}
      draggable={false}
      className="mt-2 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...attributes}
    >
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = createYooptaPlugin({
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
    displayLabel: 'Heading 3',
    shortcuts: ['h3', '###'],
  },
});

export { HeadingThree };

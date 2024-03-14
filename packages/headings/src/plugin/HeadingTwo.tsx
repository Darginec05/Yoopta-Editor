import { YooptaPlugin } from '@yoopta/editor';

const HeadingTwoRender = ({ attributes, children, element }) => {
  return (
    <h2
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className="yoo-h-scroll-m-20 yoo-h-mt-4 yoo-h-text-3xl yoo-h-font-semibold yoo-h-tracking-tight"
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

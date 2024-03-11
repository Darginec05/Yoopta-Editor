import { YooptaPlugin } from '@yoopta/editor';

const HeadingThreeRender = ({ attributes, children, element }) => {
  return (
    <h3
      id={element.id}
      draggable={false}
      className="yoo-h-mt-2 yoo-h-scroll-m-20 yoo-h-text-2xl yoo-h-font-semibold yoo-h-tracking-tight"
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
    displayLabel: 'Heading 3',
    shortcuts: ['h3', '###'],
  },
});

export { HeadingThree };

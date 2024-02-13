import { createYooptaPlugin } from '@yoopta/editor';

const HeadingThreeRender = ({ attributes, children, element }) => {
  return (
    <h3 id={element.id} draggable={false} className="scroll-m-20 text-2xl font-semibold tracking-tight" {...attributes}>
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
      options: {
        nodeType: 'block',
      },
    },
  },
});

export { HeadingThree };

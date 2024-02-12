import { createYooptaPlugin } from '@yoopta/editor';
import s from './HeadingThree.module.scss';

const HeadingThreeRender = ({ attributes, children, element }) => {
  return (
    <h3 id={element.id} draggable={false} className={s['heading-three']} {...attributes}>
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

import { createYooptaPlugin } from '@yoopta/editor';
import s from './HeadingOne.module.scss';

const HeadingOneRender = ({ attributes, children, element }) => {
  return (
    <h1 id={element.id} draggable={false} className={s['heading-one']} {...attributes}>
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
      options: {
        nodeType: 'block',
      },
    },
  },
});

export { HeadingOne };

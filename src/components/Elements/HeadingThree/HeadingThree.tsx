import { memo } from 'react';
import s from './HeadingThree.module.scss';

const HeadingThree = memo<ElementProps>(({ attributes, children }) => {
  return (
    <h1 className={s['heading-one']} draggable={false} {...attributes}>
      {children}
    </h1>
  );
});

HeadingThree.displayName = 'HeadingThree';

export { HeadingThree };

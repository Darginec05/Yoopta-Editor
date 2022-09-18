import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './HeadingThree.module.scss';

const HeadingThree = memo<ElementProps>(({ attributes, children }) => {
  return (
    <h1 className={s['heading-three']} draggable={false} {...attributes}>
      {children}
    </h1>
  );
});

HeadingThree.displayName = 'HeadingThree';

export { HeadingThree };

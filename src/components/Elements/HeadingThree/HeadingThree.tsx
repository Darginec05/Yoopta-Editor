import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './HeadingThree.module.scss';

const HeadingThree = memo<ElementProps>(({ attributes, children }) => {
  return (
    <h3 className={s['heading-three']} draggable={false} {...attributes}>
      {children}
    </h3>
  );
});

HeadingThree.displayName = 'HeadingThree';

export { HeadingThree };

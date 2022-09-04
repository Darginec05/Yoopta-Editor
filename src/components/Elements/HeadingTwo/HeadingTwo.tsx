import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './HeadingTwo.module.scss';

const HeadingTwo = memo<ElementProps>(({ attributes, children }) => {
  return (
    <h1 className={s['heading-one']} draggable={false} {...attributes}>
      {children}
    </h1>
  );
});

HeadingTwo.displayName = 'HeadingTwo';

export { HeadingTwo };

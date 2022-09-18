import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './HeadingTwo.module.scss';

const HeadingTwo = memo<ElementProps>(({ attributes, children }) => {
  return (
    <h2 className={s['heading-two']} draggable={false} {...attributes}>
      {children}
    </h2>
  );
});

HeadingTwo.displayName = 'HeadingTwo';

export { HeadingTwo };

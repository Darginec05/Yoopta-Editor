import { memo } from 'react';
import s from './HeadingOne.module.scss';

const HeadingOne = memo<ElementProps>(({ attributes, children }) => {
  return (
    <h1 className={s['heading-one']} draggable={false} {...attributes}>
      {children}
    </h1>
  );
});

HeadingOne.displayName = 'HeadingOne';

export { HeadingOne };

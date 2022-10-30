import { memo } from 'react';
import cx from 'classnames';
import { ElementProps } from '../../Editor/types';
import s from './HeadingTwo.module.scss';
import { getElementClassname } from '../../Editor/utils';

const HeadingTwo = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <h2 className={cx(s['heading-two'], getElementClassname(element))} draggable={false} {...attributes}>
      {children}
    </h2>
  );
});

HeadingTwo.displayName = 'HeadingTwo';

export { HeadingTwo };

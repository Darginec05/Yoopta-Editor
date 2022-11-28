import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './HeadingOne.module.scss';

const HeadingOne = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <h1 className={cx(s['heading-one'], getElementClassname(element))} draggable={false} {...attributes}>
      {children}
    </h1>
  );
});

HeadingOne.displayName = 'HeadingOne';

export { HeadingOne };

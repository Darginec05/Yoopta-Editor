import { memo } from 'react';
import cx from 'classnames';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Callout.module.scss';

const Callout = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <div draggable={false} className={cx(s.callout, getElementClassname(element))} {...attributes}>
      {children}
    </div>
  );
});

Callout.displayName = 'Callout';

export { Callout };

import { memo } from 'react';
import cx from 'classnames';
import { ElementProps } from '../../Editor/types';
import s from './Callout.module.scss';
import { getElementClassname } from '../../Editor/utils';

const Callout = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <div draggable={false} className={cx(s.callout, getElementClassname(element))} {...attributes}>
      {children}
    </div>
  );
});

Callout.displayName = 'Callout';

export { Callout };

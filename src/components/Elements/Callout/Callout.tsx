import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './Callout.module.scss';

const Callout = memo<ElementProps>(({ attributes, children }) => {
  return (
    <div draggable={false} className={s.callout} {...attributes}>
      {children}
    </div>
  );
});

Callout.displayName = 'Callout';

export { Callout };

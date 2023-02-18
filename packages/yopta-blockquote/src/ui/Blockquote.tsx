import { memo } from 'react';
import cx from 'classnames';
import s from './Blockquote.module.scss';

const Blockquote = memo<any>(({ attributes, children, element }) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
});

Blockquote.displayName = 'Blockquote';

export { Blockquote };

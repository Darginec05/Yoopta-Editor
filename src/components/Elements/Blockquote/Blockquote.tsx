import { memo } from 'react';
import s from './Blockquote.module.scss';

const Blockquote = memo<ElementProps>(({ attributes, children }) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
});

Blockquote.displayName = 'Blockquote';

export { Blockquote };

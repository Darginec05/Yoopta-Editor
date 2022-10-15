import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './Paragraph.module.scss';

const Paragraph = memo<ElementProps>(({ children }) => {
  return (
    <p className={s.paragraph} draggable={false}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export { Paragraph };

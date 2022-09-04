import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './Paragraph.module.scss';

const Paragraph = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <p className={s.paragraph} draggable={false} {...attributes} data-node-id={element.id}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export { Paragraph };

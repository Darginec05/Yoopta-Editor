import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './Link.module.scss';

const Link = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <a draggable={false} {...attributes} href={element.url} rel="noreferrer" target="_blank" className={s.link}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';

export { Link };

import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Link.module.scss';

const Link = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <a
      draggable={false}
      {...attributes}
      href={element.url}
      rel="noreferrer"
      target="_blank"
      className={cx(s.link, getElementClassname(element))}
    >
      {children}
    </a>
  );
});

Link.displayName = 'Link';

export { Link };

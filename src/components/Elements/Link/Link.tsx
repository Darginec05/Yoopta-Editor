import cx from 'classnames';
import { MouseEvent, memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Link.module.scss';

const Link = memo<ElementProps>(({ attributes, element, children }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = new URL(element.url);

    if (url.host === window.location.host) {
      window.open(element.url, '_self');
    } else {
      window.open(element.url, '_blank');
    }
  };

  return (
    <a
      draggable={false}
      {...attributes}
      href={element.url}
      rel="noreferrer"
      target="_blank"
      className={cx(s.link, getElementClassname(element))}
      onClick={handleClick}
    >
      {children}
    </a>
  );
});

Link.displayName = 'Link';

export { Link };

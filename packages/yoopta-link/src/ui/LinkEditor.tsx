import { cx, HOTKEYS, RenderYooptaElementProps } from '@yoopta/editor';
import { MouseEvent, useEffect, useState } from 'react';
import { LinkElement } from '../types';
import s from './LinkEditor.module.scss';

const LinkEditor = ({ attributes, element, children }: RenderYooptaElementProps<LinkElement>) => {
  const [hovered, setHovered] = useState(false);
  const [clickable, setClickable] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (clickable && typeof element.data.url === 'string' && element.data.url?.length > 0) {
      window.open(element.data.url, '_blank');
      return;
    }
    return e.preventDefault();
  };

  const reset = () => {
    setClickable(false);
    setHovered(false);
  };

  useEffect(() => {
    const makeClickable = (event) => {
      if (HOTKEYS.isCmd(event)) {
        setClickable(true);
      }
    };

    if (hovered) {
      document?.addEventListener('keydown', makeClickable);
    }

    return () => {
      document?.removeEventListener('keydown', makeClickable);
    };
  }, [hovered, clickable]);

  return (
    <a
      draggable={false}
      {...attributes}
      href={element.data.url || ''}
      rel="noreferrer"
      target="_blank"
      className={cx(s.link, { [s.clickable]: clickable && hovered })}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
    >
      {children}
    </a>
  );
};

export { LinkEditor };

import { RenderElementProps } from '@yopta/editor';
import { MouseEvent } from 'react';
import { LinkElement } from '../types';
import s from './LinkEditor.module.scss';

const LinkEditor = ({ attributes, element, children }: RenderElementProps<LinkElement>) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    return e.preventDefault();
  };

  return (
    <a
      draggable={false}
      {...attributes}
      href={element.url || ''}
      rel="noreferrer"
      target="_blank"
      className={s.link}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export { LinkEditor };

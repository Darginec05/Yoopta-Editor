import { MouseEvent } from 'react';
import { RenderElementProps } from 'slate-react';
import s from './LinkEditor.module.scss';

const LinkEditor = ({ attributes, element, children }: RenderElementProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    return e.preventDefault();
  };

  return (
    <a
      draggable={false}
      {...attributes}
      href={element.url}
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

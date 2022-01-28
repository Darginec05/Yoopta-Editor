/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import s from './Element.module.scss';

const Element: FC<RenderElementProps | any> = ({ attributes, children, element }) => {
  const onMouseEnter = (type) => {
    console.log('Entered ', type);
  };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          role="row"
          tabIndex={0}
          onMouseEnter={() => onMouseEnter('block-quote')}
          className={s.blockquote}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul role="row" tabIndex={0} onMouseEnter={() => onMouseEnter('bulleted-list')} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1
          role="row"
          tabIndex={0}
          onMouseEnter={() => onMouseEnter('heading-one')}
          className={s['heading-one']}
          {...attributes}
        >
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2
          role="row"
          tabIndex={0}
          onMouseEnter={() => onMouseEnter('heading-two')}
          className={s['heading-two']}
          {...attributes}
        >
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3
          role="row"
          tabIndex={0}
          onMouseEnter={() => onMouseEnter('heading-three')}
          className={s['heading-three']}
          {...attributes}
        >
          {children}
        </h3>
      );
    case 'list-item':
      return (
        <li className={s.listItem} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol role="row" tabIndex={0} onMouseEnter={() => onMouseEnter('numbered-list')} {...attributes}>
          {children}
        </ol>
      );

    case 'link':
      return (
        <a {...attributes} href={element.url} rel="noreferrer" target="_blank" className={s.link}>
          {children}
        </a>
      );
    default:
      return (
        <p role="row" tabIndex={0} className={s.paragraph} {...attributes}>
          {children}
        </p>
      );
  }
};

export { Element };

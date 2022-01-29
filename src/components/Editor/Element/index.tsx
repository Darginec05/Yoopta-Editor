/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import { Image } from '../../Image';
import { ImageEditor } from '../../ImageEditor';
import s from './Element.module.scss';

const Element: FC<RenderElementProps | any> = ({ attributes, children, element }) => {
  const handleHover = (type) => {
    console.log('Hovered', { type });
  };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          data-node-id={element.id}
          role="row"
          tabIndex={0}
          onMouseEnter={() => handleHover('block-quote')}
          className={s.blockquote}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul
          role="row"
          data-node-id={element.id}
          tabIndex={0}
          onMouseEnter={() => handleHover('bulleted-list')}
          {...attributes}
        >
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1
          role="row"
          data-node-id={element.id}
          tabIndex={0}
          onMouseEnter={() => handleHover('heading-one')}
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
          data-node-id={element.id}
          tabIndex={0}
          onMouseEnter={() => handleHover('heading-two')}
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
          data-node-id={element.id}
          tabIndex={0}
          onMouseEnter={() => handleHover('heading-three')}
          className={s['heading-three']}
          {...attributes}
        >
          {children}
        </h3>
      );
    case 'list-item':
      return (
        <li data-node-id={element.id} className={s.listItem} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol
          role="row"
          data-node-id={element.id}
          tabIndex={0}
          onMouseEnter={() => handleHover('numbered-list')}
          {...attributes}
        >
          {children}
        </ol>
      );

    case 'link':
      return (
        <a
          {...attributes}
          data-node-id={element.id}
          href={element.url}
          rel="noreferrer"
          target="_blank"
          className={s.link}
        >
          {children}
        </a>
      );

    case 'image': {
      if (element.src) {
        return (
          <div {...attributes} data-node-id={element.id} className={s.image} onMouseEnter={() => handleHover('image')}>
            <Image src={element.src} alt="URI" />
            {children}
          </div>
        );
      }

      return (
        <ImageEditor
          element={element}
          attributes={attributes}
          className={s.image}
          onMouseEnter={() => handleHover('image')}
        >
          {children}
        </ImageEditor>
      );
    }
    default:
      return (
        <p
          role="row"
          tabIndex={0}
          className={s.paragraph}
          {...attributes}
          onMouseEnter={() => handleHover('paragraph')}
          data-node-id={element.id}
        >
          {children}
        </p>
      );
  }
};

export { Element };

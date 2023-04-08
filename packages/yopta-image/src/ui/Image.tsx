import { RenderElementProps } from '@yopta/editor';
import { ReactNode } from 'react';
import { ImageElement, ImageElementData } from '../types';
import s from './Image.module.scss';

type Props = RenderElementProps<ImageElement> & { children?: ReactNode; size?: ImageElementData['size'] };

const Image = ({ attributes, element, children, size }: Props) => {
  const width = size?.width || element.data?.size?.width || '100%';
  const height = size?.height || element.data?.size?.height || 400;

  const caption = element.data?.caption;

  if (!element.data.url && !element.data['data-src']) return <div />;

  return (
    <div {...attributes} className={s.imgElement} contentEditable={false} draggable={false}>
      <figure className={s.figure} onDragStart={(e) => e.preventDefault()}>
        <img
          src={element.data.url || element.data['data-src'] || ''}
          alt={caption}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={s.img}
        />
        {caption && <figcaption className={s.caption}>{caption}</figcaption>}
      </figure>
      {children}
    </div>
  );
};

export { Image };

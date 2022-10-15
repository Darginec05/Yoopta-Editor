import { CSSProperties } from 'react';
import s from './ImageRender.module.scss';

type ImageProps = { style?: CSSProperties | undefined } & JSX.IntrinsicElements['img'];

const ImageRender = ({ src, style, ...rest }: ImageProps) => {
  return (
    <figure className={s.wrap} style={style}>
      <img src={src} loading="lazy" alt={rest.alt} />
      <figcaption>{rest.caption || rest.alt || 'caption'}</figcaption>
    </figure>
  );
};

export { ImageRender };

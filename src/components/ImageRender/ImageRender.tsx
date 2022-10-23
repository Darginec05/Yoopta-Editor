import { CSSProperties } from 'react';
import s from './ImageRender.module.scss';

type ImageProps = { style?: CSSProperties | undefined; caption?: string; options: any } & JSX.IntrinsicElements['img'];

const ImageRender = ({ src, style, options, ...rest }: ImageProps) => {
  return (
    <figure className={s.wrap} style={style}>
      <img src={src} loading="lazy" alt={rest.alt} width={options?.width} height={options?.height} />
      {rest.caption && <figcaption>{rest.caption}</figcaption>}
    </figure>
  );
};

export { ImageRender };

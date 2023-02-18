import { CSSProperties } from 'react';
import { getMediaAspectRatio } from '../Editor/utils';
import s from './ImageRender.module.scss';

type ImageProps = { style?: CSSProperties | undefined; caption?: string; options: any } & JSX.IntrinsicElements['img'];

const ImageRender = ({ src, style, options, alt, caption }: ImageProps) => {
  const { width, height } = getMediaAspectRatio(options?.width, options?.height, 718, 900);

  return (
    <figure className={s.wrap} style={style}>
      <img src={src} loading="lazy" alt={alt} width={width} height={height} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export { ImageRender };

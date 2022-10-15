import { CSSProperties } from 'react';
import s from './ImageRender.module.scss';

type ImageProps = { style?: CSSProperties | undefined } & JSX.IntrinsicElements['img'];

const ImageRender = ({ src, style, ...rest }: ImageProps) => {
  return (
    <div className={s.wrap} style={style}>
      <img src={src} width={680} height={440} loading="lazy" alt={rest.alt} />
    </div>
  );
};

export { ImageRender };

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { CSSProperties } from 'react';
import s from './ImageRender.module.scss';

type ImageProps = { style?: CSSProperties | undefined } & NextImageProps;

const ImageRender = ({ src, style, ...rest }: ImageProps) => {
  return (
    <div className={s.wrap} style={style}>
      <NextImage src={src} width={680} height={440} quality={75} {...rest} />
    </div>
  );
};

export { ImageRender };

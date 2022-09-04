import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { CSSProperties } from 'react';
import { MediaEditorOptions } from '../MediaEditorOptions';
import s from './Image.module.scss';

type ImageProps = { style: CSSProperties | undefined } & NextImageProps;

const Image = ({ src, style, ...rest }: ImageProps) => {
  return (
    <div className={s.wrap} style={style}>
      <NextImage src={src} width={680} height={440} quality={75} {...rest} />
      <div className={s.options}>
        <MediaEditorOptions />
      </div>
    </div>
  );
};

export { Image };

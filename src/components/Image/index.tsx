import NextImage, { ImageProps as NextImageProps } from 'next/image';
import s from './Image.module.scss';

type ImageProps = NextImageProps;

const Image = ({ src, ...rest }: ImageProps) => {
  return (
    <div className={s.wrap}>
      <NextImage src={src} width={680} height={350} quality={75} {...rest} />
    </div>
  );
};

export { Image };

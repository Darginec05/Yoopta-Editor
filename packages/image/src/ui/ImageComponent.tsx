import { CSSProperties } from 'react';

type ImageComponentProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  srcSet: string;
  fit?: 'contain' | 'cover' | 'fill' | undefined;
};

const ImageComponent = ({ width, height, src, alt, srcSet, fit = 'cover' }: ImageComponentProps) => {
  const style: CSSProperties = {
    objectFit: fit,
  };

  return (
    <div>
      <img
        data-element-type="Image"
        src={src}
        srcSet={srcSet}
        width={width}
        height={height}
        alt={alt}
        decoding="async"
        loading="lazy"
        style={style}
      />
    </div>
  );
};

export { ImageComponent, ImageComponentProps };

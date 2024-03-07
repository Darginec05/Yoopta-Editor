import { CSSProperties } from 'react';
import { ImageElementProps } from '../types';

type ImageComponentProps = Omit<ImageElementProps, 'sizes'> & {
  width: number;
  height: number;
  layout?: Layout;
};

type Layout = 'fill' | 'responsive' | 'intrinsic' | 'fixed';

const ImageComponent = ({ width, height, src, alt, fit, bgColor, layout = 'intrinsic' }: ImageComponentProps) => {
  const style: CSSProperties = {
    objectFit: fit || 'contain',
    backgroundColor: bgColor || 'transparent',
  };

  const isResponsive = layout === 'responsive';
  const isFixed = layout === 'fixed';
  const isFill = layout === 'fill';
  const isIntrinsic = layout === 'intrinsic';

  if (isResponsive) {
    style.width = '100%';
    style.height = 'auto';
  }

  if (isFixed) {
    style.width = '100%';
    style.height = '100%';
  }

  if (isFill) {
    style.width = '100%';
    style.height = '100%';
  }

  if (isIntrinsic) {
    style.width = '100%';
    style.height = '100%';
  }

  return (
    <div className="w-full" data-layout={layout}>
      {src && (
        <img src={src} width={width} height={height} alt={alt || ''} decoding="async" loading="lazy" style={style} />
      )}
    </div>
  );
};

export { ImageComponent, ImageComponentProps };

import { CSSProperties } from 'react';
import { RenderElementProps } from 'slate-react';
import { ImageElementProps } from '../types';

type ImageComponentProps = Omit<ImageElementProps, 'sizes'> & {
  width: number | string;
  height: number | string;
  layout?: Layout;
} & Pick<RenderElementProps, 'attributes' | 'children'>;

type Layout = 'fill' | 'responsive' | 'intrinsic' | 'fixed';

const ImageComponent = ({
  width,
  height,
  src,
  alt,
  fit,
  bgColor,
  attributes,
  children,
  layout = 'intrinsic',
}: ImageComponentProps) => {
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
    <div className="yoo-image-w-full yoo-image-relative" data-layout={layout} {...attributes}>
      {src && (
        <img src={src} width={width} height={height} alt={alt || ''} decoding="async" loading="lazy" style={style} />
      )}
      {children}
      {alt && (
        <div className="yoopta-image-alt" title={alt}>
          <div className="yoopta-image-alt-text">ALT</div>
        </div>
      )}
    </div>
  );
};

export { ImageComponent, ImageComponentProps };

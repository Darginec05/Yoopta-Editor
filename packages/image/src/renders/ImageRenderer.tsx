import { ElementRendererProps } from '@yoopta/editor';
import { CSSProperties } from 'react';

const ImageRenderer = ({ element, attributes, children }: ElementRendererProps) => {
  const { src, alt, fit, bgColor, layout = 'intrinsic' } = element.props || {};
  const { width, height } = element.props?.sizes || {};

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
    <div {...attributes} className={`yoo-image-w-full yoopta-image ${attributes.className || ''}`} data-layout={layout}>
      {src && (
        <img src={src} width={width} height={height} alt={alt || ''} decoding="async" loading="lazy" style={style} />
      )}
      {children}
    </div>
  );
};

export { ImageRenderer };

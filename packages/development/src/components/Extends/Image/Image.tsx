import { PluginElementRenderProps, useBlockData } from '@yoopta/editor';
import NextImage, { ImageProps } from 'next/image';

export const YooptaWithNextImage = (props: PluginElementRenderProps) => {
  const { children, element, blockId, attributes } = props;
  const block = useBlockData(blockId);
  const isFill = element.props.fit === 'fill';

  const imageProps: Pick<ImageProps, 'fill' | 'style' | 'width' | 'height'> = {
    fill: isFill,
    style: {
      objectFit: isFill ? 'cover' : 'contain',
    },
  };

  if (!imageProps.fill) {
    imageProps.width = element.props.sizes.width;
    imageProps.height = element.props.sizes.height;
    imageProps.style!.width = element.props.sizes.width;
    imageProps.style!.height = element.props.sizes.height;
  }

  return (
    <div contentEditable={false} {...attributes}>
      <NextImage
        draggable={false}
        src={element.props.src}
        alt={element.props.alt}
        priority={block.meta.order === 0}
        objectFit={element.props.fit}
        {...imageProps}
      />
      {children}
    </div>
  );
};

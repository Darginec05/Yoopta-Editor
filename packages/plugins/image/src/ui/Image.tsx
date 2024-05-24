import { ImageComponent } from './ImageComponent';
import {
  useBlockData,
  PluginElementRenderProps,
  useYooptaEditor,
  useYooptaPluginOptions,
  useBlockSelected,
  useYooptaReadOnly,
  Elements,
} from '@yoopta/editor';
import { Resizable, ResizableProps } from 're-resizable';
import { useEffect, useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import { ImagePluginOptions } from '../types';
import { ImageBlockOptions } from './ImageBlockOptions';
import { Resizer } from './Resizer';

const ImageRender = ({ element, attributes, children, blockId }: PluginElementRenderProps) => {
  const { src, alt, srcSet, bgColor, fit, sizes: propSizes } = element.props || {};
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();

  const pluginOptions = useYooptaPluginOptions<ImagePluginOptions>('Image');

  const [sizes, setSizes] = useState({
    width: propSizes?.width || 650,
    height: propSizes?.height || 440,
  });

  useEffect(
    () =>
      setSizes({
        width: propSizes?.width || 650,
        height: propSizes?.height || 440,
      }),
    [element.props],
  );

  const blockSelected = useBlockSelected({ blockId });

  const resizeProps: ResizableProps = useMemo(
    () => ({
      minWidth: 300,
      size: { width: sizes.width, height: sizes.height },
      maxWidth: pluginOptions?.maxSizes?.maxWidth || 800,
      maxHeight: pluginOptions?.maxSizes?.maxHeight || 720,
      lockAspectRatio: true,
      resizeRatio: 2,
      enable: {
        left: !isReadOnly,
        right: !isReadOnly,
      },
      handleStyles: {
        left: { left: 0 },
        right: { right: 0 },
      },
      onResize: (e, direction, ref) => {
        if (isReadOnly) return;
        setSizes({ width: ref.offsetWidth, height: ref.offsetHeight });
      },
      onResizeStop: (e, direction, ref) => {
        if (isReadOnly) return;
        Elements.updateElement(editor, blockId, 'image', {
          sizes: { width: ref.offsetWidth, height: ref.offsetHeight },
        });
      },
      handleComponent: {
        left: isReadOnly ? <></> : <Resizer position="left" />,
        right: isReadOnly ? <></> : <Resizer position="right" />,
      },
    }),
    [sizes.width, sizes.height],
  );

  if (!src) {
    if (isReadOnly) return <></>;

    return (
      <Placeholder attributes={attributes} blockId={blockId}>
        {children}
      </Placeholder>
    );
  }

  return (
    <div
      contentEditable={false}
      draggable={false}
      className="yoo-image-mt-4 yoo-image-relative yoopta-image"
      {...attributes}
    >
      <Resizable {...resizeProps} className="yoo-image-mx-auto yoo-image-my-0 yoo-image-flex">
        {blockSelected && (
          <div className="yoo-image-absolute yoo-image-pointer-events-none yoo-image-inset-0 yoo-image-bg-[rgba(35,131,226,0.14)] yoo-image-z-[81] yoo-image-rounded-[3px] yoo-image-opacity-100 yoo-image-transition-opacity yoo-image-duration-150 yoo-image-ease-in" />
        )}
        <ImageComponent
          src={src}
          alt={alt}
          srcSet={srcSet}
          fit={fit}
          width={sizes?.width}
          bgColor={bgColor}
          height={sizes?.height}
        />
        {!isReadOnly && <ImageBlockOptions block={block} editor={editor} props={element.props} />}
        {children}
      </Resizable>
    </div>
  );
};

export { ImageRender };

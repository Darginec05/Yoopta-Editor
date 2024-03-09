import { ImageComponent } from './ImageComponent';
import {
  useBlockData,
  PluginElementRenderProps,
  useYooptaEditor,
  useYooptaPluginOptions,
  useBlockSelected,
} from '@yoopta/editor';
import { Resizable, ResizableProps } from 're-resizable';
import { useEffect, useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import { ImagePluginOptions } from '../types';
import { ImageBlockOptions } from './ImageBlockOptions';
import { Resizer } from './Resizer';

const ImageRender = ({ element, attributes, children, blockId }: PluginElementRenderProps<ImagePluginOptions>) => {
  const { src, alt, srcSet, bgColor, fit, sizes: propSizes } = element.props || {};
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
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
  let readOnly = false;

  const resizeProps: ResizableProps = useMemo(
    () => ({
      minWidth: 300,
      size: { width: sizes.width, height: sizes.height },
      maxWidth: pluginOptions?.maxSizes?.maxWidth || 800,
      maxHeight: pluginOptions?.maxSizes?.maxHeight || 720,
      lockAspectRatio: true,
      resizeRatio: 2,
      enable: {
        left: !readOnly,
        right: !readOnly,
      },
      handleStyles: {
        left: { left: 0 },
        right: { right: 0 },
      },
      onResize: (e, direction, ref) => {
        setSizes({ width: ref.offsetWidth, height: ref.offsetHeight });
      },
      onResizeStop: (e, direction, ref) => {
        editor.blocks.Image.updateElement(blockId, 'image', {
          sizes: { width: ref.offsetWidth, height: ref.offsetHeight },
        });
      },
      handleComponent: {
        left: <Resizer position="left" />,
        right: <Resizer position="right" />,
      },
    }),
    [sizes.width, sizes.height],
  );

  if (!src) {
    return (
      <Placeholder attributes={attributes} blockId={blockId}>
        {children}
      </Placeholder>
    );
  }

  return (
    <div contentEditable={false} draggable={false} className="mt-4 relative" {...attributes}>
      <Resizable {...resizeProps} className="mx-auto my-0 flex">
        {blockSelected && (
          <div className="absolute pointer-events-none inset-0 bg-[rgba(35,131,226,0.14)] z-[81] rounded-[3px] opacity-100 transition-opacity duration-150 ease-in" />
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
        <ImageBlockOptions block={block} editor={editor} props={element.props} />
        {children}
      </Resizable>
    </div>
  );
};

export { ImageRender };

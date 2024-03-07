import { ImageComponent } from './ImageComponent';
import { useBlockData, PluginElementRenderProps, useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { Resizable, ResizableProps } from 're-resizable';
import { useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import { ImagePluginOptions } from '../types';
import { ImageBlockOptions } from './ImageBlockOptions';

const Resizer = ({ position }) => (
  <div
    contentEditable={false}
    className={`absolute pointer-events-none flex items-center justify-center z-10 opacity-1 h-full w-[15px] cursor-col-resize transition-opacity duration-150 ease-in ${
      position === 'left' ? 'left-0 top-0' : 'right-0 top-0'
    }`}
  >
    <div className="opacity-100 transition-opacity duration-300 ease-in rounded-[20px] bg-[rgba(15,15,15,0.6)] border border-[rgba(255,255,255,0.9)] w-[6px] h-[48px] max-h-[50%] shadow-[0_0_0_.5px_#FFF]" />
  </div>
);

const ImageRender = ({ element, attributes, children, blockId }: PluginElementRenderProps<ImagePluginOptions>) => {
  const { src, alt, srcSet, bgColor, fit, sizes: propSizes } = element.props || {};
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const pluginOptions = useYooptaPluginOptions<ImagePluginOptions>('Image');

  const [sizes, setSizes] = useState({
    width: propSizes?.width || 750,
    height: propSizes?.height || 440,
  });

  const selected = block.meta.order === editor.selection?.[0];

  // const style = {
  //   boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
  // };

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
        {selected && (
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

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

export type ImageLoadingState = null | {
  progress: number;
  base64: string;
  loading: boolean;
};

const ImageRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, blockId, children, attributes } = props;
  const { src, alt, srcSet, bgColor, fit, sizes: propSizes } = element.props || {};
  const blockData = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();

  const pluginOptions = useYooptaPluginOptions<ImagePluginOptions>('Image');

  const [sizes, setSizes] = useState({
    width: propSizes?.width || 650,
    height: propSizes?.height || 440,
  });

  const [loadingState, setLoadingState] = useState<ImageLoadingState>(null);

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
        Elements.updateElement(editor, blockId, {
          type: 'image',
          props: {
            sizes: { width: ref.offsetWidth, height: ref.offsetHeight },
          },
        });
      },
      handleComponent: {
        left: isReadOnly || typeof loadingState?.base64 === 'string' ? <></> : <Resizer position="left" />,
        right: isReadOnly || typeof loadingState?.base64 === 'string' ? <></> : <Resizer position="right" />,
      },
    }),
    [sizes.width, sizes.height],
  );

  const currentAlign = blockData?.meta?.align || 'center';
  const alignClass = `yoopta-align-${currentAlign}`;

  if (!src) {
    if (isReadOnly) return <></>;

    const onUpdateLoadingState = (loadingState: ImageLoadingState) => {
      setLoadingState(loadingState);
    };

    if (typeof loadingState?.base64 === 'string') {
      return (
        <div
          contentEditable={false}
          draggable={false}
          className={`yoo-image-mt-4 yoo-image-relative yoo-image-flex opacity-70 pointer-events-none ${alignClass} yoopta-image`}
        >
          <ImageComponent
            key={element.id}
            src={loadingState.base64}
            alt={alt}
            srcSet={srcSet}
            fit={fit}
            width={sizes?.width}
            bgColor={bgColor}
            height={sizes?.height}
            attributes={attributes}
          >
            {children}
          </ImageComponent>
        </div>
      );
    }

    return (
      <Placeholder
        loadingState={loadingState}
        onUpdateLoadingState={onUpdateLoadingState}
        attributes={attributes}
        blockId={blockId}
      >
        {children}
      </Placeholder>
    );
  }

  return (
    <div
      contentEditable={false}
      draggable={false}
      className={`yoo-image-mt-4 yoo-image-relative yoo-image-flex ${alignClass} yoopta-image`}
    >
      <Resizable {...resizeProps} className="yoo-image-my-0 yoo-image-flex">
        {blockSelected && (
          <div className="yoo-image-absolute yoo-image-pointer-events-none yoo-image-inset-0 yoo-image-bg-[rgba(35,131,226,0.14)] yoo-image-z-[81] yoo-image-rounded-[3px] yoo-image-opacity-100 yoo-image-transition-opacity yoo-image-duration-150 yoo-image-ease-in" />
        )}
        {extendRender ? (
          extendRender(props)
        ) : (
          <ImageComponent
            key={element.id}
            src={src}
            alt={alt}
            srcSet={srcSet}
            fit={fit}
            width={sizes?.width}
            bgColor={bgColor}
            height={sizes?.height}
            attributes={attributes}
          >
            {children}
          </ImageComponent>
        )}
        {!isReadOnly && <ImageBlockOptions block={blockData} editor={editor} props={element.props} />}
      </Resizable>
    </div>
  );
};

export { ImageRender };

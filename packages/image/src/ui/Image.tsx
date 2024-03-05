import { useFocused, useSelected } from 'slate-react';
import { ImageComponent } from './ImageComponent';
import { useBlockData, UI, PluginElementRenderProps, useYooptaBlock } from '@yoopta/editor';
import { Resizable, ResizableProps } from 're-resizable';
import { Transforms } from 'slate';
import { useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import { ImagePluginOptions } from '../types';

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

const ImageRender = ({ element, attributes, children }: PluginElementRenderProps<ImagePluginOptions>) => {
  const { src, alt, srcSet, fit, sizes } = element.props || {};

  // const [size, setSize] = useState({
  //   width: element.props?.size?.width || 750,
  //   height: element.props?.size?.height || 440,
  // });

  // const selected = useSelected();
  // const focused = useFocused();

  // const style = {
  //   boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
  // };

  // let readOnly = false;

  // console.log('block', block);

  // const resizeProps: ResizableProps = useMemo(
  //   () => ({
  //     minWidth: 300,
  //     size: { width: size.width, height: size.height },
  //     maxWidth: block?.options?.maxWidth || 800,
  //     maxHeight: block?.options?.maxHeight || 720,
  //     lockAspectRatio: true,
  //     resizeRatio: 2,
  //     enable: {
  //       left: !readOnly,
  //       right: !readOnly,
  //     },
  //     handleStyles: {
  //       left: { left: 0 },
  //       right: { right: 0 },
  //     },
  //     onResize: (e, direction, ref) => {
  //       setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
  //     },
  //     onResizeStop: (e, direction, ref) => {
  //       // Transforms.setNodes<ImageElement>(
  //       //   slate,
  //       //   { data: { ...element.props, size: { width: ref.offsetWidth, height: ref.offsetHeight } } },
  //       //   {
  //       //     at: ReactEditor.findPath(slate, element),
  //       //     match: (n) => Element.isElement(n) && n.type === 'image',
  //       //   },
  //       // );
  //     },
  //     handleComponent: {
  //       left: <Resizer position="left" />,
  //       right: <Resizer position="right" />,
  //     },
  //   }),
  //   [size.width, size.height],
  // );

  if (!src) {
    return <Placeholder attributes={attributes}>{children}</Placeholder>;
  }

  return (
    <div contentEditable={false} draggable={false} className="mt-4 relative flex" {...attributes}>
      <ImageComponent src={src} alt={alt} srcSet={srcSet} fit={fit} width={sizes?.width} height={sizes?.height} />
      {children}
    </div>
  );
};

export { ImageRender };

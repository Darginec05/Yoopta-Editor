import { Element, Transforms } from 'slate';
import { Resizable, ResizableProps } from 're-resizable';
import { ReactEditor, RenderElementProps, useFocused, useSelected } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { Image } from './Image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cx } from '@yopta/editor';
import s from './ImageEditor.module.scss';

type Props = RenderElementProps & {};

function ImageEditor(editor, component) {
  return function ImageEditor(props: Props) {
    const { element } = props;
    const selected = useSelected();

    const [size, setSize] = useState({
      width: element.options?.size?.width || 800,
      height: element.options?.size?.height || 440,
    });

    useEffect(() => {
      if (element.options) {
        setSize({
          width: element.options?.size?.width || 800,
          height: element.options?.size?.height || 440,
        });
      }
    }, [element.options?.size]);

    const resizeProps: ResizableProps = useMemo(
      () => ({
        minWidth: 92,
        size: { width: size.width, height: size.height },
        maxWidth: 800,
        lockAspectRatio: true,
        resizeRatio: 2,
        enable: {
          left: true,
          right: true,
        },
        handleStyles: {
          left: { left: 0 },
          right: { right: 0 },
        },
        onResize: (e, direction, ref) => {
          setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        },
        onResizeStop: (e, direction, ref) => {
          console.log('image editor editor.children', editor.children);
          console.log('ReactEditor.findPath(editor, element)', ReactEditor.findPath(editor, element));
          console.log('element', element);

          Transforms.setNodes(
            editor,
            { options: { size: { width: ref.offsetWidth, height: ref.offsetHeight } } },
            {
              at: ReactEditor.findPath(editor, element),
              match: (n) => Element.isElement(n) && n.type === 'image',
            },
          );
        },
        handleComponent: {
          left: (
            <div contentEditable={false} className={s.leftResizer}>
              <div className={s.resizeItem} />
            </div>
          ),
          right: (
            <div contentEditable={false} className={s.rightResizer}>
              <div className={s.resizeItem} />
            </div>
          ),
        },
      }),
      [size.width, size.height, editor],
    );

    if (!element.url) {
      return <EditorPlaceholder {...props} editor={editor} onChange={component.options.onChange} />;
    }

    const hasCaption = !!element.options.caption;

    return (
      <div contentEditable={false} draggable={false} className={cx(s.root, { [s.extraMargin]: hasCaption })}>
        <Resizable {...resizeProps} className={s.resizeLib}>
          <Image {...props} size={size} />
          <div className={cx(s.selectImg, { [s.selected]: selected })} />
        </Resizable>
      </div>
    );
  };
}

export { ImageEditor };

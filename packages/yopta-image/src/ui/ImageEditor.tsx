import { Element, Transforms } from 'slate';
import { Resizable, ResizableProps } from 're-resizable';
import { ReactEditor, RenderElementProps } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { Image } from './Image';
import { useEffect, useState } from 'react';
import s from './ImageEditor.module.scss';

type Props = RenderElementProps & {};

function ImageEditor(editor, component) {
  console.log({ component });

  return function ImageEditor(props) {
    const { element } = props;

    console.log('image element', element);

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

    const resizeProps: ResizableProps = {
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
        left: <div>asdad</div>,
      },
    };

    if (!element.src) {
      return <EditorPlaceholder {...props} editor={editor} onUpload={component.options.onUpload} />;
    }

    return (
      <div contentEditable={false}>
        <Resizable {...resizeProps} style={{ margin: '0 auto' }}>
          <Image {...props} size={size} />
        </Resizable>
      </div>
    );
  };
}

export { ImageEditor };

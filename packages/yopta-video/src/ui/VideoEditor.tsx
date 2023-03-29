import { Editor, Element, Transforms } from 'slate';
import { Resizable, ResizableProps } from 're-resizable';
import { ReactEditor, RenderElementProps, useSelected } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { Video } from './Video';
import { CSSProperties, MouseEvent, useEffect, useMemo, useState } from 'react';
import { cx } from '@yopta/editor';
import { Loader } from '../components/Loader';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { NodeOptions } from '../components/NodeOptions';
import s from './VideoEditor.module.scss';

type Props = RenderElementProps;

const OPTIONS_WIDTH = 265;

function VideoEditor(editor: Editor, component) {
  return function VideoEditor(props: Props) {
    const { element } = props;
    const selected = useSelected();

    const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);
    const [size, setSize] = useState({
      width: element.options?.size?.width || 750,
      height: element.options?.size?.height || 440,
    });

    useEffect(() => {
      if (element.options) {
        setSize({
          width: element.options?.size?.width || 750,
          height: element.options?.size?.height || 440,
        });
      }
    }, [element.options?.size]);

    const resizeProps: ResizableProps = useMemo(
      () => ({
        minWidth: 92,
        size: { width: size.width, height: size.height },
        maxWidth: 750,
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
          console.log('video editor editor.children', editor.children);
          console.log('ReactEditor.findPath(editor, element)', ReactEditor.findPath(editor, element));
          console.log('element', element);

          Transforms.setNodes(
            editor,
            { options: { size: { width: ref.offsetWidth, height: ref.offsetHeight } } },
            {
              at: ReactEditor.findPath(editor, element),
              match: (n) => Element.isElement(n) && n.type === 'video',
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

    const hasCaption = !!element.options?.caption;
    const isLoading = !!element['data-src'] && !element.url;

    const toggleOptionsOpen = (e: MouseEvent) => {
      e?.stopPropagation();

      if (optionsPos !== null) {
        enableBodyScroll(document.body);
        setOptionsPos(null);
        return;
      }

      const optionsButtonRect = e.currentTarget?.getBoundingClientRect();
      const UPLOADER_HEIGHT = 164;

      if (optionsButtonRect) {
        const showAtTop = optionsButtonRect.top + optionsButtonRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;

        disableBodyScroll(document.body, { reserveScrollBarGap: true });
        setOptionsPos({
          right: 10,
          top: showAtTop
            ? optionsButtonRect.top - UPLOADER_HEIGHT - 5
            : optionsButtonRect.top + optionsButtonRect.height + 5,
        });
      }
    };

    if (!element.url && !element['data-src']) {
      return (
        <div className={s.root} key={element.id}>
          <EditorPlaceholder {...props} editor={editor} onChange={component.options.onChange}>
            <div>
              <button type="button" className={s.dotsOptions} onClick={toggleOptionsOpen}>
                <span className={s.dot} />
                <span className={s.dot} />
                <span className={s.dot} />
              </button>
              {optionsPos !== null && (
                <NodeOptions key={element.id} onClose={toggleOptionsOpen} style={optionsPos} element={element} />
              )}
            </div>
          </EditorPlaceholder>
        </div>
      );
    }

    return (
      <div
        contentEditable={false}
        draggable={false}
        className={cx(s.root, { [s.extraMargin]: hasCaption, [s.loadingState]: isLoading })}
        key={element.id}
      >
        <Resizable {...resizeProps} className={s.resizeLib}>
          <Video {...props} size={size} />
          <div className={cx(s.selectImg, { [s.selected]: selected })} />
          {isLoading && (
            <div className={s.loader}>
              <Loader />
            </div>
          )}
          <div>
            <button type="button" className={s.dotsOptions} onClick={toggleOptionsOpen}>
              <span className={s.dot} />
              <span className={s.dot} />
              <span className={s.dot} />
            </button>
            {optionsPos !== null && (
              <NodeOptions key={element.id} onClose={toggleOptionsOpen} style={optionsPos} element={element} />
            )}
          </div>
        </Resizable>
      </div>
    );
  };
}

export { VideoEditor };

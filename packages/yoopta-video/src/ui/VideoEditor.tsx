import { Element, Transforms } from 'slate';
import { Resizable, ResizableProps } from 're-resizable';
import { ReactEditor, useReadOnly, useSelected } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { CSSProperties, MouseEvent, useEffect, useMemo, useState } from 'react';
import { cx, RenderYooptaElementProps, YooEditor, UI_HELPERS, YooptaPluginType } from '@yoopta/editor';
import { Loader } from '../components/Loader';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { VideoElement, VideoPluginOptions } from '../types';
import s from './VideoEditor.module.scss';

const OPTIONS_WIDTH = 265;

type Props = {
  editor: YooEditor;
  plugin: YooptaPluginType<VideoPluginOptions, VideoElement>;
  element: RenderYooptaElementProps<VideoElement>['element'];
  children: RenderYooptaElementProps<VideoElement>['children'];
  attributes: RenderYooptaElementProps<VideoElement>['attributes'];
};

const VideoEditorFactory =
  (editor: Props['editor'], plugin: Props['plugin']) => (props: RenderYooptaElementProps<VideoElement>) =>
    <VideoEditor editor={editor} plugin={plugin} {...props} />;

function VideoEditor(props: Props) {
  const { element, editor, plugin } = props;
  const selected = useSelected();
  const readOnly = useReadOnly();

  const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);
  const [size, setSize] = useState({
    width: element.data?.size?.width || 'auto',
    height: element.data?.size?.height || 'auto',
  });

  useEffect(() => {
    if (element.data) {
      setSize({
        width: element.data?.size?.width || 'auto',
        height: element.data?.size?.height || 'auto',
      });
    }
  }, [element.data?.size]);

  const resizeProps: ResizableProps = useMemo(
    () => ({
      minWidth: 92,
      size: { width: size.width, height: size.height },
      maxWidth: plugin.options?.maxWidth || 800,
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
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
      },
      onResizeStop: (e, direction, ref) => {
        console.log('video editor editor.children', editor.children);
        console.log('ReactEditor.findPath(editor, element)', ReactEditor.findPath(editor, element));
        console.log('element', element);

        Transforms.setNodes<VideoElement>(
          editor,
          { data: { ...element.data, size: { width: ref.offsetWidth, height: ref.offsetHeight } } },
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

  const hasCaption = !!element.data?.caption;
  const isLoading = !!element.data['data-src'] && !element.data.url;

  const closeOptions = () => {
    enableBodyScroll(document.body);
    setOptionsPos(null);
  };

  const toggleOptionsOpen = (e?: MouseEvent) => {
    e?.stopPropagation();

    if (optionsPos !== null) {
      return closeOptions();
    }

    const optionsButtonRect = e?.currentTarget?.getBoundingClientRect();
    const UPLOADER_HEIGHT = 164;

    if (optionsButtonRect) {
      const showAtTop = optionsButtonRect.top + optionsButtonRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;

      disableBodyScroll(document.body, { reserveScrollBarGap: true });

      setOptionsPos({
        left:
          optionsButtonRect.right - optionsButtonRect.width + OPTIONS_WIDTH > window.innerWidth
            ? window.innerWidth - OPTIONS_WIDTH - optionsButtonRect.width
            : optionsButtonRect.right - optionsButtonRect.width,
        top: showAtTop
          ? optionsButtonRect.top - UPLOADER_HEIGHT / 2 - optionsButtonRect.height
          : optionsButtonRect.top + optionsButtonRect.height + 5,
      });
    }
  };

  if (!element.data.url && !element.data['data-src'] && !element.data.videoId) {
    const { maxWidth = 750, maxHeight = 800 } = plugin.options || {};

    return (
      <div className={s.root} key={element.id} contentEditable={false}>
        <div className={cx(s.selectImg, { [s.selected]: selected })} />
        <EditorPlaceholder
          attributes={props.attributes}
          element={props.element}
          editor={editor}
          onUpload={plugin.options?.onUpload}
          maxSizes={{ maxWidth, maxHeight }}
        >
          {!readOnly && (
            <div>
              <button type="button" className={s.dotsOptions} onClick={toggleOptionsOpen}>
                <span className={s.dot} />
                <span className={s.dot} />
                <span className={s.dot} />
              </button>
              {optionsPos !== null && (
                <UI_HELPERS.ElementOptions
                  key={element.id}
                  onClose={closeOptions}
                  style={optionsPos}
                  element={element}
                  onCopy={closeOptions}
                  onDelete={closeOptions}
                  onDuplicate={closeOptions}
                />
              )}
            </div>
          )}
        </EditorPlaceholder>
        {props.children}
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
        {plugin.renderer.render({ ...props, size })}
        <div className={cx(s.selectImg, { [s.selected]: selected })} />
        {isLoading && (
          <div className={s.loader}>
            <Loader />
          </div>
        )}
        {!readOnly && (
          <div>
            <button type="button" className={s.dotsOptions} onClick={toggleOptionsOpen}>
              <span className={s.dot} />
              <span className={s.dot} />
              <span className={s.dot} />
            </button>
            {optionsPos !== null && (
              <UI_HELPERS.ElementOptions
                key={element.id}
                onClose={closeOptions}
                style={optionsPos}
                element={element}
                onCopy={closeOptions}
                onDelete={closeOptions}
                onDuplicate={closeOptions}
              />
            )}
          </div>
        )}
      </Resizable>
    </div>
  );
}

export { VideoEditorFactory };

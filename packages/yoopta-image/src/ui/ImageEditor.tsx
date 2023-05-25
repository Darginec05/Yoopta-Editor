import { Element, Transforms } from 'slate';
import { Resizable, ResizableProps } from 're-resizable';
import { ReactEditor, useReadOnly, useSelected } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { CSSProperties, MouseEvent, useEffect, useMemo, useState } from 'react';
import { cx, RenderYooptaElementProps, UI_HELPERS, YooEditor, YooptaPluginType } from '@yoopta/editor';
import { Loader } from '../components/Loader';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ImageElement, ImagePluginOptions } from '../types';
import s from './ImageEditor.module.scss';

const OPTIONS_WIDTH = 265;

type Props = {
  editor: YooEditor;
  plugin: YooptaPluginType<ImagePluginOptions, ImageElement>;
  element: RenderYooptaElementProps<ImageElement>['element'];
  children: RenderYooptaElementProps<ImageElement>['children'];
  attributes: RenderYooptaElementProps<ImageElement>['attributes'];
};

const ImageEditorFactory =
  (editor: Props['editor'], plugin: Props['plugin']) => (props: RenderYooptaElementProps<ImageElement>) =>
    <ImageEditor editor={editor} plugin={plugin} {...props} />;

function ImageEditor(props: Props) {
  const { element, editor, plugin } = props;
  const selected = useSelected();
  const readOnly = useReadOnly();

  const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);
  const [size, setSize] = useState({
    width: element.data?.size?.width || 750,
    height: element.data?.size?.height || 440,
  });

  useEffect(() => {
    if (element.data) {
      setSize({
        width: element.data?.size?.width || 750,
        height: element.data?.size?.height || 440,
      });
    }
  }, [element.data?.size]);

  const resizeProps: ResizableProps = useMemo(
    () => ({
      minWidth: 300,
      size: { width: size.width, height: size.height },
      maxWidth: plugin.options?.maxWidth || 800,
      maxHeight: plugin.options?.maxHeight || 720,
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
        Transforms.setNodes<ImageElement>(
          editor,
          { data: { ...element.data, size: { width: ref.offsetWidth, height: ref.offsetHeight } } },
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

  if (!element.data.url && !element.data['data-src']) {
    const { maxWidth = 750, maxHeight = 800 } = plugin.options || {};
    return (
      <div className={s.root} key={element.id} contentEditable={false} draggable={false}>
        <div className={cx(s.selectImg, { [s.selected]: selected })} />
        <EditorPlaceholder
          attributes={props.attributes}
          element={element}
          editor={editor}
          maxSizes={{ maxWidth, maxHeight }}
          onUpload={plugin.options?.onUpload}
          accept={plugin.options?.accept}
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
        {/* Move edit props to editorProps */}
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

export { ImageEditorFactory };

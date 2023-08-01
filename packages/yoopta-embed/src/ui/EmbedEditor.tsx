import { Element, Transforms } from 'slate';
import { Resizable, ResizableProps } from 're-resizable';
import { ReactEditor, useReadOnly, useSelected } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { CSSProperties, MouseEvent, useEffect, useMemo, useState } from 'react';
import { cx, RenderYooptaElementProps, UI_HELPERS, YooEditor, YooptaPluginType } from '@yoopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { EmbedElement, EmbedElementData, EmbedPluginOptions } from '../types';
import s from './EmbedEditor.module.scss';

const OPTIONS_WIDTH = 265;

type Props = {
  editor: YooEditor;
  plugin: YooptaPluginType<EmbedPluginOptions, EmbedElement>;
  element: RenderYooptaElementProps<EmbedElement>['element'];
  children: RenderYooptaElementProps<EmbedElement>['children'];
  attributes: RenderYooptaElementProps<EmbedElement>['attributes'];
};

const EmbedEditorFactory =
  (editor: Props['editor'], plugin: Props['plugin']) => (props: RenderYooptaElementProps<EmbedElement>) =>
    <EmbedEditor editor={editor} plugin={plugin} {...props} />;

function EmbedEditor(props: Props) {
  const { element, editor, plugin } = props;
  const selected = useSelected();
  const readOnly = useReadOnly();

  const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);
  const [size, setSize] = useState({
    width: element.data?.size?.width || 750,
    height: element.data?.size?.height || 440,
  });

  const updateSize = (updatedSize: Partial<EmbedElementData['size']>) => setSize({ ...size, ...updatedSize });

  useEffect(() => {
    if (element.data) {
      updateSize({
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
        updateSize({ width: ref.offsetWidth, height: ref.offsetHeight });
      },
      onResizeStop: (e, direction, ref) => {
        console.log('image editor editor.children', editor.children);
        console.log('ReactEditor.findPath(editor, element)', ReactEditor.findPath(editor, element));
        console.log('element', element);

        Transforms.setNodes<EmbedElement>(
          editor,
          { data: { ...element.data, size: { width: ref.offsetWidth, height: ref.offsetHeight } } },
          {
            at: ReactEditor.findPath(editor, element),
            match: (n) => Element.isElement(n) && n.type === 'embed',
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
    <div contentEditable={false} draggable={false} className={s.root} key={element.id}>
      <Resizable {...resizeProps} className={s.resizeLib}>
        {plugin.renderer.render({ ...props, size, isEdit: true })}
        <div className={cx(s.selectImg, { [s.selected]: selected })} />

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

export { EmbedEditorFactory };

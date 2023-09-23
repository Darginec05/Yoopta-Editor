import { useReadOnly, useSelected } from 'slate-react';
import { EditorPlaceholder } from '../components/EditorPlaceholder';
import { CSSProperties, MouseEvent, useState } from 'react';
import { cx, RenderYooptaElementProps, UI_HELPERS, YooEditor, YooptaPluginType } from '@yoopta/editor';
import { Loader } from '../components/Loader';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { FileElement, FilePluginOptions } from '../types';
import s from './FileEditor.module.scss';

const OPTIONS_WIDTH = 265;

type Props = {
  editor: YooEditor;
  plugin: YooptaPluginType<FilePluginOptions, FileElement>;
  element: RenderYooptaElementProps<FileElement>['element'];
  children: RenderYooptaElementProps<FileElement>['children'];
  attributes: RenderYooptaElementProps<FileElement>['attributes'];
};

const FileEditorFactory =
  (editor: Props['editor'], plugin: Props['plugin']) => (props: RenderYooptaElementProps<FileElement>) => (
    <FileEditor editor={editor} plugin={plugin} {...props} />
  );

function FileEditor(props: Props) {
  const { element, editor, plugin } = props;
  const selected = useSelected();
  const readOnly = useReadOnly();

  const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);
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

  console.log('element', element);

  if (!element.data.url) {
    return (
      <div className={s.root} key={element.id} contentEditable={false} draggable={false}>
        <div className={cx(s.selectImg, { [s.selected]: selected })} />
        <EditorPlaceholder
          attributes={props.attributes}
          element={element}
          editor={editor}
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
      className={cx(s.root, { [s.loadingState]: isLoading })}
      key={element.id}
    >
      {/* Move edit props to editorProps */}
      {plugin.renderer.render(props)}
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
    </div>
  );
}

export { FileEditorFactory };

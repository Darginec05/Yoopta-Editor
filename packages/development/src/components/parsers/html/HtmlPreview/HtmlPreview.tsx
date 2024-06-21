import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
import parsers from '@yoopta/exports';
import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { MARKS } from '../../../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../../../utils/yoopta/plugins';
import s from './HtmlPreview.module.scss';

type Props = {
  editor: YooEditor;
};

type View = 'write' | 'preview';

const WriteHTML = ({ editor, html, onChange }) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div className={s.commentBox}>
              <textarea placeholder="Add your html here..." value={html} onChange={onChange} className={s.textarea} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultHTML = ({ editor, html }) => {
  useEffect(() => {
    if (html.length === 0) return;
    const deserialized = parsers.html.deserialize(editor, html);
    editor.setEditorValue(deserialized);
  }, [html]);

  return (
    <div>
      <div className={s.previewBox}>
        {html.length === 0 ? (
          'Nothing to preview'
        ) : (
          <YooptaEditor
            id="html"
            editor={editor}
            readOnly
            className={s.preview}
            plugins={YOOPTA_PLUGINS}
            marks={MARKS}
            selectionBoxRoot={false}
            style={{
              width: '100%',
              paddingBottom: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};

const TABS_COMPONENTS: Record<View, any> = {
  write: WriteHTML,
  preview: ResultHTML,
};

const HtmlPreview = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);

  const [view, setView] = useState<View>('write');
  const [html, setHtml] = useState('');

  const ViewComponent = TABS_COMPONENTS[view] || <></>;

  return (
    <div className={s.root}>
      <div>
        <legend>
          <h4>Add HTML</h4>
        </legend>
      </div>
      <label className={s.label}>Comment</label>
      <div className={s.box}>
        <div className={s.tabNav}>
          <div className={s.tabs}>
            <button onClick={() => setView('write')} className={s.tab} aria-selected={view === 'write'}>
              Write
            </button>
            <button onClick={() => setView('preview')} className={s.tab} aria-selected={view === 'preview'}>
              Preview
            </button>
          </div>
          <div className={s.toolbar}></div>
        </div>
        <ViewComponent html={html} onChange={(e) => setHtml(e.target.value)} editor={editor} />
      </div>
    </div>
  );
};

export { HtmlPreview };

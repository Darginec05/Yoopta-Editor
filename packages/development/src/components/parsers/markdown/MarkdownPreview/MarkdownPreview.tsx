import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
import parsers from '@yoopta/exports';
import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { MARKS } from '../../../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../../../utils/yoopta/plugins';
import s from './MarkdownPreview.module.scss';

type Props = {
  editor: YooEditor;
};

type View = 'write' | 'preview';

const WriteMarkdown = ({ editor, markdown, onChange }) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div className={s.commentBox}>
              <textarea
                placeholder="Add your markdown here..."
                value={markdown}
                onChange={onChange}
                className={s.textarea}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultMarkdown = ({ editor, markdown }) => {
  useEffect(() => {
    if (markdown.length === 0) return;
    const deserialized = parsers.markdown.deserialize(editor, markdown);
    editor.setEditorValue(deserialized);
  }, [markdown]);

  return (
    <div>
      <div className={s.previewBox}>
        {markdown.length === 0 ? (
          'Nothing to preview'
        ) : (
          <YooptaEditor
            id="markdown"
            editor={editor}
            // readOnly
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
  write: WriteMarkdown,
  preview: ResultMarkdown,
};

const MarkdownPreview = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);

  const [view, setView] = useState<View>('write');
  const [markdown, setMarkdown] = useState('');

  const ViewComponent = TABS_COMPONENTS[view] || <></>;

  return (
    <div className={s.root}>
      <div>
        <legend>
          <h4>Add markdown</h4>
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
        <ViewComponent markdown={markdown} onChange={(e) => setMarkdown(e.target.value)} editor={editor} />
      </div>
    </div>
  );
};

export { MarkdownPreview };

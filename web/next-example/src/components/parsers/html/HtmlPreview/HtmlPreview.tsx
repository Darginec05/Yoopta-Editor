import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
import parsers from '@yoopta/exports';
import s from './HtmlPreview.module.scss';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Accordion from '@yoopta/accordion';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { useEffect, useMemo, useState } from 'react';

import { html, markdown } from '@yoopta/exports';

const plugins = [
  Paragraph,
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
        const data = await uploadToCloudinary(file, 'image');

        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Video.extend({
    options: {
      onUpload: async (file) => {
        const data = await uploadToCloudinary(file, 'video');
        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  File.extend({
    options: {
      onUpload: async (file) => {
        const response = await uploadToCloudinary(file, 'auto');
        return { src: response.url };
      },
    },
  }),
];

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

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
            plugins={plugins}
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

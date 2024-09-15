import YooptaEditor, { createYooptaEditor, YooEditor, YooptaContentValue } from '@yoopta/editor';
import parsers from '@yoopta/exports';
import s from './HtmlPreview.module.scss';

import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';

import { useEffect, useMemo, useState } from 'react';

import { html as codemirrorHTML } from '@codemirror/lang-html';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import NextLink from 'next/link';
import jsBeatify from 'js-beautify';
import { YOOPTA_PLUGINS } from '../../../../utils/yoopta/plugins';
import { MARKS } from '../../../../utils/yoopta/marks';

const LANGUAGES_MAP = {
  html: {
    type: 'html',
    name: 'HTML',
    extension: codemirrorHTML(),
  },
};

const codeMirrorSetup: BasicSetupOptions = {
  lineNumbers: false,
  autocompletion: false,
  foldGutter: false,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
  tabSize: 2,
};

type ViewProps = {
  editor: YooEditor;
  html: string;
  onChange: (code: string) => void;
  focusedEditor: FocusedView;
  onChangeFocusedEditor: (type: FocusedView) => void;
};

const WriteHTML = ({ editor, html, onChange, onChangeFocusedEditor }: ViewProps) => {
  return (
    <div className="w-1/2 mr-1 relative">
      <p className="my-2">Type some html here and see the result on the right side (Deserializing 🎊)</p>
      <div className={s.commentBox}>
        {html.trim().length > 0 && (
          <button
            onClick={() => {
              onChange(
                jsBeatify.html_beautify(html, {
                  indent_with_tabs: false,
                  indent_size: 2,
                }),
              );
            }}
            className="bg-blue-500 text-white p-2 rounded-md absolute top-0 right-0 z-10"
          >
            Beatify
          </button>
        )}
        <CodeMirror
          value={html}
          height="100%"
          extensions={[LANGUAGES_MAP.html.extension]}
          onChange={onChange}
          // width="100%"
          theme={vscodeDark}
          className="yoopta-code-cm-editor"
          placeholder="Write some html..."
          basicSetup={codeMirrorSetup}
          style={{ caretColor: 'red', tabSize: 2 }}
          onFocus={() => onChangeFocusedEditor('html')}
        />
      </div>
    </div>
  );
};

const ResultHTML = ({ editor, html, onChange, focusedEditor, onChangeFocusedEditor }: ViewProps) => {
  useEffect(() => {
    if (focusedEditor === 'yoopta') return;

    if (html.length === 0) return;
    const deserialized = parsers.html.deserialize(editor, html);
    editor.setEditorValue(deserialized);
  }, [html, focusedEditor]);

  useEffect(() => {
    const handleChange = (value: YooptaContentValue) => {
      const string = parsers.html.serialize(editor, value);
      onChange(string);
    };

    if (focusedEditor === 'yoopta') {
      editor.on('change', handleChange);
      return () => editor.off('change', handleChange);
    }
  }, [editor, focusedEditor]);

  return (
    <div className="w-1/2 ml-1 ">
      <p className="my-2">Type some content here and see the html on the left side (Serializing 🎉)</p>
      <div className="bg-[#30363d]">
        <div className={s.previewBox} onMouseDown={() => onChangeFocusedEditor('yoopta')}>
          <YooptaEditor
            id="html"
            editor={editor}
            className={s.preview}
            plugins={YOOPTA_PLUGINS}
            marks={MARKS}
            autoFocus={false}
            selectionBoxRoot={false}
            placeholder="Write content..."
            style={{
              width: '100%',
              paddingBottom: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

type FocusedView = 'html' | 'yoopta';

const HtmlPreview = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const [html, setHTML] = useState('');
  const [focusedEditor, setFocusedEditor] = useState<FocusedView>('html');

  const onChange = (code: string) => setHTML(code);

  return (
    <>
      <div className="w-full p-0 m-0 min-h-[100vh] overflow-hidden px-2">
        <NextLink href="/examples/withExports" className="text-blue-500 underline">
          Back to examples
        </NextLink>
        <h1 className="text-center my-4 mx-auto scroll-m-20 text-3xl font-bold tracking-tight p-2 sm:p-0 sm:max-w-[60%]">
          This example shows how <b>html</b> deserialize/serialize methods from <b>@yoopta/exports</b> work
        </h1>
        <div className="h-full">
          <div className="flex h-full">
            <WriteHTML
              html={html}
              onChange={onChange}
              focusedEditor={focusedEditor}
              onChangeFocusedEditor={(type) => setFocusedEditor(type)}
              editor={editor}
            />
            <ResultHTML
              html={html}
              onChange={onChange}
              focusedEditor={focusedEditor}
              onChangeFocusedEditor={(type) => setFocusedEditor(type)}
              editor={editor}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { HtmlPreview };

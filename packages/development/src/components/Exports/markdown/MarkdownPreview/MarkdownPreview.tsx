import YooptaEditor, { createYooptaEditor, YooEditor, YooptaContentValue } from '@yoopta/editor';
import parsers from '@yoopta/exports';
import s from './MarkdownPreview.module.scss';

import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';

import { useEffect, useMemo, useState } from 'react';

import { markdown as codemirrorMD } from '@codemirror/lang-markdown';
import { xml } from '@codemirror/lang-xml';
import { html as codemirrorHTML } from '@codemirror/lang-html';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import NextLink from 'next/link';
import { YOOPTA_PLUGINS } from '../../../../utils/yoopta/plugins';
import { MARKS } from '../../../../utils/yoopta/marks';

const LANGUAGES_MAP = {
  markdown: {
    type: 'markdown',
    name: 'Markdown',
    extension: codemirrorMD(),
  },
  xml: {
    type: 'xml',
    name: 'XML',
    extension: xml(),
  },
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
  markdown: string;
  onChange: (code: string) => void;
  focusedEditor: FocusedView;
  onChangeFocusedEditor: (type: FocusedView) => void;
};

const WriteMarkdown = ({ editor, markdown, onChange, onChangeFocusedEditor }: ViewProps) => {
  return (
    <div className="w-1/2 mr-1">
      <p className="my-2">Type some markdown here and see the result on the right side (Deserializing 🎊)</p>
      <div className={s.commentBox}>
        <CodeMirror
          value={markdown}
          height="100%"
          extensions={[LANGUAGES_MAP.markdown.extension]}
          onChange={onChange}
          width="100%"
          theme={vscodeDark}
          className="yoopta-code-cm-editor"
          placeholder="Write some markdown..."
          basicSetup={codeMirrorSetup}
          style={{ caretColor: 'red', tabSize: 2 }}
          onFocus={() => onChangeFocusedEditor('markdown')}
        />
      </div>
    </div>
  );
};

const ResultMarkdown = ({ editor, markdown, onChange, focusedEditor, onChangeFocusedEditor }: ViewProps) => {
  const [value, setValue] = useState<YooptaContentValue>();

  useEffect(() => {
    if (focusedEditor === 'yoopta') return;

    if (markdown.length === 0) return;
    const deserialized = parsers.markdown.deserialize(editor, markdown);
    editor.setEditorValue(deserialized);
  }, [markdown, focusedEditor]);

  const onChangeEditorValue = (value: YooptaContentValue) => {
    console.log('value', value);
    const string = parsers.markdown.serialize(editor, value);
    onChange(string);
    setValue(value);
  };

  console.log('value', value);

  return (
    <div className="w-1/2 ml-1 ">
      <p className="my-2">Type some content here and see the markdown on the left side (Serializing 🎉)</p>
      <div className="bg-[#30363d]">
        <div className={s.previewBox} onMouseDown={() => onChangeFocusedEditor('yoopta')}>
          <YooptaEditor
            id="markdown"
            editor={editor}
            className={s.preview}
            plugins={YOOPTA_PLUGINS}
            marks={MARKS}
            autoFocus={false}
            selectionBoxRoot={false}
            placeholder="Write content..."
            value={value}
            onChange={onChangeEditorValue}
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

type FocusedView = 'markdown' | 'yoopta';

const MarkdownPreview = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const [markdown, setMarkdown] = useState('');
  const [focusedEditor, setFocusedEditor] = useState<FocusedView>('markdown');

  const onChange = (code: string) => setMarkdown(code);

  return (
    <>
      <NextLink href="/examples/withExports" className="text-blue-500 underline">
        Back to examples
      </NextLink>
      <div className="w-full p-0 m-0 min-h-[100vh] overflow-hidden px-2">
        <h1 className="text-center my-4 mx-auto scroll-m-20 text-3xl font-bold tracking-tight max-w-[60%]">
          This example shows how <b>markdown</b> deserialize/serialize methods from <b>@yoopta/exports</b> work
        </h1>
        <div className="h-full">
          <div className="flex h-full">
            <WriteMarkdown
              markdown={markdown}
              onChange={onChange}
              focusedEditor={focusedEditor}
              onChangeFocusedEditor={(type) => setFocusedEditor(type)}
              editor={editor}
            />
            <ResultMarkdown
              markdown={markdown}
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

export { MarkdownPreview };

import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { FAKE_YOOPTA_EDITOR_CHILDREN, getDefaultYooptaChildren } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useState } from 'react';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import { YooEditor, YooptaChildren } from './editor/types';
import { Plugin } from './plugins/types';
import { Paragraph } from './components/Editor/plugins/Paragraph/Paragraph';
import { Blockquote } from './components/Editor/plugins/Blockquote/Blockquote';
import { Code } from './components/Editor/plugins/Code/Code';
import { Video } from './components/Editor/plugins/Video/Video';
import { Callout } from './components/Editor/plugins/Callout/Callout';
import { Link } from './components/Editor/plugins/Link/Link';
import NoSSR from './components/NoSsr/NoSsr';
import { Mention } from './components/Editor/plugins/Mention/Mention';
import { Bold, CodeMark, Highlight, Italic, Strike, Underline, YooptaMark } from './textFormatters/createYooptaMark';
import { TextFormats } from './editor';
import { Table } from './components/Editor/plugins/Table/Table';
import { NumberedList } from './components/Editor/plugins/NumberedList/NumberedList';

type Props = {
  editor: YooEditor;
  plugins: Plugin[];
  marks?: YooptaMark<any>[];
  value: YooptaChildren;
  onChange?: (value: YooEditor['children']) => void;
};

const PLUGINS = [Paragraph, Blockquote, Code, Video, Link, Mention, Callout, Table, NumberedList];
const TEXT_FORMATTERS = [Bold, Italic, Underline, Strike, CodeMark, Highlight];
const DEFAULT_VALUE = getDefaultYooptaChildren();

const YooptaEditor = ({ editor, value, marks = TEXT_FORMATTERS, plugins = PLUGINS, ...props }: Props) => {
  const applyChanges = () => {
    if (props.onChange) props.onChange(editor.children);
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any, 'hightlight'>; version: number }>(() => {
    editor.applyChanges = applyChanges;

    const formats = {};

    marks.forEach((mark) => {
      formats[mark.type] = {
        hotkey: mark.hotkey,
        type: mark.type,
      };
    });

    editor.formats = formats;
    editor.children = FAKE_YOOPTA_EDITOR_CHILDREN;
    // editor.children = value || DEFAULT_VALUE;

    Object.keys(editor.children).forEach((id) => {
      const slate = withHistory(withReact(createEditor()));
      editor.blockEditorsMap[id] = slate;
    });

    return { editor, version: 0 };
  });

  return (
    // [TODO] - add SSR support
    <NoSSR>
      <UltraYooptaContextProvider editorState={editorState}>
        <Editor plugins={plugins} marks={marks} />
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };

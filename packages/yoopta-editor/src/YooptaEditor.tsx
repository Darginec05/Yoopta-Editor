import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { FAKE_YOOPTA_EDITOR_CHILDREN, getDefaultYooptaChildren } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useCallback, useState } from 'react';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import { YooEditor, YooptaChildren } from './editor/types';
import { Plugin } from './plugins/types';
import { Paragraph } from './components/Editor/plugins/Paragraph/Paragraph';
import { Blockquote } from './components/Editor/plugins/Blockquote/Blockquote';
import { Code } from './components/Editor/plugins/Code/Code';
import { Video } from './components/Editor/plugins/Video/Video';
import { Link } from './components/Editor/plugins/Link/Link';
import NoSSR from './components/NoSsr/NoSsr';
import { Mention } from './components/Editor/plugins/Mention/Mention';

type Props = {
  editor: YooEditor;
  plugins: Plugin[];
  value: YooptaChildren;
  onChange?: (value: YooEditor['children']) => void;
};

const PLUGINS = [Paragraph, Blockquote, Code, Video, Link, Mention];
const DEFAULT_VALUE = getDefaultYooptaChildren();

const YooptaEditor = ({ editor, value, plugins = PLUGINS, ...props }: Props) => {
  const applyChanges = useCallback(() => {
    if (props.onChange) props.onChange(editor.children);

    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  }, []);

  const [editorState, setEditorState] = useState<{ editor: YooEditor; version: number }>(() => {
    editor.applyChanges = applyChanges;
    // editor.children = value || DEFAULT_VALUE;
    editor.children = FAKE_YOOPTA_EDITOR_CHILDREN;

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
        <Editor plugins={plugins} />
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };

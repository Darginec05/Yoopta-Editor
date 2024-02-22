import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { FAKE_YOOPTA_EDITOR_CHILDREN, getDefaultYooptaChildren } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useState } from 'react';
import { YooEditor, YooptaChildren } from './editor/types';
import { Plugin } from './plugins/types';
import NoSSR from './components/NoSsr/NoSsr';
import { Bold, CodeMark, Highlight, Italic, Strike, Underline, YooptaMark } from './textFormatters/createYooptaMark';
import { ToolAPI, ToolsProvider } from './contexts/UltraYooptaContext/ToolsContext';
import { buildBlocks, buildBlockShortcuts, buildBlockSlateEditors, buildMarks } from './utils/editorBuilders';
import { Toolbar } from './tools/Toolbar/Toolbar';
import { ActionMenuList } from './tools/ActionMenuList/ActionMenuList';

type Props = {
  editor: YooEditor;
  plugins: Plugin[];
  marks?: YooptaMark<any>[];
  value: YooptaChildren;
  autoFocus?: boolean;
  className?: string;
  onChange?: (value: YooEditor['children']) => void;
  tools: {
    [key: string]: ToolAPI;
  };
};

const TEXT_FORMATTERS = [Bold, Italic, Underline, Strike, CodeMark, Highlight];
const DEFAULT_VALUE = getDefaultYooptaChildren();

const YooptaEditor = ({
  editor,
  value,
  marks = TEXT_FORMATTERS,
  plugins,
  autoFocus,
  className,
  tools,
  ...props
}: Props) => {
  const applyChanges = () => {
    if (props.onChange) props.onChange(editor.children);
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any, 'hightlight'>; version: number }>(() => {
    editor.applyChanges = applyChanges;
    editor.formats = buildMarks(editor, marks);
    editor.blocks = buildBlocks(editor, plugins);
    editor.children = FAKE_YOOPTA_EDITOR_CHILDREN;
    editor.blockEditorsMap = buildBlockSlateEditors(editor);
    editor.shortcuts = buildBlockShortcuts(editor);

    return { editor, version: 0 };
  });

  // const yooptaTools = useMemo(() => {
  //   const toolsMap = {};
  //   Object.keys(tools).forEach((tool) => {
  //     toolsMap[tool] = tools[tool].component;
  //   });
  // }, [tools]);

  return (
    <NoSSR>
      <UltraYooptaContextProvider editorState={editorState}>
        <ToolsProvider>
          <Editor plugins={plugins} marks={marks} autoFocus={autoFocus} className={className} />
          {/* {yooptaTools} */}
          <ActionMenuList />
          <Toolbar />
        </ToolsProvider>
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };

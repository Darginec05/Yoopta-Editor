import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { FAKE_YOOPTA_EDITOR_CHILDREN, getDefaultYooptaChildren } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useMemo, useState } from 'react';
import { YooEditor, YooptaChildren } from './editor/types';
import { PluginReturn } from './plugins/types';
import NoSSR from './components/NoSsr/NoSsr';
import { Bold, CodeMark, Highlight, Italic, Strike, Underline, YooptaMark } from './textFormatters/createYooptaMark';
import { ToolAPI, ToolsProvider } from './contexts/UltraYooptaContext/ToolsContext';
import {
  buildBlocks,
  buildBlockShortcuts,
  buildBlockSlateEditors,
  buildMarks,
  buildPlugins,
} from './utils/editorBuilders';
import { Toolbar } from './tools/Toolbar/Toolbar';
import { ActionMenuList } from './tools/ActionMenuList/ActionMenuList';
import { YooptaPlugin } from './plugins';

type Props = {
  editor: YooEditor;
  plugins: YooptaPlugin[];
  marks?: YooptaMark<any>[];
  value: YooptaChildren;
  autoFocus?: boolean;
  className?: string;
  selectionBoxRoot?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
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
  plugins: pluginsProps,
  autoFocus,
  className,
  tools,
  selectionBoxRoot,
  ...props
}: Props) => {
  const applyChanges = () => {
    if (props.onChange) props.onChange(editor.children);
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const plugins = useMemo(() => {
    return pluginsProps.map((plugin) => plugin.getPlugin as PluginReturn<string, any, any>);
  }, [pluginsProps]);

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any, 'hightlight'>; version: number }>(() => {
    editor.applyChanges = applyChanges;
    editor.formats = buildMarks(editor, marks);
    editor.blocks = buildBlocks(editor, plugins);

    editor.children = FAKE_YOOPTA_EDITOR_CHILDREN;
    // editor.children = getDefaultYooptaChildren();
    editor.blockEditorsMap = buildBlockSlateEditors(editor);
    editor.shortcuts = buildBlockShortcuts(editor);
    editor.plugins = buildPlugins(plugins);

    return { editor, version: 0 };
  });

  return (
    <NoSSR>
      <UltraYooptaContextProvider editorState={editorState}>
        <ToolsProvider>
          <Editor marks={marks} autoFocus={autoFocus} className={className} selectionBoxRoot={selectionBoxRoot} />
          {/* {yooptaTools} */}
          <ActionMenuList />
          <Toolbar />
        </ToolsProvider>
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };

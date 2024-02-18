import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { FAKE_YOOPTA_EDITOR_CHILDREN, getDefaultYooptaChildren } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useState } from 'react';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import { YooEditor, YooptaChildren } from './editor/types';
import { Plugin } from './plugins/types';
import { Code } from './components/Editor/plugins/Code/Code';
import { Video } from './components/Editor/plugins/Video/Video';
import NoSSR from './components/NoSsr/NoSsr';
import { Bold, CodeMark, Highlight, Italic, Strike, Underline, YooptaMark } from './textFormatters/createYooptaMark';
import { Table } from './components/Editor/plugins/Table/Table';
import { NumberedList } from './components/Editor/plugins/NumberedList/NumberedList';
import { findPluginBlockBySelectionPath } from './utils/findPluginBlockBySelectionPath';
import { applyBlock } from './editor/transforms/applyBlock';
import { ToolsProvider } from './contexts/UltraYooptaContext/ToolsContext';
import { ActionMenuList } from './tools/ActionMenuList';

type Props = {
  editor: YooEditor;
  plugins: Plugin[];
  marks?: YooptaMark<any>[];
  value: YooptaChildren;
  autoFocus?: boolean;
  className?: string;
  onChange?: (value: YooEditor['children']) => void;
};

const PLUGINS = [Code, Video, Table, NumberedList];
const TEXT_FORMATTERS = [Bold, Italic, Underline, Strike, CodeMark, Highlight];
const DEFAULT_VALUE = getDefaultYooptaChildren();

function buildMarks(marks: YooptaMark<any>[]) {
  const formats: YooEditor['formats'] = {};

  marks.forEach((mark) => {
    formats[mark.type] = {
      hotkey: mark.hotkey,
      type: mark.type,
    };
  });

  return formats;
}

function buildBlocks(editor, plugins: Plugin[]) {
  const blocks: YooEditor['blocks'] = {};

  plugins.forEach((plugin, index) => {
    blocks[plugin.type] = {
      order: index,
      type: plugin.type,
      elements: plugin.elements,
      options: plugin.options,
      isActive: () => {
        const block = findPluginBlockBySelectionPath(editor, { at: editor.selection });
        return block?.type === plugin.type;
      },
      apply: (options) => {
        applyBlock(editor, plugin.type, options);
      },
      update: () => {
        console.log('plugin.update');
      },
      delete: () => {
        console.log('plugin.delete');
      },
    };
  });

  return blocks;
}

function buildBlockSlateEditors(editor: YooEditor) {
  const blockEditorsMap = {};

  Object.keys(editor.children).forEach((id) => {
    const slate = withHistory(withReact(createEditor()));
    blockEditorsMap[id] = slate;
  });

  return blockEditorsMap;
}

const YooptaEditor = ({
  editor,
  value,
  marks = TEXT_FORMATTERS,
  plugins = PLUGINS,
  autoFocus,
  className,
  ...props
}: Props) => {
  const applyChanges = () => {
    if (props.onChange) props.onChange(editor.children);
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any, 'hightlight'>; version: number }>(() => {
    editor.applyChanges = applyChanges;
    editor.formats = buildMarks(marks);
    editor.blocks = buildBlocks(editor, plugins);
    editor.children = FAKE_YOOPTA_EDITOR_CHILDREN;
    editor.blockEditorsMap = buildBlockSlateEditors(editor);

    return { editor, version: 0 };
  });

  return (
    <NoSSR>
      <UltraYooptaContextProvider editorState={editorState}>
        <ToolsProvider>
          <Editor plugins={plugins} marks={marks} autoFocus={autoFocus} className={className} />
          <ActionMenuList />
        </ToolsProvider>
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };

import EventEmitter from 'eventemitter3';
import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { getDefaultYooptaChildren } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useMemo, useState } from 'react';
import { YooEditor, YooptaChildrenValue } from './editor/types';
import { PluginReturn } from './plugins/types';
import NoSSR from './components/NoSsr/NoSsr';
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
import { YooptaMark } from './marks';

type Props = {
  editor: YooEditor;
  plugins: YooptaPlugin[];
  marks?: YooptaMark<any>[];
  value: YooptaChildrenValue;
  autoFocus?: boolean;
  className?: string;
  selectionBoxRoot?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  tools?: {
    [key: string]: ToolAPI;
  };
};

const DEFAULT_VALUE = getDefaultYooptaChildren();
const eventEmitter = new EventEmitter();

const Events = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

function isValidateInitialValue(value: any): boolean {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  if (Object.keys(value).length === 0) return false;

  return value;
}

const YooptaEditor = ({
  editor,
  value,
  marks,
  plugins: pluginsProps,
  autoFocus,
  className,
  tools,
  selectionBoxRoot,
}: Props) => {
  const applyChanges = () => {
    editor.emit('change', editor.children);
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const plugins = useMemo(() => {
    return pluginsProps.map((plugin) => plugin.getPlugin as PluginReturn<string, any, any>);
  }, [pluginsProps]);

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any, 'hightlight'>; version: number }>(() => {
    editor.applyChanges = applyChanges;
    if (marks) editor.formats = buildMarks(editor, marks);
    editor.blocks = buildBlocks(editor, plugins);

    editor.children = isValidateInitialValue(value) ? value : DEFAULT_VALUE;
    editor.blockEditorsMap = buildBlockSlateEditors(editor);
    editor.shortcuts = buildBlockShortcuts(editor);
    editor.plugins = buildPlugins(plugins);

    editor.on = Events.on;
    editor.once = Events.once;
    editor.off = Events.off;
    editor.emit = Events.emit;

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

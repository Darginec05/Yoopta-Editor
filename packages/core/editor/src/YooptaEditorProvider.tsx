import React, { useMemo, useState } from 'react';
import EventEmitter from 'eventemitter3';
import { getDefaultYooptaChildren } from './components/Editor/utils';
import { YooptaContextProvider } from './contexts/YooptaContext/YooptaContext';
import { ToolsProvider } from './contexts/YooptaContext/ToolsContext';
import { SlateElement } from './editor/types';
import {
  buildBlocks,
  buildBlockShortcuts,
  buildBlockSlateEditors,
  buildCommands,
  buildMarks,
  buildPlugins,
} from './utils/editorBuilders';
import { YooptaPlugin } from './plugins';
import { YooptaMark } from './marks';
import { FakeSelectionMark } from './marks/FakeSelectionMark';
import { generateId } from './utils/generateId';
import { YooEditor, YooptaBlockData, YooptaContentValue } from './editor/types';
import { Plugin } from './plugins/types';

type Props = {
  id?: string;
  editor: YooEditor;
  value?: YooptaContentValue;
  marks?: YooptaMark<any>[];
  plugins: Readonly<YooptaPlugin<Record<string, SlateElement>>[]>;
  tools?: any;
  children?: React.ReactNode;
  readOnly?: boolean;
};

const DEFAULT_VALUE: Record<string, YooptaBlockData> = getDefaultYooptaChildren();
const eventEmitter = new EventEmitter();

const Events = {
  on: (event: string, fn: (...args: any[]) => void) => eventEmitter.on(event, fn),
  once: (event: string, fn: (...args: any[]) => void) => eventEmitter.once(event, fn),
  off: (event: string, fn: (...args: any[]) => void) => eventEmitter.off(event, fn),
  emit: (event: string, payload: any) => eventEmitter.emit(event, payload),
};

function validateInitialValue(value: any): boolean {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  if (Object.keys(value).length === 0) return false;

  return true;
}

const YooptaEditorProvider = ({
  id,
  editor,
  value,
  marks: marksProps,
  plugins: pluginsProps,
  tools,
  children,
  readOnly,
}: Props) => {
  const applyChanges = () => {
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const marks = useMemo(() => {
    if (marksProps) return [FakeSelectionMark, ...marksProps];
    return [FakeSelectionMark];
  }, [marksProps]);

  const plugins = useMemo(() => {
    return pluginsProps.map((plugin) => plugin.getPlugin as Plugin<Record<string, SlateElement>>);
  }, [pluginsProps]);

  const [editorState, setEditorState] = useState<{
    editor: YooEditor;
    version: number;
  }>(() => {
    if (!editor.id) editor.id = id || generateId();
    editor.applyChanges = applyChanges;
    editor.readOnly = readOnly || false;
    if (marks) editor.formats = buildMarks(editor, marks);
    editor.blocks = buildBlocks(editor, plugins);

    const isValueValid = validateInitialValue(value);
    if (!isValueValid && typeof value !== 'undefined') {
      // [TODO] - add link to documentation
      console.error(
        `Initial value is not valid. Should be an object with blocks. You passed: ${JSON.stringify(value)}`,
      );
    }

    editor.children = (isValueValid ? value : DEFAULT_VALUE) as YooptaContentValue;
    editor.blockEditorsMap = buildBlockSlateEditors(editor);
    editor.shortcuts = buildBlockShortcuts(editor);
    editor.plugins = buildPlugins(plugins);
    editor.commands = buildCommands(editor, plugins);

    editor.on = Events.on;
    editor.once = Events.once;
    editor.off = Events.off;
    editor.emit = Events.emit;

    return { editor, version: 0 };
  });

  return (
    <YooptaContextProvider editorState={editorState}>
      <ToolsProvider tools={tools}>{children}</ToolsProvider>
    </YooptaContextProvider>
  );
};

export { YooptaEditorProvider };

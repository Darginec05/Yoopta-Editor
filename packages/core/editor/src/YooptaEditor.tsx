import EventEmitter from 'eventemitter3';
import { YooptaContextProvider } from './contexts/YooptaContext/YooptaContext';
import { getDefaultYooptaChildren } from './components/Editor/utils';
import { Editor } from './components/Editor/Editor';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { SlateElement, YooEditor, YooptaBlockData, YooptaPath, YooptaContentValue } from './editor/types';
import { Plugin } from './plugins/types';
import { Tools, ToolsProvider } from './contexts/YooptaContext/ToolsContext';
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
import { inverseEditorOperation, YooHistory } from './editor/core/history';

export type YooptaEditorProps = {
  id?: string;
  editor: YooEditor;
  plugins: Readonly<YooptaPlugin<Record<string, SlateElement>>[]>;
  marks?: YooptaMark<any>[];
  value?: YooptaContentValue;
  onChange?: (value: YooptaContentValue) => void;
  autoFocus?: boolean;
  className?: string;
  selectionBoxRoot?: HTMLElement | React.MutableRefObject<HTMLElement | null> | false;
  children?: React.ReactNode;
  tools?: Partial<Tools>;
  placeholder?: string;
  readOnly?: boolean;
  width?: number | string;
  style?: CSSProperties;
};

const DEFAULT_VALUE: Record<string, YooptaBlockData> = getDefaultYooptaChildren();
const eventEmitter = new EventEmitter();

const Events = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

function validateInitialValue(value: any): boolean {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  if (Object.keys(value).length === 0) return false;

  return true;
}

type EditorState = {
  editor: YooEditor;
  version: number;
};

const YooptaEditor = ({
  id,
  editor,
  value,
  marks: marksProps,
  plugins: pluginsProps,
  autoFocus,
  className,
  tools,
  selectionBoxRoot,
  children,
  placeholder,
  readOnly,
  width,
  style,
  onChange,
}: YooptaEditorProps) => {
  const marks = useMemo(() => {
    if (marksProps) return [FakeSelectionMark, ...marksProps];
    return [FakeSelectionMark];
  }, [marksProps]);

  const plugins = useMemo(() => {
    return pluginsProps.map((plugin) => plugin.getPlugin as Plugin<Record<string, SlateElement>>);
  }, [pluginsProps]);

  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (!editor.id) editor.id = id || generateId();
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
    editor.historyStack = {
      undos: [],
      redos: [],
    };

    editor.undo = () => {
      const { undos } = editor.historyStack;
      if (undos.length > 0) {
        const batch = editor.historyStack.undos[editor.historyStack.undos.length - 1];

        YooHistory.withoutSaving(editor, () => {
          const inverseOps = batch.operations.flatMap((op) => inverseEditorOperation(editor, op)).reverse();
          editor.applyTransforms(inverseOps, { source: 'history' });
        });

        editor.historyStack.redos.push(batch);
        editor.historyStack.undos.pop();
      }
    };

    editor.redo = () => {
      const { redos } = editor.historyStack;

      if (redos.length > 0) {
        const batch = redos[redos.length - 1];

        YooHistory.withoutSaving(editor, () => {
          editor.applyTransforms(batch.operations, { source: 'history' });
        });

        editor.historyStack.redos.pop();
        editor.historyStack.undos.push(batch);
      }
    };

    return { editor, version: 0 };
  });

  const [_, setSelectionPath] = useState<YooptaPath | null>(null);

  const onSelectonPathChange = useCallback((path: YooptaPath) => {
    setSelectionPath(path);
  }, []);

  const onValueChange = useCallback(() => {
    setEditorState((prevState) => ({
      editor: prevState.editor,
      version: prevState.version + 1,
    }));

    onChange?.(editor.children);
  }, []);

  useEffect(() => {
    editor.on('change', onValueChange);
    editor.on('path-change', onSelectonPathChange);

    return () => {
      editor.off('change', onValueChange);
      editor.off('path-change', onSelectonPathChange);
    };
  }, [editor, onValueChange]);

  return (
    <YooptaContextProvider editorState={editorState}>
      <ToolsProvider tools={tools}>
        <Editor
          placeholder={placeholder}
          marks={marks}
          autoFocus={autoFocus}
          className={className}
          selectionBoxRoot={selectionBoxRoot}
          width={width}
          style={style}
        >
          {children}
        </Editor>
      </ToolsProvider>
    </YooptaContextProvider>
  );
};

export { YooptaEditor };

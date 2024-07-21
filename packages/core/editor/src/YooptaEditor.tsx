import EventEmitter from 'eventemitter3';
import { YooptaContextProvider } from './contexts/YooptaContext/YooptaContext';
import { getDefaultYooptaChildren } from './components/Editor/utils';
import { Editor } from './components/Editor/Editor';
import { CSSProperties, useMemo, useState } from 'react';
import { YooEditor, YooptaBlockData, YooptaContentValue } from './editor/types';
import { Plugin, PluginElementProps } from './plugins/types';
import NoSSR from './components/NoSsr/NoSsr';
import { Tools, ToolsProvider } from './contexts/YooptaContext/ToolsContext';
import {
  buildBlocks,
  buildBlockShortcuts,
  buildBlockSlateEditors,
  buildMarks,
  buildPlugins,
} from './utils/editorBuilders';
import { YooptaPlugin } from './plugins';
import { YooptaMark } from './marks';
import { FakeSelectionMark } from './marks/FakeSelectionMark';
import { generateId } from './utils/generateId';

type Props = {
  id?: string;
  editor: YooEditor;
  plugins: YooptaPlugin<string, PluginElementProps<any>, Record<string, unknown>>[];
  marks?: YooptaMark<any>[];
  value?: YooptaContentValue;
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

const isLegacyVersionInUse = (value: any): boolean => {
  if (Array.isArray(value) && value.length > 0) {
    return value.some((node) => {
      if (node.id || node.nodeType || node.type || node.children) {
        return true;
      }
    });
  }

  return false;
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
}: Props) => {
  const applyChanges = () => {
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const marks = useMemo(() => {
    if (marksProps) return [FakeSelectionMark, ...marksProps];
    return [FakeSelectionMark];
  }, [marksProps]);

  const plugins = useMemo(() => {
    return pluginsProps.map((plugin) => plugin.getPlugin as Plugin<string, any, any>);
  }, [pluginsProps]);

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any>; version: number }>(() => {
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

    editor.on = Events.on;
    editor.once = Events.once;
    editor.off = Events.off;
    editor.emit = Events.emit;

    return { editor, version: 0 };
  });

  if (isLegacyVersionInUse(value)) {
    console.error('Legacy version of Yoopta-Editor in use');

    return (
      <div>
        <h1>Legacy version of the Yoopta-Editor is used</h1>
        <p>It looks like you are using a legacy version of the editor.</p>
        <p>
          The structure of value has changed in new <b>@v4</b> version
        </p>
        <p>
          {/* [TODO] - add link to migration guide */}
          Please, check the migration guide to update your editor to the new <b>@v4</b> version.
          <a href="" />
        </p>
        <p>
          If you have specific case please{' '}
          <a href="https://github.com/Darginec05/Yoopta-Editor/issues" target="_blank" rel="noopener noreferrer">
            open the issue
          </a>{' '}
          and we will solve your problem with migration
        </p>
      </div>
    );
  }

  return (
    <NoSSR>
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
    </NoSSR>
  );
};

export { YooptaEditor };

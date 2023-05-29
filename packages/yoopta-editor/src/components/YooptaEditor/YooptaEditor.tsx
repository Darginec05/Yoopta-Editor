import { useCallback, useEffect, useState, Key, useMemo, ReactNode } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { YooEditor } from '../../types';
import { YooptaMark } from '../../utils/marks';
import { mergePlugins, mergePluginTypesToMap, YooptaPlugin } from '../../utils/plugins';
import { getInitialState, getStorageName, OFFLINE_STORAGE } from '../../utils/storage';
import { NodeSettingsProvider } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { EditorYoopta } from '../Editor/Editor';
import { withVoidNodes } from '../Editor/plugins/voids';
import { withShortcuts } from '../Editor/plugins/shortcuts';
import { withNonEmptyEditor } from '../Editor/plugins/nonEmptyEditor';
import { withDeleteFragment } from '../Editor/plugins/deleteFragment';
import { withHtml } from '../Editor/plugins/pasteHtml';
import { YooptaContextProvider } from '../../contexts/YooptaContext/YooptaContext';

export type YooptaNodeElementSettings = {
  options?: {
    handlers?: {
      onCopy?: () => void;
      onDelete?: () => void;
      onDuplicate?: () => void;
    };
  };
  drag?: boolean;
  plus?: boolean;
};

export type YooptaTools = {
  ActionMenu?: ReactNode;
  Toolbar?: ReactNode;
  ChatGPT?: ReactNode;
  [x: string]: ReactNode;
};

export type YooptaEditorProps = {
  onChange: (_value: Descendant[]) => void;
  value: Descendant[];
  key?: Key;
  placeholder?: string;
  plugins: YooptaPlugin<any, any>[];
  readOnly?: boolean;
  autoFocus?: boolean;
  offline?: OFFLINE_STORAGE;
  marks?: YooptaMark[];
  nodeElementSettings?: YooptaNodeElementSettings;
  className?: string;
  tools?: YooptaTools;
};

const YooptaEditor = ({
  key,
  value,
  plugins,
  marks,
  readOnly,
  onChange,
  placeholder,
  autoFocus = true,
  offline,
  className,
  tools,
}: YooptaEditorProps) => {
  const storageName = getStorageName(offline);
  const [val, setVal] = useState(() => getInitialState(storageName, offline, value));

  const onChangeValue = useCallback(
    (data: Descendant[]) => {
      onChange(data);
      setVal(data);

      if (!offline) return;

      const hasChanges = editor.operations.some((op) => op.type !== 'set_selection');

      if (hasChanges) {
        try {
          const content = JSON.stringify(data);
          localStorage.setItem(storageName, content);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
    [offline],
  );

  const yooptaEditorPlugins = useMemo(() => {
    const yooptaPlugins = mergePlugins(plugins);
    const PLUGINS_MAP = mergePluginTypesToMap(yooptaPlugins);

    return { yooptaPlugins, PLUGINS_MAP };
  }, [plugins]);

  const { yooptaPlugins, PLUGINS_MAP } = yooptaEditorPlugins;

  const editor = useMemo<YooEditor>(() => {
    let yooptaEditor = withHtml(
      withDeleteFragment(withNonEmptyEditor(withVoidNodes(withHistory(withShortcuts(withReact(createEditor())))))),
    );

    yooptaEditor.plugins = PLUGINS_MAP;

    const shortcutMap = {};
    yooptaPlugins.forEach((plugin) => {
      if (plugin.shortcut) {
        if (Array.isArray(plugin.shortcut)) {
          plugin.shortcut.forEach((shortcut) => (shortcutMap[shortcut] = plugin));
        } else shortcutMap[plugin.shortcut] = plugin;
      }

      yooptaEditor = plugin.extendEditor?.(yooptaEditor) || yooptaEditor;
    });

    yooptaEditor.shortcuts = shortcutMap;
    return yooptaEditor;
  }, [yooptaPlugins]);

  useEffect(() => {
    if (!autoFocus) return;

    try {
      const [, path] = Editor.first(editor, [0]);
      Transforms.select(editor, {
        anchor: { path, offset: 0 },
        focus: { path, offset: 0 },
      });

      ReactEditor.focus(editor);
    } catch (error) {}
  }, [autoFocus, editor]);

  return (
    <Slate editor={editor} value={val} onChange={onChangeValue} key={key}>
      <NodeSettingsProvider>
        <YooptaContextProvider plugins={yooptaPlugins} marks={marks} tools={tools}>
          <EditorYoopta
            editor={editor}
            readOnly={readOnly}
            placeholder={placeholder}
            plugins={yooptaPlugins}
            tools={tools}
            marks={marks}
            PLUGINS_MAP={PLUGINS_MAP}
            className={className}
          />
        </YooptaContextProvider>
      </NodeSettingsProvider>
    </Slate>
  );
};

export { YooptaEditor };

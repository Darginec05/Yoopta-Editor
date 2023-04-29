import { useCallback, useEffect, useState, Key, useMemo, ReactNode } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { YoEditor, YoptaBaseElement } from '../../types';
import { YoptaMark } from '../../utils/marks';
import { mergePlugins, mergePluginTypesToMap, YoptaPlugin } from '../../utils/plugins';
import { getInitialState, getStorageName, LOCAL_STORAGE_NAME_TYPE } from '../../utils/storage';
import { NodeSettingsProvider } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { EditorYopta } from '../Editor/Editor';
import { withVoidNodes } from '../Editor/plugins/voids';
import { withShortcuts } from '../Editor/plugins/shortcuts';
import { withNonEmptyEditor } from '../Editor/plugins/nonEmptyEditor';
import { withDeleteFragment } from '../Editor/plugins/deleteFragment';
import { withHtml } from '../Editor/plugins/pasteHtml';

export type YoptaNodeElementSettings = {
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

export type YoptaEditorProps<O, T> = {
  onChange: (_value: Descendant[]) => void;
  value: Descendant[];
  key?: Key;
  placeholder?: string;
  plugins: YoptaPlugin<O, T>[];
  children: ReactNode | ReactNode[];
  readOnly?: boolean;
  autoFocus?: boolean;
  shouldStoreInLocalStorage?: LOCAL_STORAGE_NAME_TYPE;
  marks: YoptaMark[];
  nodeElementSettings: YoptaNodeElementSettings;
};

const YoptaEditor = <O, T>({
  key,
  value,
  plugins,
  marks,
  readOnly,
  children,
  onChange,
  placeholder,
  autoFocus = true,
  shouldStoreInLocalStorage,
}: YoptaEditorProps<O, T>) => {
  const storageName = getStorageName(shouldStoreInLocalStorage);
  const [val, setVal] = useState(() => getInitialState(storageName, shouldStoreInLocalStorage, value));

  const onChangeValue = useCallback(
    (data: Descendant[]) => {
      onChange(data);
      setVal(data);

      if (!shouldStoreInLocalStorage) return;

      const hasChanges = editor.operations.some((op) => op.type !== 'set_selection');

      if (hasChanges) {
        try {
          const content = JSON.stringify(data);
          localStorage.setItem(storageName, content);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
    [shouldStoreInLocalStorage],
  );

  const yoptaEditorPlugins = useMemo(() => {
    const yoptaPlugins = mergePlugins(plugins);
    const PLUGINS_MAP = mergePluginTypesToMap(yoptaPlugins);

    return { yoptaPlugins, PLUGINS_MAP };
  }, [plugins]);

  const { yoptaPlugins, PLUGINS_MAP } = yoptaEditorPlugins;

  const editor = useMemo<YoEditor>(() => {
    let yoptaEditor = withHtml(
      withDeleteFragment(withNonEmptyEditor(withVoidNodes(withHistory(withShortcuts(withReact(createEditor())))))),
    );

    yoptaEditor.plugins = PLUGINS_MAP;

    const shortcutMap = {};
    yoptaPlugins.forEach((plugin) => {
      if (plugin.shortcut) {
        if (Array.isArray(plugin.shortcut)) {
          plugin.shortcut.forEach((shortcut) => (shortcutMap[shortcut] = plugin));
        } else shortcutMap[plugin.shortcut] = plugin;
      }

      yoptaEditor = plugin.extendEditor?.(yoptaEditor) || yoptaEditor;
    });

    yoptaEditor.shortcuts = shortcutMap;
    return yoptaEditor;
  }, [yoptaPlugins]);

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
        <EditorYopta
          editor={editor}
          readOnly={readOnly}
          placeholder={placeholder}
          plugins={yoptaPlugins}
          children={children}
          marks={marks}
          PLUGINS_MAP={PLUGINS_MAP}
        />
      </NodeSettingsProvider>
    </Slate>
  );
};

export { YoptaEditor };

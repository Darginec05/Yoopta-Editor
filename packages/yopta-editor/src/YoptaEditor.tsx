import { useCallback, useEffect, useState, Key, useMemo, ReactNode } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { EditorYopta } from './components/Editor/Editor';
// import { withVoidNodes, withFixDeleteFragment, withCopyPasting } from './components/Editor/plugins';
import NoSSR from './components/NoSsr/NoSsr';
import { NodeSettingsProvider } from './contexts/NodeSettingsContext/NodeSettingsContext';
import { mergePlugins, YoptaPlugin } from './utils/plugins';
import { getInitialState, getStorageName, LOCAL_STORAGE_NAME_TYPE } from './utils/storage';
import { withShortcuts } from './components/Editor/plugins/shortcuts';
import { withVoidNodes } from './components/Editor/plugins/voids';
import { YoptaMark } from './utils/marks';
import { YoEditor } from './types';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
  key?: Key;
  placeholder?: string;
  plugins: YoptaPlugin[];
  children: ReactNode | ReactNode[];
  readOnly?: boolean;
  autoFocus?: boolean;
  shouldStoreInLocalStorage?: LOCAL_STORAGE_NAME_TYPE;
  marks: YoptaMark[];
};

const YoptaEditorLib = ({
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
}: Props) => {
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

  const yoptaPlugins = useMemo(() => mergePlugins(plugins), [plugins]);

  const editor = useMemo<YoEditor>(() => {
    let yoptaEditor = withVoidNodes(withHistory(withShortcuts(withReact(createEditor()))));
    const shortcutMap = {};

    yoptaPlugins.forEach((plugin) => {
      if (plugin.shortcut) {
        shortcutMap[plugin.shortcut] = plugin.type;
      }

      yoptaEditor = plugin.extendEditor?.(yoptaEditor) || yoptaEditor;
    });

    yoptaEditor.shortcuts = shortcutMap;

    return yoptaEditor;
  }, [yoptaPlugins]);

  useEffect(() => {
    if (!autoFocus) return;

    try {
      const [, firstPath] = Editor.first(editor, [0]);
      Transforms.select(editor, {
        anchor: { path: firstPath, offset: 0 },
        focus: { path: firstPath, offset: 0 },
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
        />
      </NodeSettingsProvider>
    </Slate>
  );
};

const YoptaEditor = (props: Props) => {
  return (
    <NoSSR>
      <YoptaEditorLib {...props} />
    </NoSSR>
  );
};

export { YoptaEditor };

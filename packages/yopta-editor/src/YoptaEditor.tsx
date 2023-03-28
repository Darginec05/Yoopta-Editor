import { useCallback, useEffect, useState, Key, useMemo, ReactNode } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { EditorYopta } from './components/Editor/Editor';
import { ScrollProvider } from './contexts/ScrollContext/ScrollContext';
// import { withVoidNodes, withFixDeleteFragment, withCopyPasting } from './components/Editor/plugins';
import NoSSR from './components/NoSsr/NoSsr';
import { NodeSettingsProvider } from './contexts/NodeSettingsContext/NodeSettingsContext';
import { mergePlugins, YoptaPlugin } from './utils/plugins';
import { getInitialState, getStorageName, LOCAL_STORAGE_NAME_TYPE } from './utils/storage';
import { withShortcuts } from './components/Editor/plugins/shortcuts';
import { withVoidNodes } from './components/Editor/plugins/voids';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
  key?: Key;
  scrollElementSelector?: string;
  placeholder?: string;
  plugins: YoptaPlugin[];
  children: ReactNode | ReactNode[];
  readOnly?: boolean;
  autoFocus?: boolean;
  shouldStoreInLocalStorage?: LOCAL_STORAGE_NAME_TYPE;
};

const YoptaEditorLib = ({
  onChange,
  value,
  key,
  scrollElementSelector,
  placeholder,
  autoFocus = true,
  plugins,
  readOnly,
  children,
  shouldStoreInLocalStorage,
}: Props) => {
  const storageName = getStorageName(shouldStoreInLocalStorage);
  const [val, setVal] = useState(() => getInitialState(storageName, shouldStoreInLocalStorage, value));

  // const [editor] = useState<CustomEditor>(() =>
  //   withHistory(
  //     withCopyPasting(
  //       withFixDeleteFragment(
  //         withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor()))))),
  //       ),
  //     ),
  //   ),
  // );

  // useEffect(() => {
  //   if (!autoFocus) return;

  // if (!editor.selection && editor.children.length > 0) {
  //   const focusTimeout = setTimeout(() => {
  //     const firstNode: any = editor.children[0];
  //     const isList = LIST_TYPES.includes(firstNode.type);

  //     Transforms.select(editor, { path: isList ? [0, 0, 0] : [0, 0], offset: 0 });
  //     ReactEditor.focus(editor);
  //   }, 0);

  //   return () => clearTimeout(focusTimeout);
  // }
  // }, [autoFocus]);

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

  const editor = useMemo(() => {
    let slateEditor = withVoidNodes(withHistory(withShortcuts(withReact(createEditor()))));
    // let slateEditor = withHistory(withVoidNodes(withShortcuts(withReact(createEditor()))));

    const shortcutMap = {};

    yoptaPlugins.forEach((component) => {
      if (component.shortcut) {
        shortcutMap[component.shortcut] = component.type;
      }

      slateEditor = component.extendEditor?.(slateEditor) || slateEditor;
    });

    slateEditor.shortcuts = shortcutMap;

    return slateEditor;
  }, [yoptaPlugins]);

  return (
    <Slate editor={editor} value={val} onChange={onChangeValue} key={key}>
      <ScrollProvider scrollElementSelector={scrollElementSelector}>
        <NodeSettingsProvider>
          <EditorYopta
            editor={editor}
            readOnly={readOnly}
            placeholder={placeholder}
            plugins={yoptaPlugins}
            children={children}
          />
        </NodeSettingsProvider>
      </ScrollProvider>
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

import { useCallback, useEffect, useState, Key, useMemo, ReactNode } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { EditorYopta } from './components/Editor/Editor';
import { ScrollProvider } from './contexts/ScrollContext/ScrollContext';
// import { withVoidNodes, withFixDeleteFragment, withCopyPasting } from './components/Editor/plugins';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';
import NoSSR from './components/NoSsr/NoSsr';
import type { LibOptions } from './contexts/SettingsContext/SettingsContext';
import { NodeSettingsProvider } from './contexts/NodeSettingsContext/NodeSettingsContext';
import { mergeComponents, YoptaComponent } from './utils/component';
import { getInitialState, getStorageName } from './utils/storage';
import { withShortcuts } from './components/Editor/plugins/shortcuts';
import { withVoidNodes } from './components/Editor/plugins/voids';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
  key?: Key;
  scrollElementSelector?: string;
  components: YoptaComponent[];
  readOnly?: boolean;
  children: ReactNode | ReactNode[];
} & LibOptions;

const YoptaEditorLib = ({
  onChange,
  value,
  key,
  placeholder,
  scrollElementSelector,
  autoFocus = true,
  components,
  readOnly,
  children,
  ...options
}: Props) => {
  const storageName = getStorageName(options.shouldStoreInLocalStorage);
  const [val, setVal] = useState(() => getInitialState(options.shouldStoreInLocalStorage, storageName, value));

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

      if (!options.shouldStoreInLocalStorage) return;

      const hasChanges = editor.operations.some((op) => op.type !== 'set_selection');

      if (hasChanges) {
        try {
          const content = JSON.stringify(data);
          localStorage.setItem(storageName, content);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
    [options.shouldStoreInLocalStorage],
  );

  const yoptaComponents = useMemo(() => mergeComponents(components), [components]);

  const editor = useMemo(() => {
    let slateEditor = withVoidNodes(withHistory(withShortcuts(withReact(createEditor()))));
    // let slateEditor = withHistory(withVoidNodes(withShortcuts(withReact(createEditor()))));

    const shortcutMap = {};

    yoptaComponents.forEach((component) => {
      if (component.shortcut) {
        shortcutMap[component.shortcut] = component.type;
      }

      slateEditor = component.extendEditor?.(slateEditor) || slateEditor;
    });

    slateEditor.shortcuts = shortcutMap;

    return slateEditor;
  }, [yoptaComponents]);

  return (
    <Slate editor={editor} value={val} onChange={onChangeValue} key={key}>
      <SettingsProvider options={options}>
        <ScrollProvider scrollElementSelector={scrollElementSelector}>
          <NodeSettingsProvider>
            <EditorYopta editor={editor} placeholder={placeholder} components={yoptaComponents} children={children} />
          </NodeSettingsProvider>
        </ScrollProvider>
      </SettingsProvider>
    </Slate>
  );
};

const YoptaEditor = (props: Props) => {
  if (props.readOnly) {
    return <YoptaEditorLib {...props} />;
  }

  return (
    <NoSSR>
      <YoptaEditorLib {...props} />
    </NoSSR>
  );
};

export { YoptaEditor };

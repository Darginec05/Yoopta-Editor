import { useCallback, useEffect, useState, Key, useMemo } from 'react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';
import { createEditor, Descendant, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { EditorYopta } from './components/Editor/Editor';
import { ScrollProvider } from './contexts/ScrollContext/ScrollContext';
import { withShortcuts, withVoidNodes, withFixDeleteFragment, withCopyPasting } from './components/Editor/plugins';
import { ActionMenuProvider } from './contexts/ActionMenuContext/ActionMenuContext';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';
import NoSSR from './components/NoSsr/NoSsr';
import type { LibOptions } from './contexts/SettingsContext/SettingsContext';
import { NodeSettingsProvider } from './contexts/NodeSettingsContext/NodeSettingsContext';
import { isValidYoptaNodes } from './utils/validate';
import { LIST_TYPES } from './components/Editor/constants';
import { YoptaComponent } from './utils/component';
import { generateId } from './utils/generateId';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
  key?: Key;
  scrollElementSelector?: string;
  components: YoptaComponent[];
} & LibOptions;

const DEFAULT_YOPTA_LS_NAME = 'yopta-content';

const getStorageName = (shouldStoreInLocalStorage: LibOptions['shouldStoreInLocalStorage']) => {
  if (typeof shouldStoreInLocalStorage === 'object' && shouldStoreInLocalStorage.name) {
    return shouldStoreInLocalStorage.name;
  }

  return DEFAULT_YOPTA_LS_NAME;
};

const getInitialState = (
  shouldStoreInLocalStorage: LibOptions['shouldStoreInLocalStorage'],
  storageName: string,
  value?: Descendant[],
): Descendant[] => {
  const DEFAULT_STATE = [{ id: generateId(), type: 'paragraph', children: [{ text: '' }] }] as Descendant[];
  const defaultValue = isValidYoptaNodes(value) ? value : DEFAULT_STATE;

  if (!shouldStoreInLocalStorage) {
    localStorage.removeItem(storageName);
    return defaultValue as Descendant[];
  }

  try {
    const storedData = JSON.parse(localStorage.getItem(storageName) || '[]');

    return isValidYoptaNodes(storedData) ? storedData : defaultValue;
  } catch (error) {
    localStorage.removeItem(storageName);
    return DEFAULT_STATE;
  }
};

const YoptaEditorLib = ({
  onChange,
  value,
  key,
  placeholder,
  scrollElementSelector,
  autoFocus = true,
  components,
  ...options
}: Props) => {
  const storageName = getStorageName(options.shouldStoreInLocalStorage);
  const [val, setVal] = useState(() => getInitialState(options.shouldStoreInLocalStorage, storageName, value));

  const editor = useMemo(() => {
    let editor = withHistory(withReact(createEditor()));

    components.forEach((component) => {
      editor = component.extendEditor?.(editor) || editor;
    });

    return editor;
  }, [components]);

  // const [editor] = useState<CustomEditor>(() =>
  //   withHistory(
  //     withCopyPasting(
  //       withFixDeleteFragment(
  //         withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor()))))),
  //       ),
  //     ),
  //   ),
  // );

  useEffect(() => {
    if (!autoFocus) return;

    if (!editor.selection && editor.children.length > 0) {
      const focusTimeout = setTimeout(() => {
        const firstNode: any = editor.children[0];
        const isList = LIST_TYPES.includes(firstNode.type);

        Transforms.select(editor, { path: isList ? [0, 0, 0] : [0, 0], offset: 0 });
        ReactEditor.focus(editor);
      }, 0);

      return () => clearTimeout(focusTimeout);
    }
  }, [autoFocus]);

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

  return (
    <Slate editor={editor} value={val} onChange={onChangeValue} key={key}>
      <SettingsProvider options={options}>
        <ScrollProvider scrollElementSelector={scrollElementSelector}>
          <ActionMenuProvider>
            <NodeSettingsProvider>
              <EditorYopta editor={editor} placeholder={placeholder} components={components} />
            </NodeSettingsProvider>
          </ActionMenuProvider>
        </ScrollProvider>
      </SettingsProvider>
    </Slate>
  );
};

const YoptaEditor = (props: Props) => (
  <NoSSR>
    <YoptaEditorLib {...props} />
  </NoSSR>
);

export { YoptaEditor };

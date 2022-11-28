import { useCallback, useEffect, useState, Key } from 'react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';
import { createEditor, Descendant, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { YoptaEditor as Editor } from './components/Editor/Editor';
import { ScrollProvider } from './contexts/ScrollContext/ScrollContext';
import {
  withShortcuts,
  withInlines,
  withVoidNodes,
  withCorrectVoidBehavior,
  withFixDeleteFragment,
} from './components/Editor/plugins';
import { ActionMenuProvider } from './contexts/ActionMenuContext/ActionMenuContext';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';
import NoSSR from './components/NoSsr/NoSsr';
import type { LibOptions } from './contexts/SettingsContext/SettingsContext';
import { CustomEditor } from './components/Editor/types';
import { NodeSettingsProvider } from './contexts/NodeSettingsContext/NodeSettingsContext';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
  key?: Key;
} & LibOptions;

const DEFAULT_YOPTA_LS_NAME = 'yopta-content';

const getStorageName = (shouldStoreInLocalStorage: LibOptions['shouldStoreInLocalStorage']) => {
  if (typeof shouldStoreInLocalStorage === 'object' && shouldStoreInLocalStorage.name) {
    return shouldStoreInLocalStorage.name;
  }

  return DEFAULT_YOPTA_LS_NAME;
};

const isValidNode = (value: any): boolean =>
  Array.isArray(value) && value.length > 0 && value[0].type && value[0].children.length > 0;

const getInitialState = (
  shouldStoreInLocalStorage: LibOptions['shouldStoreInLocalStorage'],
  storageName: string,
  value?: Descendant[],
): Descendant[] => {
  const DEFAULT_STATE = [{ id: v4(), type: 'paragraph', children: [{ text: '' }] }] as Descendant[];

  const defaultValue = isValidNode(value) ? value : DEFAULT_STATE;

  if (!shouldStoreInLocalStorage) {
    localStorage.removeItem(storageName);
    return defaultValue as Descendant[];
  }

  const storedData = JSON.parse(localStorage.getItem(storageName) || '[]');
  return isValidNode(storedData) ? storedData : defaultValue;
};

const YoptaEditorLib = ({ onChange, value, key, ...options }: Props) => {
  const storageName = getStorageName(options.shouldStoreInLocalStorage);
  const [val, setVal] = useState(() => getInitialState(options.shouldStoreInLocalStorage, storageName, value));

  const [editor] = useState<CustomEditor>(() =>
    withFixDeleteFragment(
      withHistory(withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor())))))),
    ));

  useEffect(() => {
    if (!editor.selection && editor.children.length > 0) {
      const focusTimeout = setTimeout(() => {
        Transforms.select(editor, { path: [0, 0], offset: 0 });
        ReactEditor.focus(editor);

        clearTimeout(focusTimeout);
      }, 0);
    }
  }, []);

  const onChangeValue = useCallback(
    (newValue: Descendant[]) => {
      onChange(newValue);
      setVal(newValue);

      if (!options.shouldStoreInLocalStorage) return;

      const hasChanges = editor.operations.some((op) => op.type !== 'set_selection');

      if (hasChanges) {
        try {
          const content = JSON.stringify(newValue);
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
        <ScrollProvider>
          <ActionMenuProvider>
            <NodeSettingsProvider>
              <Editor editor={editor} />
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

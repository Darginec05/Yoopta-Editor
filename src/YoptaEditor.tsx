import { useCallback, useState } from 'react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
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

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
} & LibOptions;

const DEFAULT_YOPTA_LS_NAME = 'yopta-content';

const getInitialState = (
  shouldStoreInLocalStorage: LibOptions['shouldStoreInLocalStorage'],
  value?: Descendant[],
): Descendant[] => {
  const DEFAULT_STATE = [{ id: v4(), type: 'paragraph', children: [{ text: '' }] }] as Descendant[];

  const defaultValue =
    /* @ts-ignore */
    Array.isArray(value) && value.length && value[0].type && value[0].children > 0 ? value : DEFAULT_STATE;

  if (!shouldStoreInLocalStorage) {
    localStorage.removeItem(DEFAULT_YOPTA_LS_NAME);
    return defaultValue;
  }

  const storedData = localStorage.getItem(DEFAULT_YOPTA_LS_NAME);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const YoptaEditorLib = ({ onChange, value, ...options }: Props) => {
  const [val, setVal] = useState(() => getInitialState(options.shouldStoreInLocalStorage, value));

  const [editor] = useState(() => withFixDeleteFragment(
    withHistory(withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor())))))),
  ));

  const onChangeValue = useCallback(
    (newValue: Descendant[]) => {
      onChange(newValue);
      setVal(newValue);

      if (!options.shouldStoreInLocalStorage) return;

      const hasChanges = editor.operations.some((op) => op.type !== 'set_selection');

      if (hasChanges) {
        try {
          const content = JSON.stringify(newValue);
          localStorage.setItem(DEFAULT_YOPTA_LS_NAME, content);
        } catch (error) {}
      }
    },
    [options.shouldStoreInLocalStorage],
  );

  return (
    <Slate editor={editor} value={val} onChange={onChangeValue}>
      <SettingsProvider options={options}>
        <ScrollProvider>
          <ActionMenuProvider>
            <Editor editor={editor} />
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

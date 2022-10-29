import { useCallback, useState } from 'react';
import { withHistory } from 'slate-history';
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
import type { LibOptions } from './contexts/SettingsContext/SettingsContext';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
} & LibOptions;

export const DEFAULT_STATE = [{ id: 'kek', type: 'paragraph', children: [{ text: '' }] }] as Descendant[];

const YoptaEditor = ({ onChange, value = DEFAULT_STATE, ...options }: Props) => {
  const [editor] = useState(() => withFixDeleteFragment(
    withHistory(withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor())))))),
  ));

  const onChangeValue = useCallback((newValue: Descendant[]) => {
    onChange(newValue);

    if (!options.shouldStoreInLocalStorage) return;

    const isASTChanged = editor.operations.some((op) => op.type !== 'set_selection');

    if (isASTChanged) {
      try {
        const content = JSON.stringify(newValue);
        localStorage.setItem('content', content);
      } catch (error) {}
    }
  }, [options.shouldStoreInLocalStorage]);

  return (
    <Slate editor={editor} value={value} onChange={onChangeValue}>
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

export default YoptaEditor;

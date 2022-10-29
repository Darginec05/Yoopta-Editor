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

type Props = {
  onChange: (_value: Descendant[]) => void;
  state: Descendant[];
};

const YoptaEditor = ({ onChange, state = [] }: Props) => {
  const [value, setValue] = useState<Descendant[]>(state);

  const [editor] = useState(() => withFixDeleteFragment(
    withHistory(withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor())))))),
  ));

  const onChangeValue = useCallback((newValue) => {
    onChange(newValue);
    setValue(newValue);
    const isASTChanged = editor.operations.some((op) => op.type !== 'set_selection');

    if (isASTChanged) {
      try {
        const content = JSON.stringify(newValue);
        localStorage.setItem('content', content);
      } catch (error) {
        // [TODO] - don't store base64 src in image node
        console.log(error);
      }
    }
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={onChangeValue}>
      <ScrollProvider>
        <ActionMenuProvider>
          <Editor editor={editor} />
        </ActionMenuProvider>
      </ScrollProvider>
    </Slate>
  );
};

export default YoptaEditor;

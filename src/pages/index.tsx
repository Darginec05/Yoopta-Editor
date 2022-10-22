import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { AlertProvider } from '../components/Alert/Alert';
import { YoptaEditor } from '../components/Editor/Editor';
import { ScrollProvider } from '../contexts/ScrollContext/ScrollContext';
import {
  withShortcuts,
  withInlines,
  withVoidNodes,
  withCorrectVoidBehavior,
  withFixDeleteFragment,
} from '../components/Editor/plugins';
import { DEFAULT_STATE } from '../components/Editor/utils';
import { ActionMenuProvider } from '../contexts/ActionMenuContext/ActionMenuContext';

const isServer = typeof window === 'undefined';

const getInitialData = () => {
  if (isServer) return [];

  const content = localStorage.getItem('content');

  return content ? JSON.parse(content) : JSON.parse(DEFAULT_STATE);
};

const Home: NextPage = () => {
  const [value, setValue] = useState<Descendant[]>(() => getInitialData());

  const [editor] = useState(() => withFixDeleteFragment(
    withHistory(withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor())))))),
  ));

  const onChange = useCallback((newValue) => {
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

  if (isServer) return null;

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <ScrollProvider>
        <AlertProvider>
          <ActionMenuProvider>
            <YoptaEditor editor={editor} />
          </ActionMenuProvider>
        </AlertProvider>
      </ScrollProvider>
    </Slate>
  );
};

export default Home;

import { YoptaEditor } from '@yopta/editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code, { CodeLine } from '@yopta/code';
import Link from '@yopta/link';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import '@yopta/editor/dist/index.css';

const toChildren = (content: string) => [{ text: content }];
const toCodeLines = (content: string): Element[] =>
  content.split('\n').map((line) => ({ type: 'code-line', children: toChildren(line) }));

const initialValue: Descendant[] = [
  {
    id: '1',
    type: 'paragraph',
    children: [{ text: 'Code element' }],
  },
  {
    id: '2',
    type: 'code',
    language: 'jsx',
    children: toCodeLines(`// Add the initial value.
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable />
    </Slate>
  )
}`),
  },
];

const components = [Paragraph, Blockquote, Callout, Code, Link, CodeLine];

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

  return (
    <div className={s.container} style={{ display: 'block' }}>
      <YoptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        className={s.editor}
        shouldStoreInLocalStorage={{ name: 'yopta-dev' }}
        components={components}
      />
      <pre className={s.editor} style={{ display: 'block', padding: '0 64px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(editorValue, null, 2)}
      </pre>
    </div>
  );
};

export default BasicExample;

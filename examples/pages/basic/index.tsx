import { YoptaEditor } from '@yopta/editor';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import '@yopta/editor/dist/index.css';

const initialValue = [
  {
    type: 'heading-two',
    id: 'ed117ae4-0177-4879-b4fd-c6423f57b190',
    children: [
      {
        text: 'Hi There!',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '36d5ece5-093e-450a-8cb9-674917472365',
    children: [
      {
        text: "Let's start to test our Yopta-Editor 🤟",
      },
    ],
  },
];

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

  return (
    <div className={s.container}>
      <YoptaEditor value={editorValue} onChange={(val: Descendant[]) => setEditorValue(val)} className={s.editor} />
    </div>
  );
};

export default BasicExample;

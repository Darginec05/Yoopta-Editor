import { YoptaEditor, YoptaRenderer } from 'yopta-editor';

import s from './styles.module.scss';
import 'yopta-editor/dist/index.css';
import { useState } from 'react';
import { Descendant } from 'slate';

const initialData = [
  {
    id: '663607d6-80c8-4d96-811a-1d7ad2aadcdd',
    type: 'heading-one',
    children: [
      {
        text: '<YoptaRenderer /> - component just for render',
      },
    ],
    isVoid: false,
  },
  {
    id: 'f903cce8-8b70-441a-a81b-57181fbd2a7b',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Use this component for just displaying your data',
      },
    ],
  },
];

const JustRenderExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialData);
  const [mode, setMode] = useState<'render' | 'editor'>('render');

  if (mode === 'editor') {
    return (
      <div className={s.container}>
        <YoptaEditor value={editorValue} onChange={(data) => setEditorValue(data)} className={s.editor} autoFocus />
        <button onClick={() => setMode('render')} className={s.button}>
          Switch to render mode
        </button>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <YoptaRenderer data={editorValue} className={s.editor} />
      <button className={s.button} onClick={() => setMode('editor')}>
        Switch to edit mode
      </button>
    </div>
  );
};

export default JustRenderExample;

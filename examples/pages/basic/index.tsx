import { YoptaEditor } from 'yopta-editor';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import 'yopta-editor/dist/index.css';

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  return (
    <div className={s.container}>
      <YoptaEditor value={editorValue} onChange={(val: Descendant[]) => setEditorValue(val)} className={s.editor} />
    </div>
  );
};

export default BasicExample;

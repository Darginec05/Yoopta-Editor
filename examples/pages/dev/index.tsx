import { YoptaEditor } from 'yopta-editor';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  return (
    <div className={s.container}>
      <YoptaEditor value={editorValue} onChange={(val: Descendant[]) => setEditorValue(val)} shouldStoreInLocalStorage className={s.editor} />
    </div>
  );
};

export default BasicExample;

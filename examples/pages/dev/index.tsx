import { YoptaEditor } from '@yopta/editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code from '@yopta/code';
import Link from '@yopta/link';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import '@yopta/editor/dist/index.css';

const components = [Paragraph, Blockquote, Callout, Code, Link];

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  return (
    <div className={s.container}>
      <YoptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        className={s.editor}
        shouldStoreInLocalStorage={{ name: 'yopta-dev' }}
        components={components}
      />
    </div>
  );
};

export default BasicExample;

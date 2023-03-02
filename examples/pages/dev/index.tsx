import { YoptaEditor } from '@yopta/editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code, { CodeLine } from '@yopta/code';
import Link from '@yopta/link';
import Lists from '@yopta/lists';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import '@yopta/editor/dist/index.css';

const components = [
  Paragraph,
  Blockquote,
  Callout,
  Code,
  Link,
  CodeLine,
  Lists.NumberedList,
  Lists.BulletedList,
  Lists.ListItemList,
];

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

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

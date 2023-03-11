import { YoptaComponent, YoptaEditor } from '@yopta/editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code from '@yopta/code';
import Link from '@yopta/link';
import Lists from '@yopta/lists';
import Headings from '@yopta/headings';
import { useMemo, useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import '@yopta/editor/dist/index.css';

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  const components = useMemo<YoptaComponent[]>(() => {
    return [
      // Blockquote.extend({ renderer: (editor) => (props) => <div {...props.attributes}>{props.children}</div> }),
      Paragraph,
      Blockquote,
      Callout,
      Code,
      Link,
      Lists.NumberedList,
      Lists.BulletedList,
      Lists.TodoList,
      Headings.HeadingOne,
      Headings.HeadingTwo,
      Headings.HeadingThree,
    ];
  }, []);

  return (
    <div className={s.container}>
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

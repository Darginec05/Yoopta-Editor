import { YoptaEditor } from '@yopta/editor';
import { useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
// import '@yopta/editor/dist/index.css';

const initialValue = [
  {
    id: '9a7a0a5d-ab97-4519-bac8-50d7a71e5336',
    type: 'paragraph',
    children: [
      {
        text: 'Type something and refresh the page. Your data will be saved!',
      },
    ],
  },
];

const OfflineExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

  return (
    <div className={s.container}>
      <YoptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        className={s.editor}
        shouldStoreInLocalStorage // DEFAULT NAME => yopta-content
        // or
        // shouldStoreInLocalStorage={{ name: 'localstorage-name' }}
      />
    </div>
  );
};

export default OfflineExample;

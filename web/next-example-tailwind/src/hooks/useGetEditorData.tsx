import { YooEditor } from '@yoopta/editor';
import { useEffect } from 'react';

export const useGetEditorData = (editor: YooEditor) => {
  useEffect(() => {
    function getEditorData(event) {
      const isCMD = event.ctrlKey || event.metaKey;
      const isEnter = event.key === 'Enter';
      if (isEnter && isCMD) {
        console.log('editor data', editor.getEditorValue());
      }
    }

    window.addEventListener('keydown', getEditorData);
    return () => window.removeEventListener('keydown', getEditorData);
  }, [editor]);
};

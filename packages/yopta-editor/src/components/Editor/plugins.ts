import { Transforms } from 'slate';
import { YoEditor } from '../../types';
import { deserializeHTML } from './utils';

export const withCopyPasting = (editor: YoEditor) => {
  const { insertData } = editor;

  editor.insertData = (data: DataTransfer) => {
    const html = data.getData('text/html');

    if (html) {
      try {
        const parsed = new DOMParser().parseFromString(html, 'text/html');

        const fragment = deserializeHTML(parsed.body);
        Transforms.insertFragment(editor, fragment);
        return;
      } catch (error) {
        console.error(error);
      }
    }

    insertData(data);
  };

  return editor;
};

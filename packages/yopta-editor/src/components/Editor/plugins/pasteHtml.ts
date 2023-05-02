import { Range, Transforms } from 'slate';
import { YoEditor } from '../../../types';
import { deserializeHtml } from '../../../utils/deserializeHTML';

const withHtml = (editor: YoEditor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    if (editor.selection && Range.isExpanded(editor.selection)) return;
    const html = data.getData('text/html');

    if (html) {
      const fragment = deserializeHtml(html, editor.plugins);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

export { withHtml };

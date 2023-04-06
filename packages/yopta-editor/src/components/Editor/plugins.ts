import { Editor, Range, Transforms } from 'slate';
import { deserializeHTML } from './utils';

export const withFixDeleteFragment = (editor: YoEditor) => {
  // Fixes https://github.com/ianstormtaylor/slate/issues/3605
  editor.deleteFragment = () => {
    const { selection } = editor;

    if (selection && Range.isExpanded(selection)) {
      Transforms.delete(editor, { hanging: false });
      // Transforms.setNodes(editor, { type: 'paragraph', id: generateId() });
    }
  };
  return editor;
};

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

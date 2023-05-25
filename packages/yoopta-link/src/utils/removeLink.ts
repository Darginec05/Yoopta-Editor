import { YooEditor } from '@yoopta/editor';
import { Editor, Element, Transforms } from 'slate';

export const removeLinkNode = (editor: YooEditor) => {
  console.log('removeLinkNode editor selection', editor.selection);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

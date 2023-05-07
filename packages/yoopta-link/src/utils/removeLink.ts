import { YoEditor } from '@yoopta/editor';
import { Editor, Element, Transforms } from 'slate';

export const removeLinkNode = (editor: YoEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

import { YooEditor } from '@yoopta/editor';
import { Editor, Element } from 'slate';

export const getMatchedLinkNode = (editor: YooEditor, type: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    }),
  );

  return match;
};

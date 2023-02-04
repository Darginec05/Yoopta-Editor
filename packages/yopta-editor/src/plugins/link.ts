import { KeyboardEvent } from 'react';
import { v4 } from 'uuid';
import { Editor, Element, Transforms } from 'slate';

export const createLinkPlugin = (editor: Editor) => {
  return {
    handlers: {
      onSpace: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;
        const { anchor } = editor.selection;

        const inline = Editor.above(editor, {
          match: (n) => Element.isElement(n) && Editor.isInline(editor, n),
          mode: 'highest',
        });

        if (inline) {
          const [, inlinePath] = inline;

          if (Editor.isEnd(editor, anchor, inlinePath)) {
            const afterPoint = Editor.after(editor, inlinePath)!;

            Transforms.setSelection(editor, {
              anchor: afterPoint,
              focus: afterPoint,
            });
          }
        }
      },
      onEnter: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;

        const { anchor } = editor.selection;
        const isEnd = Editor.isEnd(editor, anchor, anchor.path);
        const isStart = Editor.isStart(editor, anchor, anchor.path);

        if (!isEnd && !isStart) {
          event.preventDefault();
          Transforms.splitNodes(editor);
          Transforms.setNodes(editor, { id: v4() });
        }
      },
    },
  };
};

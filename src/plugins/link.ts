import { KeyboardEvent } from 'react';
import { v4 } from 'uuid';
import { Editor, Transforms } from 'slate';
import { ELEMENT_TYPES_MAP } from '../components/Editor/constants';

export const createLinkPlugin = (editor: Editor) => {
  return {
    handlers: {
      onSpace: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;
        const { anchor } = editor.selection;

        const inline = Editor.above(editor, {
          match: (n) => Editor.isInline(editor, n) && n.type === ELEMENT_TYPES_MAP.link,
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

        if (isEnd) {
          event.preventDefault();
          Editor.insertBreak(editor);
          Transforms.setNodes(editor, { id: v4() });
          Transforms.removeNodes(editor, {
            match: (n) => Editor.isInline(editor, n) && n.type === ELEMENT_TYPES_MAP.link,
          });

          return;
        }

        if (!isEnd && !isStart) {
          event.preventDefault();
          Transforms.splitNodes(editor);
          Transforms.setNodes(editor, { id: v4() });
          Transforms.setNodes(
            editor,
            { id: v4() },
            { match: (n) => Editor.isInline(editor, n) && n.type === ELEMENT_TYPES_MAP.link },
          );
        }
      },
    },
  };
};

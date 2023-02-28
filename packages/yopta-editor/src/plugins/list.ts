import { KeyboardEvent } from 'react';
import { Editor, Transforms } from 'slate';
import { getNodeByCurrentPath, toggleBlock } from '../components/Editor/utils';
import { generateId } from '../utils/generateId';

export const createListPlugin = (editor: Editor) => {
  return {
    handlers: {
      onEnter: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;
        event.preventDefault();

        const isShiftKey = event.shiftKey;
        const { anchor } = editor.selection;
        const text = Editor.string(editor, anchor.path);
        const currentRootLevelNode: any = getNodeByCurrentPath(editor);
        const isEnd = Editor.isEnd(editor, anchor, anchor.path);
        const isStart = Editor.isStart(editor, anchor, anchor.path);

        if (isShiftKey) {
          editor.insertText('\n');
          return;
        }

        if (text.trim() === '') {
          toggleBlock(editor, 'paragraph');
          return;
        }

        if (!isEnd && !isStart) {
          Transforms.splitNodes(editor);
          Transforms.setNodes(editor, { id: generateId() });
          return;
        }

        const listItem = {
          ...currentRootLevelNode,
          id: generateId(),
          children: [
            {
              text: '',
            },
          ],
        };

        Transforms.insertNodes(editor, listItem);

        Transforms.select(editor, {
          anchor: { path: [anchor.path[0], anchor.path[1] + 1, 0], offset: 0 },
          focus: { path: [anchor.path[0], anchor.path[1] + 1, 0], offset: 0 },
        });
      },
      onBackspace: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;
        const { anchor } = editor.selection;
        const isStart = Editor.isStart(editor, anchor, anchor.path);

        if (isStart && anchor.path[1] === 0) {
          event.preventDefault();
          return toggleBlock(editor, 'list-item');
        }
      },
    },
  };
};

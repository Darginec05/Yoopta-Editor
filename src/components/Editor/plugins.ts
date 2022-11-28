/* eslint-disable no-param-reassign */
import { Editor, Element, Range, Transforms, Node, Path } from 'slate';
import { v4 } from 'uuid';
import isUrl from 'is-url';
import { BulletedListElement, NumberedListElement, ParagraphElement } from './types';
import { KEYBOARD_SHORTCUTS, addLinkNode } from './utils';
import { VOID_ELEMENTS } from './constants';

export const withVoidNodes = (editor: Editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element: Element) => {
    return VOID_ELEMENTS.includes(element.type) ? true : isVoid(element);
  };

  return editor;
};

export const withShortcuts = (editor: Editor) => {
  const { insertText } = editor;

  editor.insertText = (text: string) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;

      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      const type = KEYBOARD_SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<Element> = {
          type,
        };

        Transforms.setNodes<Element>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === 'list-item') {
          const list: BulletedListElement | NumberedListElement = {
            id: v4(),
            type: beforeText === '-' ? 'bulleted-list' : 'numbered-list',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'list-item',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  return editor;
};

export const withInlines = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => (element.type === 'link' ? true : isInline(element));

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      addLinkNode(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      addLinkNode(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const withCorrectVoidBehavior = (editor: Editor) => {
  const { deleteBackward, insertBreak } = editor;

  // if current selection is void node, insert a default node below
  // eslint-disable-next-line consistent-return
  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak();
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path);
    const selectedNode = Node.get(editor, selectedNodePath);

    if (Editor.isVoid(editor, selectedNode)) {
      Editor.insertNode(editor, {
        id: v4(),
        type: 'paragraph',
        children: [{ text: '' }],
      });
      return undefined;
    }

    insertBreak();
  };

  // if prev node is a void node, remove the current node and select the void node
  editor.deleteBackward = (unit: 'character' | 'word' | 'line' | 'block') => {
    if (!editor.selection || !Range.isCollapsed(editor.selection) || editor.selection.anchor.offset !== 0) {
      return deleteBackward(unit);
    }

    const parentPath = Path.parent(editor.selection.anchor.path);
    const parentNode = Node.get(editor, parentPath);
    const parentIsEmpty = Node.string(parentNode).length === 0;

    if (parentIsEmpty && Path.hasPrevious(parentPath)) {
      const prevNodePath = Path.previous(parentPath);
      const prevNode = Node.get(editor, prevNodePath);
      if (Editor.isVoid(editor, prevNode)) {
        Transforms.removeNodes(editor);
        return Transforms.select(editor, prevNodePath);
      }
    }

    deleteBackward(unit);
  };

  return editor;
};

export const withFixDeleteFragment = (editor: Editor) => {
  // Fixes https://github.com/ianstormtaylor/slate/issues/3605
  editor.deleteFragment = () => {
    const { selection } = editor;

    if (selection && Range.isExpanded(selection)) {
      const lineParagraph: ParagraphElement = {
        id: v4(),
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      };

      Transforms.delete(editor, { hanging: false });
      Transforms.setNodes(editor, lineParagraph);
    }
  };
  return editor;
};

export const withCopyPasting = (editor: Editor) => {
  const { insertData } = editor;

  editor.insertData = (data: DataTransfer) => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const lineParagraph: ParagraphElement = {
        id: v4(),
        type: 'paragraph',
        children: [
          {
            text: parsed.body.textContent || '',
          },
        ],
      };

      insertData(data);
      Transforms.setNodes(editor, lineParagraph);
      return;
    }

    insertData(data);
  };

  return editor;
};

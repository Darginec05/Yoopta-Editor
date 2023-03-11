/* eslint-disable no-param-reassign */
import { Editor, Element, Range, Transforms, Node, Path } from 'slate';
import { deserializeHTML } from './utils';
import { VOID_ELEMENTS } from './constants';
import { generateId } from '../../utils/generateId';

export const withVoidNodes = (editor: Editor) => {
  const { isVoid, insertBreak, deleteBackward } = editor;

  editor.isVoid = (element: Element) => {
    return VOID_ELEMENTS.includes(element.type) ? true : isVoid(element);
  };

  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak();
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path);
    const selectedNode = Node.get(editor, selectedNodePath);

    if (Element.isElement(selectedNode) && Editor.isVoid(editor, selectedNode)) {
      Editor.insertNode(editor, {
        id: generateId(),
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
      if (Element.isElement(prevNode) && Editor.isVoid(editor, prevNode)) {
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
      Transforms.delete(editor, { hanging: false });
      // Transforms.setNodes(editor, { type: 'paragraph', id: generateId() });
    }
  };
  return editor;
};

export const withCopyPasting = (editor: Editor) => {
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

import { createYoptaPlugin, generateId } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import type { ListChildItemElement, ListOptions, NumberedList } from '../types';
import { ListItemList } from './ListItem';

const NumberedListRender = ({ attributes, children }) => {
  return (
    <ol draggable={false} {...attributes}>
      {children}
    </ol>
  );
};

const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

const NumberedList = createYoptaPlugin<ListOptions, NumberedList>({
  type: NUMBERED_LIST_NODE_TYPE,
  renderer: (editor) => NumberedListRender,
  childPlugin: ListItemList,
  shortcut: '1.',
  createNode: (editor, type, data = {}) => {
    const listItem: ListChildItemElement = {
      id: generateId(),
      type: 'list-item',
      children: [{ text: '' }],
    };

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type !== 'list-item' &&
        n.type !== 'todo-list-item' &&
        n.options?.depth >= 1,
      split: true,
    });

    Transforms.setNodes(editor, listItem, {
      at: editor.selection?.anchor,
    });

    const numberedList: NumberedList = {
      id: generateId(),
      type: 'numbered-list',
      children: [listItem],
      options: { depth: 1 },
    };

    Transforms.wrapNodes(editor, numberedList, {
      at: editor.selection?.anchor,
    });
  },
});

export { NumberedList };

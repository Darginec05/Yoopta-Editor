import { createYoptaPlugin, generateId, YoptaPlugin } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import type { BulletedList, ListChildItemElement, ListOptions } from '../types';
import { ListItemList } from './ListItem';

const BulletedListRender = ({ attributes, children, element }) => {
  return (
    <ul draggable={false} {...attributes}>
      {children}
    </ul>
  );
};

const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

const BulletedList = createYoptaPlugin<ListOptions, BulletedList>({
  type: BULLETED_LIST_NODE_TYPE,
  renderer: (editor) => BulletedListRender,
  // [TODO] - fix for nested items
  shortcut: '-',
  childPlugin: ListItemList,
  createNode: (editor, type, data = {}) => {
    const listItem: ListChildItemElement = {
      id: generateId(),
      type: 'list-item',
      children: [{ text: '' }],
      ...data,
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

    const bulletedList: BulletedList = {
      id: generateId(),
      type: 'bulleted-list',
      children: [listItem],
      options: { depth: 1 },
    };

    Transforms.wrapNodes(editor, bulletedList, {
      at: editor.selection?.anchor,
    });
  },
});

export { BulletedList };

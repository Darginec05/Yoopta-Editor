import { createYoptaPlugin, generateId, RenderElementProps, YoptaPlugin } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import type { BulletedList, ListChildItemElement, ListOptions } from '../types';
import { ListItemList } from './ListItem';

const BulletedListRender = ({ attributes, children, element }: RenderElementProps<BulletedList>) => {
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
  getElement: () => ({
    id: generateId(),
    type: 'bulleted-list',
    children: [ListItemList.getPlugin.getElement()],
    nodeType: 'block',
    data: { depth: 1 },
  }),
  createElement: (editor, type, data = {}) => {
    const listItem: ListChildItemElement = ListItemList.getPlugin.getElement();

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type !== 'list-item' &&
        n.type !== 'todo-list-item' &&
        n.data?.depth >= 1,
      split: true,
    });

    Transforms.setNodes(editor, listItem, {
      at: editor.selection?.anchor,
    });

    const bulletedList: BulletedList = BulletedList.getPlugin.getElement();
    Transforms.wrapNodes(editor, bulletedList, {
      at: editor.selection?.anchor,
    });
  },
});

export { BulletedList };

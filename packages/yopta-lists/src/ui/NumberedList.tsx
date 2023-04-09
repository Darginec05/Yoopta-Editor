import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import type { ListChildItemElement, ListOptions, NumberedList } from '../types';
import { ListItemList } from './ListItem';

const NumberedListRender = ({ attributes, children }: RenderElementProps<NumberedList>) => {
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
  getElement: () => ({
    id: generateId(),
    type: 'numbered-list',
    children: [ListItemList.getPlugin.getElement()],
    nodeType: 'block',
    data: { depth: 1 },
  }),
  createElement: (editor) => {
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

    const numberedList: NumberedList = NumberedList.getPlugin.getElement();

    Transforms.wrapNodes(editor, numberedList, {
      at: editor.selection?.anchor,
    });
  },
});

export { NumberedList };

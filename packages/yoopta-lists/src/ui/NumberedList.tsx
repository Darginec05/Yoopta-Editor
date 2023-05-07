import { createYooptaPlugin, generateId, RenderYooptaElementProps } from '@yoopta/editor';
import { Editor, Element, Transforms } from 'slate';
import type { ListChildItemElement, ListOptions, NumberedList } from '../types';
import { ListItemList } from './ListItem';
import s from './NumberedList.module.scss';

const NumberedListRender = ({ attributes, children, HTMLAttributes }: RenderYooptaElementProps<NumberedList>) => {
  return (
    <ol draggable={false} {...HTMLAttributes} {...attributes} className={s.list}>
      {children}
    </ol>
  );
};

const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

const NumberedList = createYooptaPlugin<ListOptions, NumberedList>({
  type: NUMBERED_LIST_NODE_TYPE,
  renderer: (editor) => NumberedListRender,
  childPlugin: ListItemList,
  shortcut: '1.',
  defineElement: () => ({
    id: generateId(),
    type: 'numbered-list',
    children: [ListItemList.getPlugin.defineElement()],
    nodeType: 'block',
    data: { depth: 1, skipDrag: true, skipSettings: true },
  }),
  createElement: (editor) => {
    const listItem: ListChildItemElement = ListItemList.getPlugin.defineElement();

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

    const numberedList: NumberedList = NumberedList.getPlugin.defineElement();

    Transforms.wrapNodes(editor, numberedList, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `${text}\n`,
    },
    html: {
      serialize: (node, children) => {
        const paddingLeft = node.data?.depth ? node.data.depth * 15 : 15;
        return `<ol style="padding-left: ${paddingLeft}px;">${children}</ol>`;
      },
      deserialize: {
        nodeName: 'OL',
      },
    },
  },
});

export { NumberedList };

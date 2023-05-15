import {
  createYooptaPlugin,
  generateId,
  getElementClassname,
  RenderYooptaElementProps,
  YooptaPlugin,
} from '@yoopta/editor';
import { Editor, Element, Node, Transforms } from 'slate';
import type { BulletedList, ListChildItemElement, ListOptions } from '../types';
import { ListItemList } from './ListItem';
import s from './BulletedList.module.scss';

const BulletedListRender = ({
  attributes,
  children,
  element,
  HTMLAttributes,
}: RenderYooptaElementProps<BulletedList>) => {
  return (
    <ul
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<BulletedList>({ element, HTMLAttributes, className: s.list })}
      {...attributes}
    >
      {children}
    </ul>
  );
};

const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

const BulletedList = createYooptaPlugin<ListOptions, BulletedList>({
  type: BULLETED_LIST_NODE_TYPE,
  renderer: (editor) => BulletedListRender,
  // [TODO] - fix for nested items
  shortcut: '-',
  childPlugin: ListItemList,
  defineElement: () => ({
    id: generateId(),
    type: 'bulleted-list',
    children: [ListItemList.getPlugin.defineElement()],
    nodeType: 'block',
    data: { depth: 1, skipDrag: true, skipSettings: true },
  }),
  // extendEditor(editor) {
  //   const { normalizeNode } = editor;

  //   editor.normalizeNode = (entry) => {
  //     const [node] = entry;

  //     if (Element.isElement(node) && node.type === BULLETED_LIST_NODE_TYPE) {
  //       // console.log('Node.child(node, 0)', Node.child(node, 0));
  //       // if (Node.child(node, 0)?.text.length === 0) {
  //       //   Transforms.removeNodes(editor, {
  //       //     at: entry[1],
  //       //     match: (n) => Element.isElement(n) && n.type === BULLETED_LIST_NODE_TYPE,
  //       //   });
  //       // }
  //     }

  //     normalizeNode(entry);
  //   };

  //   return editor;
  // },
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

    const bulletedList: BulletedList = BulletedList.getPlugin.defineElement();
    Transforms.wrapNodes(editor, bulletedList, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `- ${text}`,
    },
    html: {
      serialize: (node, children) => {
        const paddingLeft = node.data?.depth ? node.data.depth * 15 : 15;
        return `<ul style="padding-left: ${paddingLeft}px;">${children}</ul>`;
      },
      deserialize: {
        nodeName: 'UL',
      },
    },
  },
  options: {
    searchString: 'bullet list',
    displayLabel: 'BulletedList',
  },
});

export { BulletedList };

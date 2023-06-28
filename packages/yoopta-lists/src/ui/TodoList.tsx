import { createYooptaPlugin, generateId, getElementClassname, RenderYooptaElementProps } from '@yoopta/editor';
import { Editor, Element, Node, Transforms } from 'slate';
import { ListOptions, TodoListElement, TodoListChildItemElement } from '../types';
import s from './TodoList.module.scss';
import { TodoListItem } from './TodoListItem';

const TodoListRender = ({ attributes, element, children, HTMLAttributes }: RenderYooptaElementProps<TodoList>) => {
  return (
    <div
      draggable={false}
      {...HTMLAttributes}
      {...attributes}
      className={getElementClassname<TodoListElement>({ element, HTMLAttributes, className: s.todoList })}
    >
      {children}
    </div>
  );
};

const TODO_LIST_NODE_TYPE = 'todo-list';

const TodoList = createYooptaPlugin<ListOptions, TodoListElement>({
  type: TODO_LIST_NODE_TYPE,
  renderer: (editor) => TodoListRender,
  childPlugin: TodoListItem,
  shortcut: '[]',
  defineElement: () => ({
    id: generateId(),
    type: 'todo-list',
    children: [TodoListItem.getPlugin.defineElement()],
    nodeType: 'block',
    data: { depth: 1, skipDrag: true, skipSettings: true },
  }),
  // extendEditor(editor) {
  //   const { normalizeNode } = editor;

  //   // editor.normalizeNode = (entry) => {
  //   //   const [node, path] = entry;

  //   //   if (Element.isElement(node) && node.type === TODO_LIST_NODE_TYPE) {
  //   //     if (node.children.length === 1 && !Element.isElement(node.children[0])) {
  //   //       Transforms.removeNodes(editor, {
  //   //         at: entry[1],
  //   //         match: (n) => Element.isElement(n) && n.type === TODO_LIST_NODE_TYPE,
  //   //       });
  //   //     }
  //   //   }

  //   //   normalizeNode(entry);
  //   // };

  //   return editor;
  // },
  createElement: (editor, elementData) => {
    const todoListItemElement: TodoListChildItemElement = TodoListItem.getPlugin.defineElement();

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type !== 'list-item' &&
        n.type !== 'todo-list-item' &&
        n.data?.depth >= 1,
      split: true,
    });

    Transforms.setNodes(editor, todoListItemElement, {
      at: editor.selection?.anchor,
    });

    const todoList: TodoListElement = { ...TodoList.getPlugin.defineElement(), ...elementData };

    Transforms.wrapNodes(editor, todoList, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, children) => `${children}`,
    },
    html: {
      serialize: (node, children) => {
        const paddingLeft = node.data?.depth ? node.data.depth * 15 : 15;
        return `<div style="padding-left: ${paddingLeft}px;">${children}</div>`;
      },
    },
  },
  options: { searchString: 'todo check list', displayLabel: 'TodoList' },
});

export { TodoList };

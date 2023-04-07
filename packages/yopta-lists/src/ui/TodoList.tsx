import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import { ListOptions, TodoList, TodoListChildItemElement } from '../types';
import s from './TodoList.module.scss';
import { TodoListItem } from './TodoListItem';

const TodoListRender = ({ attributes, children }: RenderElementProps<TodoList>) => {
  return (
    <div draggable={false} {...attributes} className={s.todoList}>
      {children}
    </div>
  );
};

const TODO_LIST_NODE_TYPE = 'todo-list';

const TodoList = createYoptaPlugin<ListOptions, TodoList>({
  type: TODO_LIST_NODE_TYPE,
  renderer: (editor) => TodoListRender,
  childPlugin: TodoListItem,
  getElement: () => ({
    id: generateId(),
    type: 'todo-list',
    children: [TodoListItem.getPlugin.getElement()],
    nodeType: 'block',
    data: { depth: 1 },
  }),
  createElement: (editor, type, data = {}) => {
    const todoListItemElement: TodoListChildItemElement = TodoListItem.getPlugin.getElement();

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

    const todoList: TodoList = TodoList.getPlugin.getElement();

    Transforms.wrapNodes(editor, todoList, {
      at: editor.selection?.anchor,
    });
  },
});

export { TodoList };

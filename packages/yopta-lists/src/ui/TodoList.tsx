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
  createNode: (editor, type, data = {}) => {
    const todoListItemElement: TodoListChildItemElement = {
      id: generateId(),
      type: 'todo-list-item',
      children: [{ text: '' }],
      options: { checked: false },
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

    Transforms.setNodes(editor, todoListItemElement, {
      at: editor.selection?.anchor,
    });

    const todoList: TodoList = {
      id: generateId(),
      type: 'todo-list',
      children: [todoListItemElement],
      options: { depth: 1 },
    };

    Transforms.wrapNodes(editor, todoList, {
      at: editor.selection?.anchor,
    });
  },
});

export { TodoList };

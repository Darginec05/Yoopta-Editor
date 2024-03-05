import { YooptaPlugin } from '@yoopta/editor';
import { TodoListItemRender } from '../elements/TodoListItem';
import { TodoListRender } from '../elements/TodoList';
import { TodoListElement, TodoListItemElement, TodoListPluginKeys } from '../types';

const TodoList = new YooptaPlugin<TodoListPluginKeys, TodoListElement | TodoListItemElement>({
  type: 'TodoListPlugin',
  elements: {
    'todo-list': {
      render: TodoListRender,
      asRoot: true,
      children: ['todo-list-item'],
    },
    'todo-list-item': {
      render: TodoListItemRender,
      props: {
        checked: false,
      },
    },
  },
  options: {
    displayLabel: 'Todo List',
    shortcuts: ['[]'],
  },
});

export { TodoList };

import { createYooptaPlugin } from '@yoopta/editor';
import { TodoListItemRender } from '../components/TodoListItem';
import { TodoListRender } from '../components/TodoList';

const TodoList = createYooptaPlugin({
  type: 'TodoListPlugin',
  elements: {
    'todo-list': {
      render: TodoListRender,
      asRoot: true,
      children: ['todo-list-item'],
    },
    'todo-list-item': {
      render: TodoListItemRender,
    },
  },
  options: {
    displayLabel: 'Todo List',
    shortcuts: ['<'],
  },
});

export { TodoList };

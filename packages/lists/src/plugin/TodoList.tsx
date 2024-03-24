import { YooptaPlugin } from '@yoopta/editor';
import { TodoListRender } from '../elements/TodoList';
import { onKeyDown } from '../events/onKeyDown';
import { TodoListElementProps, TodoListPluginKeys } from '../types';

const TodoList = new YooptaPlugin<TodoListPluginKeys, TodoListElementProps>({
  type: 'TodoList',
  elements: {
    'todo-list': {
      render: TodoListRender,
      props: {
        checked: false,
      },
    },
  },
  options: {
    display: {
      title: 'Todo List',
      description: 'Track tasks',
    },
    shortcuts: ['[]'],
  },
  events: {
    onKeyDown,
  },
  // parsers: {
  //   html: {
  //     deserialize: {
  //       nodeNames: ['UL', 'LI'],
  //     },
  //   },
  // },
});

export { TodoList };

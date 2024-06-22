import { buildBlockData, generateId, YooptaBlockData, YooptaPlugin } from '@yoopta/editor';
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
  parsers: {
    html: {
      deserialize: {
        // add ignore or continue statement
        // nodeNames: ['OL', 'UL'],
        nodeNames: [],
        parse(el) {
          if (el.nodeName === 'OL' || el.nodeName === 'UL') {
            const listItems = el.querySelectorAll('li');

            const todoListBlocks: YooptaBlockData[] = Array.from(listItems)
              .filter((listItem) => {
                const textContent = listItem.textContent || '';
                const isTodoListItem = /\[\s*\S?\s*\]/.test(textContent);

                return isTodoListItem;
              })
              .map((listItem) => {
                const textContent = listItem.textContent || '';
                const checked = /\[\s*x\s*\]/i.test(textContent);
                const clearedContent = textContent.replace(/\[\s*\S?\s*\]/, '').trim();

                return buildBlockData({
                  id: generateId(),
                  type: 'TodoList',
                  value: [
                    {
                      id: generateId(),
                      type: 'todo-list',
                      children: [{ text: clearedContent }],
                      props: { nodeType: 'block', checked: checked },
                    },
                  ],
                  meta: { order: 0, depth: 0 },
                });
              });

            if (todoListBlocks.length > 1) return todoListBlocks;
          }
        },
      },
      serialize: (element, text) => {
        return `<ul><li>[${element.props.checked ? 'x' : ' '}] ${text}</li></ul>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `- ${element.props.checked ? '[x]' : '[ ]'} ${text}`;
      },
    },
  },
});

export { TodoList };

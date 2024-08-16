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
        nodeNames: ['OL', 'UL'],
        // nodeNames: [],
        parse(el) {
          if (el.nodeName === 'OL' || el.nodeName === 'UL') {
            const listItems = el.querySelectorAll('li');

            const align = (el.getAttribute('data-meta-align') || 'left') as YooptaBlockData['meta']['align'];
            const depth = parseInt(el.getAttribute('data-meta-depth') || '0', 10);

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
                  meta: { order: 0, depth, align },
                });
              });

            if (todoListBlocks.length > 0) return todoListBlocks;
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<ul data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}"><li>[${
          element.props.checked ? 'x' : ' '
        }] ${text}</li></ul>`;
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

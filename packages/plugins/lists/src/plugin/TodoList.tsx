import {
  buildBlockData,
  deserializeTextNodes,
  generateId,
  serializeTextNodes,
  serializeTextNodesIntoMarkdown,
  YooptaBlockData,
  YooptaPlugin,
} from '@yoopta/editor';
import { TodoListCommands } from '../commands';
import { TodoListRender } from '../elements/TodoList';
import { onKeyDown } from '../events/onKeyDown';
import { ListElementMap } from '../types';

const TodoList = new YooptaPlugin<Pick<ListElementMap, 'todo-list'>>({
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
  commands: TodoListCommands,
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['OL', 'UL'],
        parse(el, editor) {
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

                return buildBlockData({
                  id: generateId(),
                  type: 'TodoList',
                  value: [
                    {
                      id: generateId(),
                      type: 'todo-list',
                      children: deserializeTextNodes(editor, listItem.childNodes),
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

        return `<ul data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${
          depth * 20
        }px; text-align: ${align}"><li>[${element.props.checked ? 'x' : ' '}] ${serializeTextNodes(
          element.children,
        )}</li></ul>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `- ${element.props.checked ? '[x]' : '[ ]'} ${serializeTextNodesIntoMarkdown(element.children)}`;
      },
    },
    email: {
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `
          <table style="width:100%;">
           <tbody style="width:100%;">
              <tr>
                <td>
                  <ul data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${
          depth * 20
        }px; text-align: ${align}; font-size: 16px;
    line-height: 28px;
    padding-bottom: 2px;
    padding-left: 1rem;
    padding-top: 2px;
    margin: 0;
    "><li>[${element.props.checked ? 'x' : ' '}] ${serializeTextNodes(element.children)}</li></ul>
                </td>
              </tr>
            </tbody>
          </table>
        `;
      },
    },
  },
});

export { TodoList };

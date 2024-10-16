import {
  buildBlockData,
  deserializeTextNodes,
  generateId,
  serializeTextNodes,
  serializeTextNodesIntoMarkdown,
  YooptaBlockData,
  YooptaPlugin,
} from '@yoopta/editor';
import { BulletedListCommands } from '../commands';
import { BulletedListRender } from '../elements/BulletedList';
import { onKeyDown } from '../events/onKeyDown';
import { ListElementMap } from '../types';

const BulletedList = new YooptaPlugin<Pick<ListElementMap, 'bulleted-list'>>({
  type: 'BulletedList',
  elements: {
    'bulleted-list': {
      render: BulletedListRender,
    },
  },
  options: {
    display: {
      title: 'Bulleted List',
      description: 'Create bullet list',
    },
    shortcuts: ['-'],
  },
  events: {
    onKeyDown,
  },
  commands: BulletedListCommands,
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['UL'],
        parse(el, editor) {
          if (el.nodeName === 'UL') {
            const listItems = el.querySelectorAll('li');

            const align = (el.getAttribute('data-meta-align') || 'left') as YooptaBlockData['meta']['align'];
            const depth = parseInt(el.getAttribute('data-meta-depth') || '0', 10);

            const bulletListBlocks: YooptaBlockData[] = Array.from(listItems)
              .filter((listItem) => {
                const textContent = listItem.textContent || '';
                const isTodoListItem = /\[\s*\S?\s*\]/.test(textContent);

                return !isTodoListItem;
              })
              .map((listItem) => {
                return buildBlockData({
                  id: generateId(),
                  type: 'BulletedList',
                  value: [
                    {
                      id: generateId(),
                      type: 'bulleted-list',
                      children: deserializeTextNodes(editor, listItem.childNodes),
                      props: { nodeType: 'block' },
                    },
                  ],
                  meta: { order: 0, depth: depth, align },
                });
              });

            if (bulletListBlocks.length > 0) return bulletListBlocks;
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<ul data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}"><li>${serializeTextNodes(
          element.children,
        )}</li></ul>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `- ${serializeTextNodesIntoMarkdown(element.children)}`;
      },
    },
    email: {
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `
          <table>
            <tbody>
              <tr>
                <td>
                  <ul data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}"><li>${serializeTextNodes(
          element.children,
        )}</li></ul>
                </td>
              </tr>
            </tbody>
          </table>
        `;
      },
    },
  },
});

export { BulletedList };

import {
  buildBlockData,
  deserializeListNodes,
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
            const align = (el.getAttribute('data-meta-align') || 'left') as YooptaBlockData['meta']['align'];
            const depth = parseInt(el.getAttribute('data-meta-depth') || '0', 10);

            const deserializedList = deserializeListNodes(editor, el);

            return [buildBlockData({
              id: generateId(),
              type: 'BulletedList',
              value: deserializedList,
              meta: { order: 0, depth: depth, align },
            })]
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
  },
});

export { BulletedList };

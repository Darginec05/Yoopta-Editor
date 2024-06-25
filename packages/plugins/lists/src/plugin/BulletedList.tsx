import { buildBlockData, generateId, YooptaBlockData, YooptaPlugin } from '@yoopta/editor';
import { BulletedListRender } from '../elements/BulletedList';
import { onKeyDown } from '../events/onKeyDown';
import { BulletedListElement, BulletedListPluginKeys } from '../types';

const BulletedList = new YooptaPlugin<BulletedListPluginKeys, BulletedListElement>({
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
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['UL'],
        parse(el) {
          if (el.nodeName === 'UL') {
            const listItems = el.querySelectorAll('li');

            const bulletListBlocks: YooptaBlockData[] = Array.from(listItems)
              .filter((listItem) => {
                const textContent = listItem.textContent || '';
                const isTodoListItem = /\[\s*\S?\s*\]/.test(textContent);

                return !isTodoListItem;
              })
              .map((listItem) => {
                const textContent = listItem.textContent || '';

                return buildBlockData({
                  id: generateId(),
                  type: 'BulletedList',
                  value: [
                    {
                      id: generateId(),
                      type: 'bulleted-list',
                      children: [{ text: textContent }],
                      props: { nodeType: 'block' },
                    },
                  ],
                  meta: { order: 0, depth: 0 },
                });
              });

            if (bulletListBlocks.length > 1) return bulletListBlocks;
          }
        },
      },
      serialize: (element, text) => {
        return `<ul><li>${text}</li></ul>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `- ${text}`;
      },
    },
  },
});

export { BulletedList };

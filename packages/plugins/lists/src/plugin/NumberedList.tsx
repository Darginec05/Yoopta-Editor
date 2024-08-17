import { YooptaPlugin, buildBlockData, YooptaBlockData, generateId } from '@yoopta/editor';
import { NumberedListRender } from '../elements/NumberedList';
import { onKeyDown } from '../events/onKeyDown';
import { ListElementProps } from '../types';

const NumberedList = new YooptaPlugin<'numbered-list', ListElementProps>({
  type: 'NumberedList',
  elements: {
    'numbered-list': {
      render: NumberedListRender,
      props: {
        nodeType: 'block',
      },
    },
  },
  options: {
    display: {
      title: 'Numbered List',
      description: 'Create list with numbering',
    },
    shortcuts: ['1.'],
  },
  events: {
    onKeyDown,
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['OL'],
        parse(el) {
          if (el.nodeName === 'OL') {
            const listItems = el.querySelectorAll('li');

            const align = (el.getAttribute('data-meta-align') || 'left') as YooptaBlockData['meta']['align'];
            const depth = parseInt(el.getAttribute('data-meta-depth') || '0', 10);

            const numberedListBlocks: YooptaBlockData[] = Array.from(listItems)
              .filter((listItem) => {
                const textContent = listItem.textContent || '';
                const isTodoListItem = /\[\s*\S?\s*\]/.test(textContent);

                return !isTodoListItem;
              })
              .map((listItem, i) => {
                const textContent = listItem.textContent || '';

                return buildBlockData({
                  id: generateId(),
                  type: 'NumberedList',
                  value: [
                    {
                      id: generateId(),
                      type: 'numbered-list',
                      children: [{ text: textContent }],
                      props: { nodeType: 'block' },
                    },
                  ],
                  meta: { order: 0, depth, align },
                });
              });
            if (numberedListBlocks.length > 0) return numberedListBlocks;
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<ol data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}"><li>${text}</li></ol>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `- ${text}`;
      },
    },
  },
});

export { NumberedList };

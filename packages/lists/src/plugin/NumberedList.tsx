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
        count: 0,
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
                      props: { nodeType: 'block', count: i },
                    },
                  ],
                  meta: { order: 0, depth: 0 },
                });
              });
            if (numberedListBlocks.length > 1) return numberedListBlocks;
          }
        },
      },
    },
  },
});

export { NumberedList };

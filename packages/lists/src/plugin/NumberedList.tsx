import { YooptaPlugin } from '@yoopta/editor';
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
        position: 0,
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
      },
    },
  },
});

export { NumberedList };

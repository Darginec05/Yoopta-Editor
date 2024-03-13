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
    displayLabel: 'Numbered List',
    shortcuts: ['1.'],
  },
  events: {
    onKeyDown,
  },
});

export { NumberedList };

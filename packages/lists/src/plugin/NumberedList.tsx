import { createYooptaPlugin } from '@yoopta/editor';
import { ListItemRender } from '../elements/ListItem';
import { NumberedListRender } from '../elements/NumberedList';
import { onKeyDown } from '../events/onKeyDown';

const NumberedList = createYooptaPlugin({
  type: 'NumberedList',
  elements: {
    'numbered-list': {
      render: NumberedListRender,
      asRoot: true,
      children: ['list-item'],
    },
    'list-item': {
      render: ListItemRender,
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

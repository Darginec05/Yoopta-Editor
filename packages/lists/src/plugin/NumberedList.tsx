import { createYooptaPlugin } from '@yoopta/editor';
import { ListItemRender } from '../components/ListItem';
import { NumberedListRender } from '../components/NumberedList';

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
    shortcuts: ['<'],
  },
});

export { NumberedList };

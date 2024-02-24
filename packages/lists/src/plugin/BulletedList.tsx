import { createYooptaPlugin } from '@yoopta/editor';
import { ListItemRender } from '../elements/ListItem';
import { BulletedListRender } from '../elements/BulletedList';
import { onKeyDown } from '../events/onKeyDown';

const BulletedList = createYooptaPlugin({
  type: 'BulletedList',
  elements: {
    'bulleted-list': {
      render: BulletedListRender,
      asRoot: true,
      children: ['list-item'],
    },
    'list-item': {
      render: ListItemRender,
    },
  },
  options: {
    displayLabel: 'BulletedList',
    shortcuts: ['-'],
  },
  events: {
    onKeyDown,
  },
});

export { BulletedList };

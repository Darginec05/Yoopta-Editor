import { createYooptaPlugin } from '@yoopta/editor';
import { ListItemRender } from '../components/ListItem';
import { BulletedListRender } from '../components/BulletedList';

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
});

export { BulletedList };

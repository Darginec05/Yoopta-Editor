import { YooptaPlugin } from '@yoopta/editor';
import { ListItemRender } from '../elements/ListItem';
import { BulletedListRender } from '../elements/BulletedList';
import { onKeyDown } from '../events/onKeyDown';
import { BulletedListElement, BulletedListPluginKeys, ListItemElement } from '../types';

const BulletedList = new YooptaPlugin<BulletedListPluginKeys, BulletedListElement | ListItemElement>({
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

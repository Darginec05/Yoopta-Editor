import { memo } from 'react';
import s from './ListItem.module.scss';

const ListItem = memo<ElementProps>(({ attributes, children }) => {
  return (
    <li className={s.listItem} draggable={false} {...attributes}>
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';

export { ListItem };

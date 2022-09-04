import { memo } from 'react';
import { ElementProps } from '../../Editor/types';

const BulletedList = memo<ElementProps>(({ attributes, children }) => {
  return (
    <ul draggable={false} {...attributes}>
      {children}
    </ul>
  );
});

BulletedList.displayName = 'BulletedList';

export { BulletedList };

import { memo } from 'react';

const BulletedList = memo<ElementProps>(({ attributes, children }) => {
  return (
    <ul draggable={false} {...attributes}>
      {children}
    </ul>
  );
});

BulletedList.displayName = 'BulletedList';

export { BulletedList };

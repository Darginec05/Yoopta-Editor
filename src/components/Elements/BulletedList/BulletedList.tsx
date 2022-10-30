import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';

const BulletedList = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <ul draggable={false} {...attributes} className={getElementClassname(element)}>
      {children}
    </ul>
  );
});

BulletedList.displayName = 'BulletedList';

export { BulletedList };

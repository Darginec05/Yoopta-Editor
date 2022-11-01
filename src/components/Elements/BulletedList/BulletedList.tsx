import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';

const BulletedList = memo<ElementProps>(({ attributes, children, element, dataNodeId }) => {
  return (
    <ul draggable={false} {...attributes} className={getElementClassname(element)} data-node-id={dataNodeId}>
      {children}
    </ul>
  );
});

BulletedList.displayName = 'BulletedList';

export { BulletedList };

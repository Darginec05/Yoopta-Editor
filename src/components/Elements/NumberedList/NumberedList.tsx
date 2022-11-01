import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';

const NumberedList = memo<ElementProps>(({ attributes, children, element, dataNodeId }) => {
  return (
    <ol draggable={false} {...attributes} className={getElementClassname(element)} data-node-id={dataNodeId}>
      {children}
    </ol>
  );
});

NumberedList.displayName = 'NumberedList';

export { NumberedList };

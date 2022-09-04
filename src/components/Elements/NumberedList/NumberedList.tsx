import { memo } from 'react';
import { ElementProps } from '../../Editor/types';

const NumberedList = memo<ElementProps>(({ attributes, children }) => {
  return (
    <ol draggable={false} {...attributes}>
      {children}
    </ol>
  );
});

NumberedList.displayName = 'NumberedList';

export { NumberedList };

import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';

const NumberedList = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <ol draggable={false} {...attributes} className={getElementClassname(element)}>
      {children}
    </ol>
  );
});

NumberedList.displayName = 'NumberedList';

export { NumberedList };

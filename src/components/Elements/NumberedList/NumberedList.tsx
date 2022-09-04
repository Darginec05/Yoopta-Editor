import { memo } from 'react';

const NumberedList = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ol draggable={false} {...attributes}>
      {children}
    </ol>
  );
});

NumberedList.displayName = 'NumberedList';

export { NumberedList };

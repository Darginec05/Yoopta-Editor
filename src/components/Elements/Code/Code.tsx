import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './Code.module.scss';

const Code = memo<ElementProps>(({ attributes, children }) => {
  return (
    <code className={s.code} {...attributes}>
      <pre>{children}</pre>
    </code>
  );
});

Code.displayName = 'Code';

export { Code };

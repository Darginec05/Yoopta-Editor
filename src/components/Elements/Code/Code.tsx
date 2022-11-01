import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Code.module.scss';

const Code = memo<ElementProps>(({ attributes, children, element, dataNodeId }) => {
  return (
    <code className={cx(s.code, getElementClassname(element))} data-node-id={dataNodeId} {...attributes}>
      <pre>{children}</pre>
    </code>
  );
});

Code.displayName = 'Code';

export { Code };

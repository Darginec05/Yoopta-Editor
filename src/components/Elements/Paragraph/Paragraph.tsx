import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Paragraph.module.scss';

const Paragraph = memo<ElementProps>(({ children, element, dataNodeId }) => {
  return (
    <p className={cx(s.paragraph, getElementClassname(element))} draggable={false} data-node-id={dataNodeId}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export { Paragraph };

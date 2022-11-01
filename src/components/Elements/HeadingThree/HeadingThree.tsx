import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './HeadingThree.module.scss';

const HeadingThree = memo<ElementProps>(({ attributes, children, element, dataNodeId }) => {
  return (
    <h3
      className={cx(s['heading-three'], getElementClassname(element))}
      draggable={false}
      data-node-id={dataNodeId}
      {...attributes}
    >
      {children}
    </h3>
  );
});

HeadingThree.displayName = 'HeadingThree';

export { HeadingThree };

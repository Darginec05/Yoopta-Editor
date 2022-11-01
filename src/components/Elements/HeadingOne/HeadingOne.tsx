import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './HeadingOne.module.scss';

const HeadingOne = memo<ElementProps>(({ attributes, children, element, dataNodeId }) => {
  return (
    <h1
      className={cx(s['heading-one'], getElementClassname(element))}
      draggable={false}
      data-node-id={dataNodeId}
      {...attributes}
    >
      {children}
    </h1>
  );
});

HeadingOne.displayName = 'HeadingOne';

export { HeadingOne };

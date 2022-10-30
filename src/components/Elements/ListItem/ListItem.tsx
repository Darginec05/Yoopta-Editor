import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './ListItem.module.scss';

const ListItem = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <li className={cx(s.listItem, getElementClassname(element))} draggable={false} {...attributes}>
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';

export { ListItem };

import { memo } from 'react';
import cx from 'classnames';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Blockquote.module.scss';

const Blockquote = memo<ElementProps>(({ attributes, children, element }) => {
  return (
    <blockquote draggable={false} className={cx(s.blockquote, getElementClassname(element))} {...attributes}>
      {children}
    </blockquote>
  );
});

Blockquote.displayName = 'Blockquote';

export { Blockquote };

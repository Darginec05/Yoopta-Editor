import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import s from './Paragraph.module.scss';

const Paragraph = memo<ElementProps>(({ children, element }) => {
  return (
    <p className={cx(s.paragraph, getElementClassname(element))} draggable={false}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export { Paragraph };

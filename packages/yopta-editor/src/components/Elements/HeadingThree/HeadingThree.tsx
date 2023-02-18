import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname, getHeadingAnchorFromSlateNode } from '../../Editor/utils';
import s from './HeadingThree.module.scss';
import { HashLink } from '../../HashLink/HashLink';

const HeadingThree = memo<ElementProps>(({ attributes, children, element, isEdit }) => {
  const text = getHeadingAnchorFromSlateNode(element, isEdit);

  return (
    <h3 id={text} className={cx(s['heading-three'], getElementClassname(element))} draggable={false} {...attributes}>
      {children}
      {text && text.length > 0 && <HashLink text={text} />}
    </h3>
  );
});

HeadingThree.displayName = 'HeadingThree';

export { HeadingThree };

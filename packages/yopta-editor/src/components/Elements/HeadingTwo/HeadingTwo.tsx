import { memo } from 'react';
import cx from 'classnames';
import { ElementProps } from '../../Editor/types';
import s from './HeadingTwo.module.scss';
import { getElementClassname, getHeadingAnchorFromSlateNode } from '../../Editor/utils';
import { HashLink } from '../../HashLink/HashLink';

const HeadingTwo = memo<ElementProps>(({ attributes, children, element, isEdit }) => {
  const text = getHeadingAnchorFromSlateNode(element, isEdit);

  return (
    <h2 id={text} className={cx(s['heading-two'], getElementClassname(element))} draggable={false} {...attributes}>
      {children}
      {text && text.length > 0 && <HashLink text={text} />}
    </h2>
  );
});

HeadingTwo.displayName = 'HeadingTwo';

export { HeadingTwo };

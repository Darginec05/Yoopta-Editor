import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { HashLink } from '../../HashLink/HashLink';
import { getElementClassname, getHeadingAnchorFromSlateNode } from '../../Editor/utils';
import s from './HeadingOne.module.scss';

const HeadingOne = memo<ElementProps>(({ attributes, children, element, isEdit }) => {
  const text = getHeadingAnchorFromSlateNode(element, isEdit);

  return (
    <h1 id={text} className={cx(s['heading-one'], getElementClassname(element))} draggable={false} {...attributes}>
      {children}
      {text && text.length > 0 && <HashLink text={text} />}
    </h1>
  );
});

HeadingOne.displayName = 'HeadingOne';

export { HeadingOne };

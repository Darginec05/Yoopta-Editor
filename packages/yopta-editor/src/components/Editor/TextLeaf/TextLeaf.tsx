import { memo } from 'react';
import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';

type LeafProps = RenderLeafProps & { placeholder?: string; leaf: any };

const TextLeaf = memo(({ attributes, children, placeholder, leaf }: LeafProps) => {
  return (
    <span {...attributes} data-placeholder={placeholder} className={cx(s.leaf, { [s.placeholder]: leaf.placeholder })}>
      {children}
    </span>
  );
});

TextLeaf.displayName = 'TextLeaf';

export { TextLeaf };

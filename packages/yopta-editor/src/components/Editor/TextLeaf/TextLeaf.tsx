import { CSSProperties, memo } from 'react';
import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';

type LeafProps = RenderLeafProps & { placeholder?: string; leaf: any };

const leafStyle: CSSProperties = {
  margin: '1px 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  fontWeight: 'inherit',
};

const TextLeaf = memo(({ attributes, children, placeholder }: LeafProps) => {
  return (
    <span
      {...attributes}
      data-placeholder={placeholder}
      style={leafStyle}
      className={cx({ [s.placeholder]: placeholder })}
    >
      {children}
    </span>
  );
});

TextLeaf.displayName = 'TextLeaf';

export { TextLeaf };

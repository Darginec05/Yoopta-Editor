import { CSSProperties, memo } from 'react';
import { RenderLeafProps, useSelected } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';
import { YoptaPluginType } from '../../../utils/plugins';

type LeafProps = RenderLeafProps & { placeholder?: YoptaPluginType['placeholder']; leaf: any };

const leafStyle: CSSProperties = {
  margin: '1px 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  fontWeight: 'inherit',
};

const TextLeaf = memo(({ attributes, children, placeholder, leaf }: LeafProps) => {
  const selected = useSelected();

  return (
    <span
      {...attributes}
      data-placeholder={placeholder}
      style={leafStyle}
      className={cx({ [s.placeholder]: leaf.withPlaceholder && placeholder && selected })}
    >
      {children}
    </span>
  );
});

TextLeaf.displayName = 'TextLeaf';

export { TextLeaf };

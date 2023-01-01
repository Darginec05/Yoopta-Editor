import { memo } from 'react';
import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';

type LeafProps = RenderLeafProps & { placeholder?: string; leaf: any };

const TextLeaf = memo(({ attributes, children, placeholder, leaf }: LeafProps) => {
  return (
    <span
      {...attributes}
      data-placeholder={placeholder}
      className={cx(
        s.leaf,
        {
          [s.bold]: leaf.bold,
          [s.italic]: leaf.italic,
          [s.strike]: leaf.strike,
          [s.underline]: leaf.underline,
          [s.code]: leaf.code,
          [s.placeholder]: leaf.placeholder,
        },
        leaf.token ? `token ${leaf.token}` : '',
        leaf.bold ? 'leaf-bold' : '',
        leaf.italic ? 'leaf-italic' : '',
        leaf.strike ? 'leaf-strike' : '',
        leaf.underline ? 'leaf-underline' : '',
        leaf.code ? 'leaf-code' : '',
      )}
    >
      {children}
    </span>
  );
});

TextLeaf.displayName = 'TextLeaf';

export { TextLeaf };

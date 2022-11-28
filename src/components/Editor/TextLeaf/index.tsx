import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';

type LeafProps = RenderLeafProps & { placeholder?: string; leaf: any };

const TextLeaf = ({ attributes, children, placeholder, leaf }: LeafProps) => {
  return (
    <span
      {...attributes}
      data-placeholder={placeholder}
      className={cx(s.leaf, {
        [s.bold]: leaf.bold,
        [s.italic]: leaf.italic,
        [s.strike]: leaf.strike,
        [s.underline]: leaf.underline,
        [s.code]: leaf.code,
        [s.placeholder]: leaf.placeholder,
      })}
    >
      {children}
    </span>
  );
};

export { TextLeaf };

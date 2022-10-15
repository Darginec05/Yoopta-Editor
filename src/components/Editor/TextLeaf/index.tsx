import { FC } from 'react';
import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';

const TextLeaf: FC<RenderLeafProps> = ({ attributes, children, leaf}) => {
  // console.log(children);

  return (
    <span
      {...attributes}
      className={cx(s.leaf, {
        [s.bold]: leaf.bold,
        [s.italic]: leaf.italic,
        [s.strike]: leaf.strike,
        [s.underline]: leaf.underline,
        [s.code]: leaf.code,
        [`token ${leaf.token}`]: leaf.token,
      })}
    >
      {children}
    </span>
  );
};

export { TextLeaf };

import { FC } from 'react';
import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import s from './TextLeaf.module.scss';
import { ELEMENT_TYPES_MAP } from '../constants';
import { capitalizeFirstLetter } from '../utils';

const TextLeaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      data-placeholder={
        children.props.parent.type === ELEMENT_TYPES_MAP.paragraph
          ? ' Type / to open menu'
          : ` ${capitalizeFirstLetter(children.props.parent.type)}`
      }
      className={cx(s.leaf, {
        [s.bold]: leaf.bold,
        [s.italic]: leaf.italic,
        [s.strike]: leaf.strike,
        [s.underline]: leaf.underline,
        [s.code]: leaf.code,
        [s.placeholder]: leaf.placeholder,
        [`token ${leaf.token}`]: leaf.token,
      })}
    >
      {children}
    </span>
  );
};

export { TextLeaf };

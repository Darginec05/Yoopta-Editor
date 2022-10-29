import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';
import { ELEMENT_TYPES_MAP } from '../constants';
import { capitalizeFirstLetter } from '../utils';
import s from './TextLeaf.module.scss';

type LeafProps = RenderLeafProps & { isEdit?: boolean, leaf: any };

const TextLeaf = ({ attributes, children, leaf, isEdit }: LeafProps) => {
  const getPlaceholder = () => {
    if (!isEdit) return undefined;
    return children.props?.parent.type === ELEMENT_TYPES_MAP.paragraph
      ? ' Type / to open menu'
      : ` ${capitalizeFirstLetter(children.props?.parent.type)}`;
  };

  return (
    <span
      {...attributes}
      data-placeholder={getPlaceholder()}
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

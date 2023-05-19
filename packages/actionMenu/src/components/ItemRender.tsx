import { cx } from '@yoopta/editor';
import { ReactNode } from 'react';
import { ActionMenuRenderItem, ActionMenuRenderItemProps } from '../types';
import s from './ItemRender.module.scss';

type Props = Partial<ActionMenuRenderItem> &
  Partial<ActionMenuRenderItemProps> & {
    children?: ReactNode;
  };

const ItemRender = ({ children, type, onClick, options, ...rest }: Props) => {
  return (
    <li
      className={cx(s.elementListItem)}
      data-action-menu-item={rest['data-action-menu-item']}
      aria-selected={rest['aria-selected']}
      data-element-type={rest['data-element-type']}
      data-element-active={rest['data-element-active']}
    >
      <button type="button" tabIndex={0} onClick={onClick} className={s.button}>
        <span>{options?.displayLabel || type}</span>
        {children}
      </button>
    </li>
  );
};

export { ItemRender };

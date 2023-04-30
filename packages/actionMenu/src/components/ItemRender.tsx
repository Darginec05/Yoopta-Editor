import { cx } from '@yopta/editor';
import { ReactNode } from 'react';
import { ActionMenuRenderItem, ActionMenuRenderItemProps } from '../types';
import s from './ItemRender.module.scss';

type Props = Partial<ActionMenuRenderItem> &
  Partial<ActionMenuRenderItemProps> & {
    children?: ReactNode;
  };

const ItemRender = ({ children, type, onClick, ...rest }: Props) => {
  return (
    <li
      className={cx(s.elementListItem)}
      data-action-menu-item={rest['data-action-menu-item']}
      aria-selected={rest['aria-selected']}
      data-element-type={rest['data-element-type']}
    >
      <button type="button" tabIndex={0} onClick={onClick} className={s.button}>
        <span>{type}</span>
        {children}
      </button>
    </li>
  );
};

export { ItemRender };

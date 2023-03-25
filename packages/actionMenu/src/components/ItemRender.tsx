import { cx } from '@yopta/editor';
import { MouseEvent, ReactNode } from 'react';
import { ActionMenuRenderItem } from '../types';
import s from './ItemRender.module.scss';

type Props = {
  menuItem?: ActionMenuRenderItem;
  focusableElement?: number;
  onMouseDown?: (e: MouseEvent) => void;
  index: number;
  children?: ReactNode;
};

const ItemRender = ({ menuItem, focusableElement, onMouseDown, index, children }: Props) => {
  const isBlockActive = (type) => {
    return false;
  };

  return (
    <li
      className={cx(s.elementListItem, {
        [s.__active]: isBlockActive(menuItem?.type),
        [s.hovered]: index === focusableElement,
      })}
      // aria-selected={isBlockActive(menuItem)}
      data-type={menuItem?.type}
    >
      <button type="button" tabIndex={0} onMouseDown={onMouseDown} className={s.button}>
        {menuItem?.icon} <span>{menuItem?.label || menuItem?.type}</span>
        {children}
      </button>
    </li>
  );
};

export { ItemRender };

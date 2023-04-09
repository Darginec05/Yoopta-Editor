import { cx } from '@yopta/editor';
import { ReactNode } from 'react';
import { ActionMenuRenderItem, ActionMenuRenderItemProps } from '../types';
import s from './ItemRender.module.scss';

type Props = ActionMenuRenderItem &
  ActionMenuRenderItemProps & {
    children?: ReactNode;
  };

const ItemRender = ({ children, type, onClick, ...rest }: Props) => {
  return (
    <li className={cx(s.elementListItem)} {...rest}>
      <button type="button" tabIndex={0} onClick={onClick} className={s.button}>
        <span>{type}</span>
        {children}
      </button>
    </li>
  );
};

export { ItemRender };

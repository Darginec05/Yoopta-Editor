import { ActionMenuRenderProps } from '../types';
import { ItemRender } from './ItemRender';
import s from './DefaultMenuRender.module.scss';
import { cx } from '@yoopta/editor';

const DefaultMenuRender = ({ isNotFound, getItemProps, getRootProps, items, groups }: ActionMenuRenderProps) => {
  return (
    <div className={cx(s.dropdown, 'yoopta-action-menu-list-inner')} {...getRootProps()}>
      <ul className={s.elementList}>
        {items?.map((menuItem) => {
          return <ItemRender key={menuItem.type} {...getItemProps(menuItem.type)} {...menuItem} />;
        })}
        {isNotFound && <ItemRender key="noResults">No results</ItemRender>}
      </ul>
    </div>
  );
};

export { DefaultMenuRender };

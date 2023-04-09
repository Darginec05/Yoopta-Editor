import { ActionRenderItemProps } from '../types';
import { ItemRender } from './ItemRender';
import s from './DefaultMenuRender.module.scss';

const DefaultMenuRender = ({ items, isNotFound, getItemProps, getRootProps }: ActionRenderItemProps) => {
  return (
    <div className={s.dropdown} {...getRootProps()}>
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

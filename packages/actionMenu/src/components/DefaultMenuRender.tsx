import { ActionRenderItemProps } from '../types';
import { ItemRender } from './ItemRender';
import s from './DefaultMenuRender.module.scss';

const DefaultMenuRender = ({ items, getListProps, getItemsProps, getRootProps }: ActionRenderItemProps) => {
  const isNotFound = items.length === 0;

  return (
    <div className={s.dropdown} {...getRootProps()}>
      <ul className={s.elementList} {...getListProps()}>
        {items?.map((menuItem, i) => {
          return <ItemRender key={menuItem.type} {...getItemsProps(menuItem, i)} />;
        })}
        {isNotFound && (
          <ItemRender key="noResults" focusableElement={0} index={0}>
            No results
          </ItemRender>
        )}
      </ul>
    </div>
  );
};

export { DefaultMenuRender };

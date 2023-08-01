import { ActionMenuRenderProps } from '@yoopta/action-menu-list';
import { cx } from '@yoopta/editor';
import s from './SuggestionList.module.scss';

const CustomSuggestionList = (props: ActionMenuRenderProps) => {
  return (
    <div className={s.dropdown} {...props.getRootProps()}>
      <div className={s.elementList}>
        {props.items.map((item) => {
          return (
            <div key={item.type} {...props.getItemProps(item.type)} className={cx(s.elementListItem)}>
              <button type="button" className={s.button}>
                {item.icon} <span>{item.label || item.type}</span>
              </button>
            </div>
          );
        })}
        {props.items.length === 0 && <div className={s.button}>Not found</div>}
      </div>
    </div>
  );
};

export { CustomSuggestionList };

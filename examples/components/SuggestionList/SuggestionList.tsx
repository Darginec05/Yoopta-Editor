import { ActionRenderItemProps } from '@yopta/action-menu-list';
import { cx } from '@yopta/editor';
import s from './SuggestionList.module.scss';
import EmbedIcon from './icons/embed.svg';
import ImageIcon from './icons/image.svg';
import VideoIcon from './icons/video.svg';

const CustomSuggestionList = (props: ActionRenderItemProps) => {
  return (
    <div className={s.dropdown} {...props.getRootProps()}>
      <div {...props.getListProps()} className={s.elementList}>
        {props.items.map((item, i) => {
          const { focusableElement, menuItem, ...itemProps } = props.getItemsProps(item, i);
          const isFocusable = i === focusableElement;

          return (
            <div
              key={item.type}
              {...itemProps}
              className={cx(s.elementListItem, {
                [s.hovered]: i === focusableElement,
              })}
            >
              <button className={s.button}>
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

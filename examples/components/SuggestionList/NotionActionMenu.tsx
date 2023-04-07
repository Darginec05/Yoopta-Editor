import { ActionRenderItemProps } from '@yopta/action-menu-list';
import s from './NotionActionMenu.module.scss';

const NotionActionMenu = (props: ActionRenderItemProps) => {
  return (
    <div {...props.getRootProps()} className={s.dropdown}>
      <div {...props.getListProps()} className={s.elementList}>
        <div className={s.group}>
          <div className={s.groupTitle}>Text nodes</div>
          <div className={s.item}>
            <div className={s.itemLeft}>
              <img src="/header.png" className={s.leftImage} />
            </div>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>rightTitle</div>
              <div className={s.rightDesc}>rightDesc</div>
            </div>
          </div>
          <div className={s.item}>
            <div className={s.itemLeft}>
              <img src="/header.png" className={s.leftImage} />
            </div>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>rightTitle</div>
              <div className={s.rightDesc}>rightDesc</div>
            </div>
          </div>
          <div className={s.item}>
            <div className={s.itemLeft}>
              <img src="/header.png" className={s.leftImage} />
            </div>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>rightTitle</div>
              <div className={s.rightDesc}>rightDesc</div>
            </div>
          </div>
        </div>
        <div className={s.group}>
          <div className={s.groupTitle}>Text nodes</div>
          <div className={s.item}>
            <div className={s.itemLeft}>
              <img src="/header.png" className={s.leftImage} />
            </div>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>rightTitle</div>
              <div className={s.rightDesc}>rightDesc</div>
            </div>
          </div>
          <div className={s.item}>
            <div className={s.itemLeft}>
              <img src="/header.png" className={s.leftImage} />
            </div>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>rightTitle</div>
              <div className={s.rightDesc}>rightDesc</div>
            </div>
          </div>
          <div className={s.item}>
            <div className={s.itemLeft}>
              <img src="/header.png" className={s.leftImage} />
            </div>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>rightTitle</div>
              <div className={s.rightDesc}>rightDesc</div>
            </div>
          </div>
        </div>
        {/* const { focusableElement, menuItem, ...itemProps } = props.getItemsProps(item, i); */}
      </div>
    </div>
  );
};

export { NotionActionMenu };

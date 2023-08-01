import { ActionMenuRenderProps } from '@yoopta/action-menu-list';
import s from './NotionActionMenu.module.scss';

const NotionActionMenu = (props: ActionMenuRenderProps) => {
  const { groups, isNotFound, getItemProps, getRootProps } = props;

  return (
    <div {...getRootProps()} className={s.dropdown}>
      <div className={s.elementList}>
        {groups.texts.length > 0 && (
          <div className={s.group}>
            <div className={s.groupTitle}>Text nodes</div>
            {groups.texts.map((item) => (
              <button key={item.type} type="button" className={s.item} {...getItemProps(item.type)}>
                <div className={s.itemLeft}>
                  {typeof item.icon === 'string' && <img src={item.icon} className={s.leftImage} />}
                </div>
                <div className={s.itemRight}>
                  <div className={s.rightTitle}>{item.displayLabel}</div>
                  <div className={s.rightDesc}>{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        {groups.voids.length > 0 && (
          <div className={s.group}>
            <div className={s.groupTitle}>Void nodes</div>

            {groups.voids.map((item) => (
              <button key={item.type} type="button" className={s.item} {...getItemProps(item.type)}>
                <div className={s.itemLeft}>
                  {typeof item.icon === 'string' && <img src={item.icon} className={s.leftImage} />}
                </div>
                <div className={s.itemRight}>
                  <div className={s.rightTitle}>{item.displayLabel}</div>
                  <div className={s.rightDesc}>{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        {isNotFound && (
          <button type="button" className={s.item} disabled>
            <div className={s.itemRight}>
              <div className={s.rightTitle}>Not found</div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export { NotionActionMenu };

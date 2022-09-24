import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import s from './HoveredMenu.module.scss';

export const HoveredMenuItem = ({ handlePlusButton, hovered }) => {
  return (
    <div className={s.hoverSettings} style={{ opacity: hovered ? 1 : 0 }}>
      <div className={s.actions}>
        <button type="button" onClick={handlePlusButton} title="Click to add node" className={s.hoverSettingsItem}>
          <PlusIcon />
        </button>
        <button type="button" title="Click to add node" className={s.hoverSettingsItem}>
          <DragIcon />
        </button>
      </div>
    </div>
  );
};

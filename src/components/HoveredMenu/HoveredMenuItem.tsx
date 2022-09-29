import { useRef } from 'react';
import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import s from './HoveredMenu.module.scss';

export const HoveredMenuItem = ({
  handlePlusButton,
  hovered,
  elementRef,
  onDragStart,
  onDragEnd,
  isDragging,
}) => {
  const handleRef = useRef(null);

  const onMouseDown = (e) => {
    const handler = handleRef.current!;
    const target = elementRef.current!;

    handler.setAttribute('draggable', false);
    target.setAttribute('draggable', true);
    target.ondragstart = onDragStart;
    target.ondragend = onDragEnd;
  };

  return (
    <div className={s.hoverSettings} style={{ opacity: hovered && !isDragging ? 1 : 0 }}>
      <div className={s.actions}>
        <button type="button" onClick={handlePlusButton} title="Click to add node" className={s.hoverSettingsItem}>
          <PlusIcon />
        </button>
        <button
          type="button"
          title="Click to add node"
          className={s.hoverSettingsItem}
          onMouseDown={onMouseDown}
          ref={handleRef}
        >
          <DragIcon />
        </button>
      </div>
    </div>
  );
};

HoveredMenuItem.displayName = 'HoveredMenuItem';

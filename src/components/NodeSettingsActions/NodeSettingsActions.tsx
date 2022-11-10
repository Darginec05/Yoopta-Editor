import { ReactEditor } from 'slate-react';
import PlusIcon from '../../icons/add.svg';
import DragIcon from '../../icons/drag.svg';
import s from './NodeSettingsActions.module.scss';

export const NodeSettingsActions = ({
  onDragEnd,
  isDragging,
  onDragStart,
  handlers,
  dragRef,
  node,
  editor,
}: any) => {
  const { closeNodeSettings, openNodeSettings, triggerPlusButton } = handlers;

  // const onMouseDown = () => {
  //   const handler = dragRef.current;
  //   const target = document.querySelector<HTMLDivElement>(`[data-node-id="${elementId}"]`);

  //   handler?.setAttribute('draggable', 'false');
  //   if (target) {
  //     target.setAttribute('draggable', 'true');
  //     target.ondragstart = onDragStart;
  //     target.ondragend = onDragEnd;
  //   }
  // };

  const onClose = () => closeNodeSettings();

  // const handleOpenSettings = () => {
  //   // onOpenNodeSettings(handlerRef.current);
  //   // if (isOpenSettingsOpen) return onClose();
  //   // setSettingsOpen(true);
  // };

  // const getVisibility = () => {
  //   if (isDragging) return 0;
  //   // if (isOpenSettingsOpen || isHovered) return 1;
  //   if (isHovered) return 1;

  //   return 0;
  // };

  const handleOpenSettings = () => {
    const path = ReactEditor.findPath(editor, node);
    openNodeSettings(path);
  };

  return (
    <div className={s.actions}>
      <button type="button" onClick={triggerPlusButton} className={s.hoverSettingsItem}>
        <PlusIcon />
      </button>
      <button
        className={s.hoverSettingsItem}
        // onMouseDown={onMouseDown}
        onClick={handleOpenSettings}
        ref={dragRef}
        type="button"
      >
        <DragIcon />
      </button>
    </div>
  );
};

NodeSettingsActions.displayName = 'NodeSettingsActions';

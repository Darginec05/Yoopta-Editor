import { useRef, useState } from 'react';
import PlusIcon from '../../icons/add.svg';
import DragIcon from '../../icons/drag.svg';
import { ElementSettings } from '../ElementSettings/ElementSettings';
import { useScrollContext } from '../../contexts/ScrollContext/ScrollContext';
import { Modal } from '../Modal/Modal';
import s from './HoveredMenu.module.scss';

export const HoveredMenuItem = ({
  hovered,
  onDragEnd,
  isDragging,
  elementId,
  onDragStart,
  handlePlusButton,
  handleDeleteNode,
  handleDuplicateNode,
  handleCopyLinkNode,
  isVoidElement,
}: any) => {
  const handlerRef = useRef<HTMLButtonElement>(null);
  const [isOpenSettingsOpen, setSettingsOpen] = useState(false);
  const { enableScroll, disableScroll } = useScrollContext();

  const onMouseDown = () => {
    const handler = handlerRef.current!;
    const target = document.querySelector<HTMLDivElement>(`[data-node-id="${elementId}"]`);

    handler.setAttribute('draggable', 'false');
    if (target) {
      target.setAttribute('draggable', 'true');
      target.ondragstart = onDragStart;
      target.ondragend = onDragEnd;
    }
  };

  const onClose = () => {
    setSettingsOpen(false);
    enableScroll();
  };

  const onOpenMenu = () => {
    if (isOpenSettingsOpen) return onClose();

    setSettingsOpen(true);
    disableScroll();
  };

  const getVisibility = () => {
    if (isDragging) return 0;
    if (isOpenSettingsOpen || hovered) return 1;

    return 0;
  };

  return (
    <div className={s.hoverSettings} style={{ opacity: getVisibility() }}>
      <div className={s.actions}>
        <button type="button" onClick={handlePlusButton} className={s.hoverSettingsItem}>
          <PlusIcon />
        </button>
        <button
          className={s.hoverSettingsItem}
          onMouseDown={onMouseDown}
          onClick={onOpenMenu}
          ref={handlerRef}
          type="button"
        >
          <DragIcon />
        </button>
      </div>
      {isOpenSettingsOpen && (
        <Modal handlerRef={handlerRef} onClose={() => setSettingsOpen(false)}>
          <ElementSettings
            handleDeleteNode={handleDeleteNode}
            handleDuplicateNode={handleDuplicateNode}
            handleCopyLinkNode={handleCopyLinkNode}
            isVoidElement={isVoidElement}
            onClose={onClose}
          />
        </Modal>
      )}
    </div>
  );
};

HoveredMenuItem.displayName = 'HoveredMenuItem';

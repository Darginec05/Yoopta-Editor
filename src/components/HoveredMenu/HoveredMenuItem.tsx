import { useRef, useState } from 'react';
import PlusIcon from '../../icons/add.svg';
import DragIcon from '../../icons/drag.svg';
import { Fade } from '../Fade';
import { ElementSettings } from '../ElementSettings/ElementSettings';
import { useScrollContext } from '../../contexts/ScrollContext/ScrollContext';
import s from './HoveredMenu.module.scss';

export const HoveredMenuItem = ({
  hovered,
  onDragEnd,
  isDragging,
  elementRef,
  onDragStart,
  handlePlusButton,
  handleDeleteNode,
  handleDuplicateNode,
  handleCopyLinkNode,
  isVoidElement,
}) => {
  const handlerRef = useRef<HTMLDivElement>(null);
  const [isOpenSettingsOpen, setSettingsOpen] = useState(false);
  const { enableScroll, disableScroll } = useScrollContext();

  const onMouseDown = () => {
    console.log({ elementRef });
    const handler = handlerRef.current!;
    const target = elementRef.current!;

    handler.setAttribute('draggable', 'false');
    target.setAttribute('draggable', 'true');
    target.ondragstart = onDragStart;
    target.ondragend = onDragEnd;
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

  const getOpacity = () => {
    if (isDragging) return 0;
    if (isOpenSettingsOpen || hovered) return 1;

    return 0;
  };

  return (
    <div className={s.hoverSettings} style={{ opacity: getOpacity() }}>
      <div className={s.actions}>
        <button type="button" onClick={handlePlusButton} className={s.hoverSettingsItem}>
          <PlusIcon />
        </button>
        <div
          aria-hidden
          className={s.hoverSettingsItem}
          onMouseDown={onMouseDown}
          onClick={onOpenMenu}
          ref={handlerRef}
        >
          <DragIcon />
          <Fade animationDelay={150} show={isOpenSettingsOpen}>
            <ElementSettings
              handleDeleteNode={handleDeleteNode}
              handleDuplicateNode={handleDuplicateNode}
              handleCopyLinkNode={handleCopyLinkNode}
              isVoidElement={isVoidElement}
              onClose={onClose}
            />
          </Fade>
        </div>
      </div>
    </div>
  );
};

HoveredMenuItem.displayName = 'HoveredMenuItem';

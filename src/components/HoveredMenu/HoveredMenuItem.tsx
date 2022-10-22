import { useRef, useState } from 'react';
import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
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
  handleTransformIntoNode,
  handleCopyLinkNode,
}) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const [isOpenSettingsOpen, setSettingsOpen] = useState(false);
  const { enableScroll, disableScroll } = useScrollContext();

  const onMouseDown = () => {
    const handler = handleRef.current!;
    const target = elementRef.current!;

    handler.setAttribute('draggable', 'false');
    target.setAttribute('draggable', 'true');
    target.ondragstart = onDragStart;
    target.ondragend = onDragEnd;
  };

  const onClick = () => {
    setSettingsOpen(true);
    disableScroll();
  };

  // [TODO] - bug
  const onClose = () => {
    setSettingsOpen(false);
    enableScroll();
  };

  const getOpacity = () => {
    if (isOpenSettingsOpen) return 1;

    if (hovered && !isDragging) return 1;

    return 0;
  };

  return (
    <div className={s.hoverSettings} style={{ opacity: getOpacity() }}>
      <div className={s.actions}>
        <button type="button" onClick={handlePlusButton} className={s.hoverSettingsItem}>
          <PlusIcon />
        </button>
        <div aria-hidden className={s.hoverSettingsItem} onMouseDown={onMouseDown} onClick={onClick} ref={handleRef}>
          <DragIcon />
          <Fade animationDelay={150} show={isOpenSettingsOpen}>
            <ElementSettings
              onClose={onClose}
              handleDeleteNode={handleDeleteNode}
              handleDuplicateNode={handleDuplicateNode}
              handleTransformIntoNode={handleTransformIntoNode}
              handleCopyLinkNode={handleCopyLinkNode}
            />
          </Fade>
        </div>
      </div>
    </div>
  );
};

HoveredMenuItem.displayName = 'HoveredMenuItem';

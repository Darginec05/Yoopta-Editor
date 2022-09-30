import { useEffect, useRef, useState } from 'react';
import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import { Fade } from '../Fade';
import { ElementSettings } from '../ElementSettings/ElementSettings';
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
  const handleRef = useRef(null);
  const [isOpenSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!hovered && isOpenSettingsOpen) {
      setSettingsOpen(false);
    }
  }, [hovered, isOpenSettingsOpen]);

  const onMouseDown = (e) => {
    const handler = handleRef.current!;
    const target = elementRef.current!;

    handler.setAttribute('draggable', false);
    target.setAttribute('draggable', true);
    target.ondragstart = onDragStart;
    target.ondragend = onDragEnd;
  };

  const onClick = (e) => {
    setSettingsOpen(true);
  };

  return (
    <div className={s.hoverSettings} style={{ opacity: hovered && !isDragging ? 1 : 0 }}>
      <div className={s.actions}>
        <button type="button" onClick={handlePlusButton} className={s.hoverSettingsItem}>
          <PlusIcon />
        </button>
        <div
          aria-hidden
          className={s.hoverSettingsItem}
          onMouseDown={onMouseDown}
          onClick={onClick}
          ref={handleRef}
        >
          <DragIcon />
          <Fade animationDelay={150} show={isOpenSettingsOpen}>
            <ElementSettings
              onClose={() => setSettingsOpen(false)}
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

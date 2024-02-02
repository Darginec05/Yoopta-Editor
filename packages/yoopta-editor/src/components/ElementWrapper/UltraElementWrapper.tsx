import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import cx from 'classnames';
import { PLUGIN_INDEX } from '../Editor/utils';
import { getDefaultYooptaChildrenValue } from '../Editor/defaultValue';
import { generateId } from '../../utils/generateId';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import s from './UltraElementWrapper.module.scss';
import { useState } from 'react';

const Actions = ({ plugin, editor, dragHandleProps }) => {
  const { setActivatorNodeRef, attributes, listeners } = dragHandleProps;

  const onPlusClick = () => {
    const pluginIndex = PLUGIN_INDEX.get(plugin);
    const defaultBlock = getDefaultYooptaChildrenValue(generateId());

    const nextPath = [pluginIndex + 1];
    editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
  };

  return (
    <div contentEditable={false} className={cx(s.actions, { [s.hovered]: false }, 'yoopta-element-actions')}>
      <button
        type="button"
        onClick={onPlusClick}
        className={cx(s.actionButton, s.plusButton, 'yoopta-element-actions-plus')}
      >
        <PlusIcon />
      </button>
      <button
        type="button"
        className={cx(s.actionButton, 'yoopta-element-actions-drag')}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
      >
        <DragIcon />
      </button>
    </div>
  );
};

const UltraElementWrapper = ({ children, plugin, pluginId }) => {
  const editor = useYooptaEditor();
  const [isHovered, setIsHovered] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    active,
    over,
    isOver,
    isDragging,
  } = useSortable({
    id: pluginId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    // // implement selected state by mouse area
    // backgroundColor: selected ? 'rgba(35, 131, 226, 0.14)' : undefined,
  };

  return (
    <div className={s.root} data-yoopta-plugin-id={pluginId} style={style} data-yoopta-plugin ref={setNodeRef}>
      <Actions plugin={plugin} editor={editor} dragHandleProps={{ setActivatorNodeRef, attributes, listeners }} />
      <div
        className={s.content}
        // [TODO] - check in what direction is dragging
        style={{ borderBottom: isOver && !isDragging ? '2px solid #007aff' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

export { UltraElementWrapper };

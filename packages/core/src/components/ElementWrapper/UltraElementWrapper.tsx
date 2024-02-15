import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import cx from 'classnames';
import { PLUGIN_INDEX } from '../Editor/utils';
import { getDefaultChildrenValue } from '../Editor/defaultValue';
import { generateId } from '../../utils/generateId';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import s from './UltraElementWrapper.module.scss';
import { useState } from 'react';
import { YooEditor } from '../../editor/types';

type ActionsProps = {
  plugin: any;
  editor: YooEditor;
  dragHandleProps: any;
  showActions: boolean;
};

const Actions = ({ plugin, editor, dragHandleProps, showActions }: ActionsProps) => {
  const { setActivatorNodeRef, attributes, listeners } = dragHandleProps;

  const onPlusClick = () => {
    const pluginIndex = PLUGIN_INDEX.get(plugin);
    const defaultBlock = getDefaultChildrenValue(generateId());

    const nextPath = [pluginIndex + 1];

    editor.setSelection([pluginIndex]);
    editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
  };

  return (
    <div contentEditable={false} className={cx(s.actions, { [s.hovered]: showActions }, 'yoopta-element-actions')}>
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

// [TODO] - implement selected state by mouse select area
const UltraElementWrapper = ({ children, plugin, pluginId }) => {
  const editor = useYooptaEditor();

  // [TODO] - hovered by block id
  const [hoveredBlockId, setHoveredId] = useState<string | null>(null);
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
  } = useSortable({ id: pluginId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    // [TODO] = handle max depth
    marginLeft: `${plugin.meta.depth * 20}px`,
    // // implement selected state by mouse select  area
    // backgroundColor: selected ? 'rgba(35, 131, 226, 0.14)' : undefined,
  };

  const isHovered = hoveredBlockId === pluginId;

  const handleMouseEnter = () => setHoveredId(pluginId);
  const handleMouseLeave = () => setHoveredId(null);

  return (
    <div
      className={s.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-yoopta-plugin-id={pluginId}
      style={style}
      data-yoopta-plugin
      ref={setNodeRef}
    >
      <Actions
        plugin={plugin}
        editor={editor}
        dragHandleProps={{ setActivatorNodeRef, attributes, listeners }}
        showActions={isHovered}
      />
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

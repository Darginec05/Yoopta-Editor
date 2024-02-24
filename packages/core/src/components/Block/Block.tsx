import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import s from './Block.module.scss';
import { BlockActions } from './BlockActions';

const Block = ({ children, plugin, pluginId }) => {
  const editor = useYooptaEditor();

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
  };

  const isSelected = editor.selectedBlocks?.includes(plugin.meta.order);
  const isHovered = hoveredBlockId === pluginId;

  const handleMouseEnter = () => setHoveredId(pluginId);
  const handleMouseLeave = () => setHoveredId(null);

  return (
    <div
      className="relative py-0 px-[2px] mt-[2px] mb-[1px] rounded yoopta-block-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-yoopta-plugin-id={pluginId}
      style={style}
      data-yoopta-plugin
      ref={setNodeRef}
    >
      <BlockActions
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
      {isSelected && (
        <div className="absolute left-0 top-0 bg-[#2383e224] z-[90] rounded opacity-100 h-full w-full pointer-events-none" />
      )}
    </div>
  );
};

export { Block };

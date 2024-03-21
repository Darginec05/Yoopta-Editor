import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { useRef, useState } from 'react';
import { BlockActions } from './BlockActions';
import s from './Block.module.scss';

const Block = ({ children, block, blockId }) => {
  const editor = useYooptaEditor();

  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
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
  } = useSortable({ id: blockId });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
    transition,
    opacity: isDragging ? 0.7 : 1,
    // [TODO] = handle max depth
    marginLeft: `${block.meta.depth * 20}px`,
  };

  const isSelected = editor.selectedBlocks?.includes(block.meta.order);
  const isHovered = activeBlockId === blockId;

  const onChangeActiveBlock = (id: string) => setActiveBlockId(id);

  const handleMouseEnter = () => onChangeActiveBlock(blockId);
  const handleMouseLeave = () => setActiveBlockId(null);

  return (
    <div
      className="relative py-0 px-[2px] mt-[2px] mb-[1px] rounded yoopta-block-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-yoopta-block-id={blockId}
      style={style}
      data-yoopta-block
      ref={setNodeRef}
    >
      <BlockActions
        block={block}
        editor={editor}
        dragHandleProps={{ setActivatorNodeRef, attributes, listeners }}
        showActions={isHovered}
        onChangeActiveBlock={onChangeActiveBlock}
      />
      <div
        className={s.content}
        // [TODO] - check in what direction is dragging
        style={{ borderBottom: isOver && !isDragging ? '2px solid #007aff' : 'none' }}
      >
        {children}
      </div>
      {isSelected && (
        <div className="absolute left-0 top-0 bg-[#2383e224] z-[90] rounded opacity-100 h-full w-full pointer-events-none yoopta-selection-block" />
      )}
    </div>
  );
};

export { Block };

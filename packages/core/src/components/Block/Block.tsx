import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { useState } from 'react';
import { BlockActions } from './BlockActions';
import s from './Block.module.scss';

const Block = ({ children, block, blockId }) => {
  const editor = useYooptaEditor();

  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isOver, isDragging } =
    useSortable({ id: blockId, disabled: editor.readOnly });

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

  const handleMouseEnter = () => {
    if (editor.readOnly) return;
    setActiveBlockId(blockId);
  };
  const handleMouseLeave = () => {
    if (editor.readOnly) return;
    setActiveBlockId(null);
  };

  const contentStyles = { borderBottom: isOver && !isDragging ? '2px solid #007aff' : 'none' };

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
      {!editor.readOnly && (
        <BlockActions
          block={block}
          editor={editor}
          dragHandleProps={{ setActivatorNodeRef, attributes, listeners }}
          showActions={isHovered}
          onChangeActiveBlock={onChangeActiveBlock}
        />
      )}
      <div
        className={s.content}
        // [TODO] - check in which direction is dragging
        style={contentStyles}
      >
        {children}
      </div>
      {isSelected && !editor.readOnly && (
        <div className="absolute left-0 top-0 bg-[#2383e224] z-[90] rounded opacity-100 h-full w-full pointer-events-none yoopta-selection-block" />
      )}
    </div>
  );
};

export { Block };

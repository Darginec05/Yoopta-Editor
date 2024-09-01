import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, useState } from 'react';
import { BlockActions } from './BlockActions';

const Block = ({ children, block, blockId }) => {
  const editor = useYooptaEditor();

  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isOver, isDragging } =
    useSortable({ id: blockId, disabled: editor.readOnly });

  const align = block.meta.align || 'left';
  const className = `yoopta-block yoopta-align-${align}`;

  const style: CSSProperties = {
    // [TODO] = handle max depth
    marginLeft: `${block.meta.depth * 20}px`,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
    transition,
    opacity: isDragging ? 0.7 : 1,
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

  const contentStyles = isOver && !isDragging ? { borderBottom: '2px solid #007aff' } : undefined;

  return (
    <div
      ref={setNodeRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      data-hovered-block={isHovered}
      data-yoopta-block
      data-yoopta-block-id={blockId}
      data-yoopta-block-type={block.type}
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
        // [TODO] - check in which direction is dragging
        style={contentStyles}
      >
        {children}
      </div>
      {isSelected && !editor.readOnly && <div className="yoopta-selection-block" />}
    </div>
  );
};

export { Block };

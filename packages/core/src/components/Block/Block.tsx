import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { useState } from 'react';
import { BlockActions } from './BlockActions';

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
      className="yoo-editor-relative yoo-editor-py-0 yoo-editor-px-[2px] yoo-editor-mt-[2px] yoo-editor-mb-[1px] yoo-editor-rounded yoopta-block-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-yoopta-block-id={blockId}
      style={style}
      data-yoopta-block
      data-hovered-block={isHovered}
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
        // [TODO] - check in which direction is dragging
        style={contentStyles}
      >
        {children}
      </div>
      {isSelected && !editor.readOnly && (
        <div className="yoo-editor-absolute yoo-editor-left-0 yoo-editor-top-0 yoo-editor-bg-[#2383e224] yoo-editor-z-[90] yoo-editor-rounded yoo-editor-opacity-100 yoo-editor-h-full yoo-editor-w-full yoo-editor-pointer-events-none yoopta-selection-block" />
      )}
    </div>
  );
};

export { Block };

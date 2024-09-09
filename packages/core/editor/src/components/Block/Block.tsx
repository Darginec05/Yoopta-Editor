import React, { useCallback, useMemo } from 'react';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { BlockActions } from './BlockActions';
import { YooptaBlockData } from '../../editor/types';
import { useBlockStyles } from './hooks';

type BlockProps = {
  children: React.ReactNode;
  block: YooptaBlockData;
  blockId: string;
};

const Block = ({ children, block, blockId }: BlockProps) => {
  const editor = useYooptaEditor();
  const [activeBlockId, setActiveBlockId] = React.useState<string | null>(null);

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isOver, isDragging } =
    useSortable({ id: blockId, disabled: editor.readOnly });
  const styles = useBlockStyles(block, transform, transition, isDragging, isOver);

  const align = block.meta.align || 'left';
  const className = `yoopta-block yoopta-align-${align}`;

  const isSelected = editor.selectedBlocks?.includes(block.meta.order);
  const isHovered = activeBlockId === blockId;

  const handleMouseEnter = useCallback(() => {
    if (editor.readOnly) return;
    setActiveBlockId(blockId);
  }, [editor.readOnly, blockId]);

  const handleMouseLeave = useCallback(() => {
    if (editor.readOnly) return;
    setActiveBlockId(null);
  }, [editor.readOnly]);

  const dragHandleProps = useMemo(() => ({ setActivatorNodeRef, attributes, listeners }), [block]);

  return (
    <div
      ref={setNodeRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.container}
      data-hovered-block={isHovered}
      data-yoopta-block
      data-yoopta-block-id={blockId}
      data-yoopta-block-type={block.type}
    >
      {!editor.readOnly && (
        <BlockActions
          block={block}
          editor={editor}
          dragHandleProps={dragHandleProps}
          showActions={isHovered}
          onChangeActiveBlock={setActiveBlockId}
        />
      )}
      <div style={styles.content}>{children}</div>
      {isSelected && !editor.readOnly && <div className="yoopta-selection-block" />}
    </div>
  );
};

export { Block };

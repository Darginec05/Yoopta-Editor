import { useState, useRef, useEffect, memo } from 'react';
import { YooEditor, YooptaBlockData } from '../../editor/types';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import { generateId } from '../../utils/generateId';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { getRootBlockElement } from '../../utils/blockElements';
import { ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';
import { BlockOptions } from '../../UI/BlockOptions/BlockOptions';
import { Blocks } from '../../editor/blocks';
import { Portal } from '../../UI/Portal/Portal';
import { useActionMenuToolRefs, useBlockActionRefs, useBlockOptionsRefs } from './hooks';
import { Overlay } from '../../UI/Overlay/Overlay';
import { throttle } from '../../utils/throttle';

type dragHandleProps = {
  attributes: any;
  listeners: any;
  setActivatorNodeRef: any;
};

type FloatingBlockActionsProps = {
  editor: YooEditor;
  dragHandleProps: dragHandleProps | null;
};

const MOUSE_LEAVE_TIMEOUT = 300;

export const FloatingBlockActions = memo(({ editor, dragHandleProps }: FloatingBlockActionsProps) => {
  const [hoveredBlock, setHoveredBlock] = useState<YooptaBlockData | null>(null);
  const mouseLeaveTimerRef = useRef<number>();

  const { attributes, listeners, setActivatorNodeRef } = dragHandleProps || {};

  const { setIsBlockActionsOpen, isBlockActionsMounted, blockActionsRefs, blockActionsFloatingStyle } =
    useBlockActionRefs();

  const { isBlockOptionsMounted, setIsBlockOptionsOpen, blockOptionsFloatingStyle, blockOptionsRefs } =
    useBlockOptionsRefs();

  const {
    isActionMenuOpen,
    actionMenuRefs,
    hasActionMenu,
    actionMenuStyles,
    onChangeActionMenuOpen,
    onCloseActionMenu,
    actionMenuRenderProps,
    ActionMenu,
  } = useActionMenuToolRefs({ editor });

  const handleMouseMove = (event: Event) => {
    if (editor.readOnly) return;

    const target = event.target as HTMLElement;
    const blockElement = target.closest('[data-yoopta-block]') as HTMLElement;

    if (blockElement) {
      const blockId = blockElement.getAttribute('data-yoopta-block-id');

      if (blockId === hoveredBlock?.id) return;

      const blockData = editor.children[blockId || ''];

      if (blockData) {
        clearTimeout(mouseLeaveTimerRef.current);
        blockActionsRefs.setReference(blockElement);

        setHoveredBlock(blockData);
        setIsBlockActionsOpen(true);
      }
    }
  };

  const throttledMouseMove = throttle(handleMouseMove, 100, { leading: true, trailing: true });

  useEffect(() => {
    const editorEl = editor.refElement;
    if (!editorEl) return;

    editorEl.addEventListener('mousemove', throttledMouseMove);
    editorEl.addEventListener('scroll', throttledMouseMove);

    return () => {
      editorEl.removeEventListener('mousemove', throttledMouseMove);
      editorEl.removeEventListener('scroll', throttledMouseMove);
      clearTimeout(mouseLeaveTimerRef.current);
      throttledMouseMove.cancel();
    };
  }, [editor.refElement]);

  if (!isBlockActionsMounted || !hoveredBlock) return null;

  console.log('re render', hoveredBlock.id);

  const onPlusClick = () => {
    const block = hoveredBlock;

    const slate = Blocks.getBlockSlate(editor, { id: block.id });
    const blockEntity = editor.blocks[block.type];
    if (!slate) return;

    const blockEl = document.querySelector(`[data-yoopta-block-id="${block.id}"]`);
    const rootElement = getRootBlockElement(blockEntity.elements);
    let string: undefined | string;
    if (!blockEntity.hasCustomEditor) {
      string = Editor.string(slate, [0]);
    }

    const isEmptyString = typeof string === 'string' && string.trim().length === 0;
    if (hasActionMenu && isEmptyString && rootElement?.props?.nodeType !== 'void') {
      editor.setPath({ current: block.meta.order });
      editor.focusBlock(block.id);
      actionMenuRefs.setReference(blockEl);
      onChangeActionMenuOpen(true);
    } else {
      const defaultBlock = Blocks.buildBlockData({ id: generateId() });
      const nextPath = block.meta.order + 1;
      editor.setPath({ current: block.meta.order });
      editor.insertBlock(defaultBlock.type, { at: nextPath, focus: true });
      if (hasActionMenu) {
        setTimeout(() => {
          if (blockEl) actionMenuRefs.setReference(blockEl.nextSibling as HTMLElement);
          onChangeActionMenuOpen(true);
        }, 0);
      }
    }
  };

  const onSelectBlock = (event: React.MouseEvent) => {
    event.stopPropagation();
    const block = hoveredBlock;

    const slate = findSlateBySelectionPath(editor, { at: block.meta.order });
    editor.focusBlock(block.id);

    if (!slate) return;

    setTimeout(() => {
      const currentBlock = editor.blocks[block.type];

      if (!currentBlock.hasCustomEditor) {
        ReactEditor.blur(slate);
        ReactEditor.deselect(slate);
        Transforms.deselect(slate);
      }

      editor.setPath({ current: block.meta.order, selected: [block.meta.order] });

      setIsBlockOptionsOpen(true);
    }, 10);
  };

  const onDragButtonRef = (node: HTMLElement | null) => {
    setActivatorNodeRef?.(node);
    blockOptionsRefs.setReference(node);
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveTimerRef.current);
  };

  const handleMouseLeave = () => {
    mouseLeaveTimerRef.current = window.setTimeout(() => {
      setHoveredBlock(null);
      setIsBlockActionsOpen(false);
    }, MOUSE_LEAVE_TIMEOUT);
  };

  return (
    <Portal id="block-actions">
      <div
        contentEditable={false}
        ref={blockActionsRefs.setFloating}
        style={blockActionsFloatingStyle}
        className="yoopta-block-actions"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isActionMenuOpen && hasActionMenu && (
          <Portal id="yoo-block-options-portal">
            <Overlay lockScroll className="yoo-editor-z-[100]" onClick={onCloseActionMenu}>
              <div style={actionMenuStyles} ref={actionMenuRefs.setFloating}>
                {/* @ts-ignore - fixme */}
                <ActionMenu {...actionMenuRenderProps} />
              </div>
            </Overlay>
          </Portal>
        )}
        <button type="button" onClick={onPlusClick} className="yoopta-block-actions-plus">
          <PlusIcon />
        </button>
        <button
          ref={onDragButtonRef}
          type="button"
          className="yoopta-block-actions-drag"
          onClick={onSelectBlock}
          {...attributes}
          {...listeners}
        >
          <DragIcon />
        </button>
        <BlockOptions
          isOpen={isBlockOptionsMounted}
          refs={blockOptionsRefs}
          style={blockOptionsFloatingStyle}
          onClose={() => setIsBlockOptionsOpen(false)}
        />
      </div>
    </Portal>
  );
});

FloatingBlockActions.displayName = 'FloatingBlockActions';

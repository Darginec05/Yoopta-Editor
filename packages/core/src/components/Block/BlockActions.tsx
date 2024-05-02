import { YooEditor, YooptaBlockPath, YooptaBlockData } from '../../editor/types';
import { generateId } from '../../utils/generateId';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import { buildBlockData } from '../Editor/utils';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';
import { useState } from 'react';
import {
  useFloating,
  offset,
  flip,
  inline,
  shift,
  useTransitionStyles,
  FloatingPortal,
  FloatingOverlay,
} from '@floating-ui/react';
import { BlockOptions } from '../../UI/BlockOptions/BlockOptions';
import { getRootBlockElement } from '../../utils/blockElements';
import { useActionMenuToolRefs } from './hooks';

type ActionsProps = {
  block: YooptaBlockData;
  editor: YooEditor;
  dragHandleProps: any;
  showActions: boolean;
  onChangeActiveBlock: (id: string) => void;
};

const BlockActions = ({ block, editor, dragHandleProps, onChangeActiveBlock, showActions }: ActionsProps) => {
  const [isBlockOptionsOpen, setIsBlockOptionsOpen] = useState<boolean>(false);

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

  const { refs, floatingStyles, context } = useFloating({
    placement: 'right-start',
    open: isBlockOptionsOpen,
    onOpenChange: setIsBlockOptionsOpen,
    middleware: [inline(), flip(), shift(), offset()],
  });

  const { isMounted, styles: blockOptionsTransitionStyles } = useTransitionStyles(context, {
    duration: 100,
  });

  const { setActivatorNodeRef, attributes, listeners } = dragHandleProps;

  const onPlusClick = () => {
    const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });

    if (!slate) return;

    const blockEl = document.querySelector(`[data-yoopta-block-id="${block.id}"]`);
    const string = Editor.string(slate, [0]);

    const rootElement = getRootBlockElement(editor.blocks[block.type].elements);
    const isEmptyString = string.trim().length === 0;

    if (hasActionMenu && isEmptyString && rootElement?.props?.nodeType !== 'void') {
      editor.setSelection([block.meta.order]);
      editor.focusBlock(block.id);

      actionMenuRefs.setReference(blockEl);
      onChangeActionMenuOpen(true);
    } else {
      const defaultBlock = buildBlockData({ id: generateId() });
      const nextPath: YooptaBlockPath = [block.meta.order + 1];

      editor.setSelection([block.meta.order]);
      editor.insertBlock(defaultBlock, { at: nextPath, focus: true });

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
    onChangeActiveBlock(block.id);

    const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });
    editor.focusBlock(block.id);

    if (!slate) return;

    setTimeout(() => {
      const currentBlock = editor.blocks[block.type];

      if (!currentBlock.hasCustomEditor) {
        ReactEditor.blur(slate);
        ReactEditor.deselect(slate);
        Transforms.deselect(slate);
      }

      editor.setBlockSelected([block.meta.order], { only: true });
      editor.setSelection([block.meta.order]);

      setIsBlockOptionsOpen(true);
    }, 10);
  };

  const onDragButtonRef = (node: HTMLElement | null) => {
    setActivatorNodeRef(node);
    refs.setReference(node);
  };

  const blockOptionsFloatingStyle = { ...floatingStyles, ...blockOptionsTransitionStyles };

  return (
    <div
      contentEditable={false}
      data-hovered-state-open={showActions}
      className={`yoo-editor-flex yoo-editor-absolute -yoo-editor-left-[50px] yoo-editor-top-[2px] yoo-editor-opacity-0 yoo-editor-transition-opacity yoopta-element-actions data-[hovered-state-open="true"]:yoo-editor-opacity-100`}
    >
      {isActionMenuOpen && hasActionMenu && (
        <FloatingPortal id="yoo-block-options-portal" root={document.getElementById('yoopta-editor')}>
          <FloatingOverlay lockScroll className="yoo-editor-z-[100]" onClick={onCloseActionMenu}>
            <div style={actionMenuStyles} ref={actionMenuRefs.setFloating}>
              <ActionMenu {...actionMenuRenderProps} />
            </div>
          </FloatingOverlay>
        </FloatingPortal>
      )}
      <button
        type="button"
        onClick={onPlusClick}
        className="yoo-editor-cursor-pointer yoo-editor-rounded-[6px] yoo-editor-h-[24px] yoo-editor-flex yoo-editor-items-center yoo-editor-justify-center yoo-editor-bg-inherit yoo-editor-bg-transparent yoo-editor-transition-colors yoo-editor-duration-[180ms] yoo-editor-ease-[cubic-bezier(0.4,0,0.2,1)] yoo-editor-relative yoo-editor-w-[18px] yoo-editor-p-0 yoo-editor-text-[rgba(55,53,47,0.35)] yoo-editor-m-[0_1px] hover:yoo-editor-bg-[rgba(55,54,47,0.08)] focus:yoo-editor-bg-[rgba(55,54,47,0.08)] active:yoo-editor-bg-[rgba(55,54,47,0.08)] yoo-editor-w-[24px] yoopta-element-actions-plus"
      >
        <PlusIcon />
      </button>
      <button
        type="button"
        className="yoo-editor-cursor-pointer yoo-editor-rounded-[6px] yoo-editor-h-[24px] yoo-editor-flex yoo-editor-items-center yoo-editor-justify-center yoo-editor-bg-inherit yoo-editor-bg-transparent yoo-editor-transition-colors yoo-editor-duration-[180ms] yoo-editor-ease-[cubic-bezier(0.4,0,0.2,1)] yoo-editor-relative yoo-editor-w-[18px] yoo-editor-p-0 yoo-editor-text-[rgba(55,53,47,0.35)] yoo-editor-m-[0_1px] hover:yoo-editor-bg-[rgba(55,54,47,0.08)] focus:yoo-editor-bg-[rgba(55,54,47,0.08)] active:yoo-editor-bg-[rgba(55,54,47,0.08)] yoopta-element-actions-drag"
        ref={onDragButtonRef}
        {...attributes}
        {...listeners}
        onClick={onSelectBlock}
      >
        <DragIcon />
      </button>
      <BlockOptions
        isOpen={isMounted}
        refs={refs}
        style={blockOptionsFloatingStyle}
        onClose={() => setIsBlockOptionsOpen(false)}
      />
    </div>
  );
};

export { BlockActions };

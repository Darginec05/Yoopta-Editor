import { YooEditor, YooptaBlockPath, YooptaBlockData } from '../../editor/types';
import { generateId } from '../../utils/generateId';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import { buildBlockData } from '../Editor/utils';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { useState } from 'react';
import { useFloating, offset, flip, inline, shift, useTransitionStyles } from '@floating-ui/react';
import { BlockOptions } from '../../UI/BlockOptions/BlockOptions';

type ActionsProps = {
  block: YooptaBlockData;
  editor: YooEditor;
  dragHandleProps: any;
  showActions: boolean;
  onChangeActiveBlock: (id: string) => void;
};

const BlockActions = ({ block, editor, dragHandleProps, showActions, onChangeActiveBlock }: ActionsProps) => {
  const [isBlockOptionsOpen, setIsBlockOptionsOpen] = useState<boolean>(false);

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
    const defaultBlock = buildBlockData({ id: generateId() });
    const nextPath: YooptaBlockPath = [block.meta.order + 1];

    editor.setSelection([block.meta.order]);
    editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
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
      data-hovered-state={showActions}
      className={`yoo-editor-flex yoo-editor-absolute -yoo-editor-left-[50px] yoo-editor-top-[2px] yoo-editor-opacity-0 yoo-editor-transition-opacity yoopta-element-actions data-[hovered-state="true"]:yoo-editor-opacity-100`}
    >
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

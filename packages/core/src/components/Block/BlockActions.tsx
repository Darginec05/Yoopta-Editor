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
import s from './Block.module.scss';

type ActionsProps = {
  block: YooptaBlockData;
  editor: YooEditor;
  dragHandleProps: any;
  showActions: boolean;
  onChangeActiveBlock: (id: string) => void;
};

function cx(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(' ');
}

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

    console.log('editor.children', editor.children);

    const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });
    console.log('block', block);
    console.log('slate', slate);
    editor.focusBlock(block.id);

    if (!slate) return;

    setTimeout(() => {
      ReactEditor.blur(slate);
      ReactEditor.deselect(slate);
      Transforms.deselect(slate);

      editor.setBlockSelected([block.meta.order], { only: true });
      editor.setSelection([block.meta.order]);

      setIsBlockOptionsOpen(true);
    }, 10);
  };

  const onDragButtonRef = (node: HTMLElement | null) => {
    setActivatorNodeRef(node);
    refs.setReference(node);
  };

  const style = { ...floatingStyles, ...blockOptionsTransitionStyles };

  return (
    <div contentEditable={false} className={cx(s.actions, showActions && s.hovered, 'yoopta-element-actions')}>
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
        ref={onDragButtonRef}
        {...attributes}
        {...listeners}
        onClick={onSelectBlock}
      >
        <DragIcon />
      </button>
      <BlockOptions isOpen={isMounted} refs={refs} style={style} onClose={() => setIsBlockOptionsOpen(false)} />
    </div>
  );
};

export { BlockActions };

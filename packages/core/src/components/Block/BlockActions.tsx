import cx from 'classnames';
import { YooEditor, YooptaChildrenValue } from '../../editor/types';
import { generateId } from '../../utils/generateId';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import { getDefaultParagraphBlock } from '../Editor/defaultValue';
import s from './Block.module.scss';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { CSSProperties, useState } from 'react';
import { BlockOptions } from './BlockOptions';

type ActionsProps = {
  block: YooptaChildrenValue;
  editor: YooEditor;
  dragHandleProps: any;
  showActions: boolean;
};

const BlockActions = ({ block, editor, dragHandleProps, showActions }: ActionsProps) => {
  const [blockOptions, setBlockOptions] = useState<CSSProperties | null>(null);
  const isBlockOptionsOpen = !!blockOptions;

  const { setActivatorNodeRef, attributes, listeners } = dragHandleProps;

  const onPlusClick = () => {
    const defaultBlock = getDefaultParagraphBlock(generateId());
    const nextPath = [block.meta.order + 1];

    editor.setSelection([block.meta.order]);
    editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
  };

  const onSelectBlock = (event: React.MouseEvent) => {
    event.stopPropagation();

    const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });
    editor.focusBlock(block.id);

    if (!slate) return;

    setTimeout(() => {
      ReactEditor.blur(slate);
      ReactEditor.deselect(slate);
      Transforms.deselect(slate);

      editor.setBlockSelected([block.meta.order], { only: true });
      editor.setSelection([block.meta.order]);
    }, 10);

    setBlockOptions(null);
  };

  return (
    <div contentEditable={false} className={cx(s.actions, { [s.hovered]: showActions }, 'yoopta-element-actions')}>
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
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        onClick={onSelectBlock}
      >
        <DragIcon />
      </button>
      {/* 
      <BlockOptions
        isOpen={isBlockOptionsOpen}
        onOpenChange={setBlockOptions}
        trigger={
          <button
            type="button"
            className={cx(s.actionButton, 'yoopta-element-actions-drag')}
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            onClick={onSelectBlock}
          >
            <DragIcon />
          </button>
        }
      /> */}
    </div>
  );
};

export { BlockActions };

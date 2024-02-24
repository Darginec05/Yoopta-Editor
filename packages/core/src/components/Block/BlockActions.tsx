import cx from 'classnames';
import { YooEditor } from '../../editor/types';
import { generateId } from '../../utils/generateId';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import { getDefaultParagraphBlock } from '../Editor/defaultValue';
import s from './Block.module.scss';

type ActionsProps = {
  plugin: any;
  editor: YooEditor;
  dragHandleProps: any;
  showActions: boolean;
};

const BlockActions = ({ plugin, editor, dragHandleProps, showActions }: ActionsProps) => {
  const { setActivatorNodeRef, attributes, listeners } = dragHandleProps;

  const onPlusClick = () => {
    const defaultBlock = getDefaultParagraphBlock(generateId());

    const nextPath = [plugin.meta.order + 1];

    editor.setSelection([plugin.meta.order]);
    editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
  };

  const onSelectBlock = (event: React.MouseEvent) => {
    event.stopPropagation();

    editor.setSelection([plugin.meta.order]);
    editor.setBlockSelected([plugin.meta.order], { only: true });
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
    </div>
  );
};

export { BlockActions };

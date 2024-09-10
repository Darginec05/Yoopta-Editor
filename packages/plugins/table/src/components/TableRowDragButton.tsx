import { Elements, SlateElement, YooEditor } from '@yoopta/editor';
import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { useState } from 'react';
import { TableRowOptions } from './TableRowOptions';
import DragIcon from '../icons/drag.svg';
import { Editor, Element, Path, Transforms } from 'slate';
import { EDITOR_TO_SELECTION_SET } from '../utils/weakMaps';

type TableRowProps = {
  editor: YooEditor;
  blockId: string;
  tdElement: SlateElement;
};

const TableRowDragButton = ({ editor, blockId, tdElement }: TableRowProps) => {
  const [isTableRowActionsOpen, setIsTableRowActionsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'right-start',
    open: isTableRowActionsOpen,
    onOpenChange: setIsTableRowActionsOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
  });

  const onClick = () => {
    if (editor.readOnly) return;

    const slate = editor.blockEditorsMap[blockId];
    const tdElementPath = Elements.getElementPath(editor, blockId, tdElement);
    if (!tdElementPath) return;
    Transforms.select(slate, { path: tdElementPath.concat([0]), offset: 0 });

    setIsTableRowActionsOpen(true);
  };

  const onClose = () => {
    setIsTableRowActionsOpen(false);
  };

  return (
    <>
      <TableRowOptions
        refs={refs}
        isOpen={isTableRowActionsOpen}
        onClose={onClose}
        style={floatingStyles}
        editor={editor}
        blockId={blockId}
        tdElement={tdElement}
      />
      <button
        ref={refs.setReference}
        type="button"
        onClick={onClick}
        contentEditable={false}
        className="yoopta-table-row-button"
        style={isTableRowActionsOpen ? { opacity: 1 } : undefined}
      >
        <DragIcon className="w-[14px] h-[14px] block flex-shrink-0" style={{ transform: 'rotate(0deg)' }} />
      </button>
    </>
  );
};

export { TableRowDragButton };

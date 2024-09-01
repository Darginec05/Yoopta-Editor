import { Elements, SlateElement, YooEditor } from '@yoopta/editor';
import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { useState } from 'react';
import { TableRowOptions } from './TableRowOptions';
import DragIcon from '../icons/drag.svg';
import { Transforms } from 'slate';

type TableRowProps = {
  editor: YooEditor;
  blockId: string;
  trElement: SlateElement;
  tdElement: SlateElement;
};

const TableRowDragButton = ({ editor, blockId, trElement, tdElement }: TableRowProps) => {
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

    if (tdElementPath) {
      Transforms.select(slate, { offset: 0, path: [...tdElementPath, 0] });
    }

    const trEl = document.querySelector(`[data-element-id="${trElement.id}"]`);
    trEl?.classList.add('yoopta-table-row-selected');

    setIsTableRowActionsOpen(true);
  };

  const onClose = () => {
    const trEl = document.querySelector(`[data-element-id="${trElement.id}"]`);
    trEl?.classList.remove('yoopta-table-row-selected');

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
        element={trElement}
      />
      <button
        ref={refs.setReference}
        type="button"
        onClick={onClick}
        contentEditable={false}
        className="yoopta-table-row-button"
      >
        <DragIcon className="w-[14px] h-[14px] block flex-shrink-0" style={{ transform: 'rotate(0deg)' }} />
      </button>
    </>
  );
};

export { TableRowDragButton };

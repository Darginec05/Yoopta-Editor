import { Elements, SlateElement, YooEditor } from '@yoopta/editor';
import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { useState } from 'react';
import DragIcon from '../icons/drag.svg';
import { TableColumnOptions } from './TableColumnOptions';
import { Transforms } from 'slate';

type TableRowProps = {
  editor: YooEditor;
  blockId: string;
  tdElement: SlateElement;
};

const TableColumnDragButton = ({ editor, blockId, tdElement }: TableRowProps) => {
  const [isTableColumnActionsOpen, setIsTableColumnActionsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    open: isTableColumnActionsOpen,
    onOpenChange: setIsTableColumnActionsOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
  });

  const onClick = () => {
    if (editor.readOnly) return;
    const slate = editor.blockEditorsMap[blockId];
    const tdElementPath = Elements.getElementPath(editor, blockId, tdElement);

    if (tdElementPath) {
      Transforms.select(slate, { offset: 0, path: [...tdElementPath, 0] });
    }

    const tdIndex = tdElementPath?.[tdElementPath.length - 1];
    const tableRowElements = document.querySelectorAll(`[data-yoopta-block-id="${blockId}"] .yoopta-table tr`);

    if (tableRowElements) {
      tableRowElements.forEach((rowEl) => {
        const dataCells = rowEl.childNodes as NodeListOf<HTMLElement>;
        if (dataCells) {
          dataCells.forEach((cell, cellIndex) => {
            if (cellIndex === tdIndex) {
              cell.classList.add('data-cell-selected');
            }
          });
        }
      });
    }

    setIsTableColumnActionsOpen(true);
  };

  const onClose = () => {
    const tdElementPath = Elements.getElementPath(editor, blockId, tdElement);

    const tdIndex = tdElementPath?.[tdElementPath.length - 1];
    const tableRowElements = document.querySelectorAll(`[data-yoopta-block-id="${blockId}"] .yoopta-table tr`);

    if (tableRowElements) {
      tableRowElements.forEach((rowEl) => {
        const dataCells = rowEl.childNodes as NodeListOf<HTMLElement>;
        if (dataCells) {
          dataCells.forEach((cell, cellIndex) => {
            if (cellIndex === tdIndex) {
              cell.classList.remove('data-cell-selected');
            }
          });
        }
      });
    }

    setIsTableColumnActionsOpen(false);
  };

  return (
    <>
      <TableColumnOptions
        refs={refs}
        isOpen={isTableColumnActionsOpen}
        onClose={onClose}
        style={floatingStyles}
        editor={editor}
        blockId={blockId}
        element={tdElement}
      />
      <button
        type="button"
        ref={refs.setReference}
        onClick={onClick}
        contentEditable={false}
        className="yoopta-table-column-button"
      >
        <DragIcon />
      </button>
    </>
  );
};

export { TableColumnDragButton };

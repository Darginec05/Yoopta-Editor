import { Elements, SlateElement, YooEditor } from '@yoopta/editor';
import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { useState } from 'react';
import { TableRowOptions } from './TableRowOptions';
import DragIcon from '../icons/drag.svg';
import { TableColumnOptions } from './TableColumnOptions';
import { Transforms } from 'slate';
import { TableTransforms } from '../api';

type TableRowProps = {
  editor: YooEditor;
  blockId: string;
  trElement: SlateElement;
  tdElement: SlateElement;
};

const TableColumnDragButton = ({ editor, blockId, trElement, tdElement }: TableRowProps) => {
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
    const tableRowElements = document.querySelectorAll(`.yoopta-table tr`);

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
    const tableRowElements = document.querySelectorAll(`.yoopta-table tr`);

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
        className="yoopta-button opacity-0 group-hover:opacity-100 cursor-pointer select-none transition-opacity duration-[150ms] cursor-pointer fill-[rgba(55,53,47,0.35)] absolute flex items-center justify-center rounded-[4px] bg-white shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_2px_4px] z-[4] top-[-8px] left-[calc(50%-13px)] h-[16px] w-[26px] p-[2px_4px]"
      >
        <DragIcon />
      </button>
    </>
  );
};

export { TableColumnDragButton };

import { Elements, SlateElement, YooEditor } from '@yoopta/editor';
import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { useState } from 'react';
import DragIcon from '../icons/drag.svg';
import { TableColumnOptions } from './TableColumnOptions';
import { Editor, Path, Transforms } from 'slate';
import { EDITOR_TO_SELECTION_SET } from '../utils/weakMaps';

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
    if (!tdElementPath) return;

    Transforms.select(slate, { offset: 0, path: [...tdElementPath, 0] });
    const tableElement = Elements.getElement(editor, blockId, { type: 'table', path: [0] });
    if (!tableElement) return;

    const firstEntry = Editor.first(slate, tdElementPath);
    const lastEntry = Editor.last(slate, [0]);

    if (!firstEntry || !lastEntry) return;

    const [, firstPath] = firstEntry;
    const [, lastPath] = lastEntry;

    Transforms.setSelection(slate, {
      anchor: { path: firstPath, offset: 0 },
      focus: { path: lastPath, offset: 0 },
    });

    setIsTableColumnActionsOpen(true);
  };

  const onClose = () => {
    const slate = editor.blockEditorsMap[blockId];

    EDITOR_TO_SELECTION_SET.delete(slate);
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

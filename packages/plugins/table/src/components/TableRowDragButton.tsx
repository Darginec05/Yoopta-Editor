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

    Transforms.select(slate, { offset: 0, path: [...tdElementPath, 0] });

    const parentPath = Path.parent(tdElementPath);

    const firstEntry = Editor.first(slate, parentPath);
    const lastEntry = Editor.last(slate, parentPath);

    if (!firstEntry || !lastEntry) return;

    const [, firstPath] = firstEntry;
    const [, lastPath] = lastEntry;

    Transforms.setSelection(slate, {
      anchor: { path: firstPath, offset: 0 },
      focus: { path: lastPath, offset: 0 },
    });

    setIsTableRowActionsOpen(true);
  };

  const onClose = () => {
    const slate = editor.blockEditorsMap[blockId];
    EDITOR_TO_SELECTION_SET.delete(slate);
    setIsTableRowActionsOpen(false);

    const tdElementPath = Elements.getElementPath(editor, blockId, tdElement);
    if (!tdElementPath) return;

    const parentPath = Path.parent(tdElementPath);
    const firstEntry = Editor.first(slate, parentPath);
    if (!firstEntry) return;
    const [, firstPath] = firstEntry;

    Transforms.setSelection(slate, {
      anchor: { path: firstPath, offset: 0 },
      focus: { path: firstPath, offset: 0 },
    });
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
      >
        <DragIcon className="w-[14px] h-[14px] block flex-shrink-0" style={{ transform: 'rotate(0deg)' }} />
      </button>
    </>
  );
};

export { TableRowDragButton };

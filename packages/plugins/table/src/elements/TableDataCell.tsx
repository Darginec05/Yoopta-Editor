import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useState } from 'react';
import { ResizeHandle } from '../components/ResizeHandle';
import { TableColumnDragButton } from '../components/TableColumnDragButton';
import { TableRowDragButton } from '../components/TableRowDragButton';
import { TableCellElement, TableCellProps } from '../types';

const TableDataCell = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const tableElement = Elements.getElement(editor, blockId, { type: 'table' });
  const path = Elements.getElementPath(editor, blockId, element);
  const tableRowElement = Elements.getElement(editor, blockId, { type: 'table-row', path: path?.slice(0, -1) });

  const [width, setWidth] = useState<number>(element.props?.width || 249);

  const isColumnAsHeader = tableElement?.props?.headerColumn;
  const isRowAsHeader = tableElement?.props?.headerRow;

  const isFirstDataCell = path?.[path.length - 1] === 0;
  const isFirstRow = path?.[path.length - 2] === 0;

  let isDataCellAsHeader = false;

  if ((isFirstDataCell && isColumnAsHeader) || (isRowAsHeader && isFirstRow)) {
    isDataCellAsHeader = true;
  }

  const onResize = (newWidth) => {
    console.log('width - newWidth', newWidth + width);

    setWidth(newWidth + width);
  };

  const onResizeStop = (newWidth) => {
    console.log('onResizeStop', newWidth + width);
    Elements.updateElement<'table-data-cell', TableCellProps>(
      editor,
      blockId,
      { props: { width: newWidth + width }, type: 'table-data-cell' },
      { path },
    );
  };

  const Node = isDataCellAsHeader ? 'th' : 'td';
  const style = isFirstRow ? { minWidth: `${width}px`, maxWidth: `${width}px` } : undefined;

  return (
    <Node
      style={style}
      className="group text-inherit fill-current border border-[rgb(233,233,231)] relative align-top text-left min-h-[32px]"
    >
      <div
        className="max-w-full w-full whitespace-pre-wrap break-words caret-[rgb(55,53,47)] p-[7px_9px] bg-transparent text-[14px] leading-[20px]"
        {...attributes}
      >
        {children}
      </div>
      {!editor.readOnly && isFirstRow && <ResizeHandle onResize={onResize} onResizeStop={onResizeStop} />}
      {!editor.readOnly && isFirstRow && tableRowElement && (
        <TableColumnDragButton editor={editor} blockId={blockId} trElement={tableRowElement} tdElement={element} />
      )}
      {!editor.readOnly && isFirstDataCell && tableRowElement && (
        <TableRowDragButton editor={editor} blockId={blockId} trElement={tableRowElement} tdElement={element} />
      )}
    </Node>
  );
};

export { TableDataCell };

import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { Editor, Element, NodeEntry, Transforms } from 'slate';
import { ResizeHandle } from '../components/ResizeHandle';
import { TableColumnDragButton } from '../components/TableColumnDragButton';
import { TableRowDragButton } from '../components/TableRowDragButton';
import { TableElement } from '../types';

const TableDataCell = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const tableElement = Elements.getElement(editor, blockId, { type: 'table' });
  const path = Elements.getElementPath(editor, blockId, element);
  const tableRowElement = Elements.getElement(editor, blockId, { type: 'table-row', path: path?.slice(0, -1) });

  const columnIndex = path?.[path.length - 1] || 0;

  const isColumnAsHeader = tableElement?.props?.headerColumn;
  const isRowAsHeader = tableElement?.props?.headerRow;

  const isFirstDataCell = path?.[path.length - 1] === 0;
  const isFirstRow = path?.[path.length - 2] === 0;

  let isDataCellAsHeader = false;

  if ((isFirstDataCell && isColumnAsHeader) || (isRowAsHeader && isFirstRow)) {
    isDataCellAsHeader = true;
  }

  const onResize = (newWidth) => {
    const slate = editor.blockEditorsMap[blockId];

    const updatedColumns = tableElement?.props.columns.map((col, index) => {
      if (index === columnIndex) return { ...col, width: newWidth };
      return col;
    });

    Transforms.setNodes(
      slate,
      { props: { ...tableElement?.props, columns: updatedColumns } },
      { at: [0], match: (node) => Element.isElement(node) && node.type === 'table' },
    );
  };

  const Node = isDataCellAsHeader ? 'th' : 'td';
  const style = {
    maxWidth: tableElement?.props.columns[columnIndex]?.width || 150,
    minWidth: tableElement?.props.columns[columnIndex]?.width || 150,
  };

  return (
    <Node
      scope={isDataCellAsHeader ? 'col' : undefined}
      style={style}
      colSpan={1}
      rowSpan={1}
      className="yoopta-table-data-cell"
    >
      <div className="yoopta-table-data-cell-content" {...attributes}>
        {children}
      </div>
      {!editor.readOnly && isFirstRow && (
        <ResizeHandle
          onResize={onResize}
          rows={tableElement?.children.length}
          tableElement={tableElement}
          columnIndex={columnIndex}
        />
      )}
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

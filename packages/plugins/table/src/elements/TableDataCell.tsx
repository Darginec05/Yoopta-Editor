import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { ResizeHandle } from '../components/ResizeHandle';
import { TableColumnDragButton } from '../components/TableColumnDragButton';
import { TableRowDragButton } from '../components/TableRowDragButton';
import { TableTransforms } from '../transforms';
import { TableCellElement } from '../types';
import { EDITOR_TO_SELECTION_SET } from '../utils/weakMaps';

const TableDataCell = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const slate = editor.blockEditorsMap[blockId];

  const path = Elements.getElementPath(editor, blockId, element);

  const selected = EDITOR_TO_SELECTION_SET.get(slate)?.has(element as TableCellElement);

  const columnIndex = path?.[path.length - 1] || 0;
  const elementWidth = element?.props?.width || 200;

  const isFirstDataCell = path?.[path.length - 1] === 0;
  const isFirstRow = path?.[path.length - 2] === 0;

  let isDataCellAsHeader = element?.props?.asHeader || false;

  const onResize = (newWidth: number) => {
    TableTransforms.updateColumnWidth(editor, blockId, columnIndex, newWidth);
  };

  const Node = isDataCellAsHeader ? 'th' : 'td';
  const style = {
    maxWidth: elementWidth,
    minWidth: elementWidth,
    backgroundColor: selected ? '#37352f14' : undefined,
  };

  const className = isDataCellAsHeader
    ? 'yoopta-table-data-cell yoopta-table-data-cell-head'
    : 'yoopta-table-data-cell';

  return (
    <Node scope={isDataCellAsHeader ? 'col' : undefined} style={style} colSpan={1} rowSpan={1} className={className}>
      <div className="yoopta-table-data-cell-content" {...attributes}>
        {children}
      </div>
      {!editor.readOnly && isFirstRow && (
        <ResizeHandle onResize={onResize} tdWidth={elementWidth} columnIndex={columnIndex} />
      )}
      {!editor.readOnly && isFirstRow && (
        <TableColumnDragButton editor={editor} blockId={blockId} tdElement={element} />
      )}
      {!editor.readOnly && isFirstDataCell && (
        <TableRowDragButton editor={editor} blockId={blockId} tdElement={element} />
      )}
    </Node>
  );
};

export { TableDataCell };

import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { useMemo } from 'react';
import { TableBlockOptions } from '../components/TableBlockOptions';
import { TableColumn, TableElement } from '../types';
import { EDITOR_TO_SELECTION_SET } from '../utils/weakMaps';

const Table = ({ attributes, children, blockId, element, HTMLAttributes }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const slate = editor.blockEditorsMap[blockId];
  const blockData = useBlockData(blockId);
  const isReadOnly = editor.readOnly;

  const isSelecting = EDITOR_TO_SELECTION_SET.get(slate);

  // const colgroup = useMemo(() => {
  //   const columns: TableColumn[] = element.props.columns;
  //   if (element.props.columns) return null;

  //   return (
  //     <colgroup>
  //       {columns?.map((col, i) => (
  //         <col key={col.index || i} width={col.width} />
  //       ))}
  //     </colgroup>
  //   );
  // }, [element.props.columns]);

  return (
    <div className="yoopta-table-block">
      <table className={`yoopta-table ${!!isSelecting && 'yoopta-table-selecting'}`}>
        {/* {colgroup} */}
        <tbody {...attributes}>{children}</tbody>
      </table>
      {!isReadOnly && <TableBlockOptions block={blockData} editor={editor} table={element as TableElement} />}
    </div>
  );
};

export { Table };

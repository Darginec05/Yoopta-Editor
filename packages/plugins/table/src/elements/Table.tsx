import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { useMemo } from 'react';
import { TableBlockOptions } from '../components/TableBlockOptions';
import { TableColumn } from '../types';

const Table = ({ attributes, children, blockId, element, HTMLAttributes }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const blockData = useBlockData(blockId);
  const isReadOnly = editor.readOnly;

  const colgroup = useMemo(() => {
    const columns: TableColumn[] = element.props.columns;
    if (!element.props.columns) return null;

    return (
      <colgroup>
        {columns?.map((col, i) => (
          <col key={col.index || i} width={col.width} />
        ))}
      </colgroup>
    );
  }, [element.props.columns]);

  return (
    <div className="yoopta-table-block">
      <table className="yoopta-table">
        {colgroup}
        <tbody {...attributes}>{children}</tbody>
      </table>
      {!isReadOnly && <TableBlockOptions block={blockData} editor={editor} props={element.props} />}
    </div>
  );
};

export { Table };

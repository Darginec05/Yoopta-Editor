import { Elements, PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { useMemo } from 'react';
import { InsertColumn } from '../components/InsertColumn';
import { InsertRow } from '../components/InsertRow';
import { TableBlockOptions } from '../components/TableBlockOptions';

const Table = ({ attributes, children, blockId, element, HTMLAttributes }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const blockData = useBlockData(blockId);
  const isReadOnly = editor.readOnly;

  const tableCells = Elements.getElementChildren(editor, blockId, { type: 'table-row' });

  const colgroup = useMemo(() => {
    if (!tableCells) return null;

    return (
      <colgroup>
        {tableCells?.map((col) => (
          <col key={col.id} />
        ))}
      </colgroup>
    );
  }, [tableCells?.length]);

  return (
    <div className="w-full pt-2 pb-4 yoopta-table">
      <div className="relative">
        <table className="border-collapse border-spacing-0 w-full caption-bottom text-sm">
          {colgroup}
          <tbody {...attributes}>{children}</tbody>
        </table>
        {!isReadOnly && (
          <>
            {/* <InsertColumn blockId={blockId} /> */}
            <InsertRow blockId={blockId} />
          </>
        )}
      </div>
      {!isReadOnly && <TableBlockOptions block={blockData} editor={editor} props={element.props} />}
    </div>
  );
};

export { Table };

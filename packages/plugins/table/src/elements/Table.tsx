import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { useMemo } from 'react';
import { TableBlockOptions } from '../components/TableBlockOptions';
import { TableElement } from '../types';
import { EDITOR_TO_SELECTION_SET } from '../utils/weakMaps';

const Table = ({ attributes, children, blockId, element, HTMLAttributes }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const slate = editor.blockEditorsMap[blockId];
  const blockData = useBlockData(blockId);
  const isReadOnly = editor.readOnly;

  const isSelecting = EDITOR_TO_SELECTION_SET.get(slate);

  return (
    <div className="yoopta-table-block">
      <table {...HTMLAttributes} className={`yoopta-table ${!!isSelecting ? 'yoopta-table-selecting' : ''}`}>
        <tbody {...attributes}>{children}</tbody>
      </table>
      {!isReadOnly && <TableBlockOptions block={blockData} editor={editor} table={element as TableElement} />}
    </div>
  );
};

export { Table };

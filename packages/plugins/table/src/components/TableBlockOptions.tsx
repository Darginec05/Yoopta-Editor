import { Blocks, Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { Sheet, TableProperties, CheckIcon, Table } from 'lucide-react';
import { TableCommands } from '../commands';
import { TableElement, TableElementProps } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  table: TableElement;
};

const TableBlockOptions = ({ editor, block, table }: Props) => {
  const tableProps = table.props;

  const isHeaderRowEnabled = tableProps?.headerRow;
  const isHeaderColumnEnabled = tableProps?.headerColumn;

  const onSwitchHeaderRow = () => {
    TableCommands.toggleHeaderRow(editor, block.id);
  };

  const onSwitchHeaderColumn = () => {
    TableCommands.toggleHeaderColumn(editor, block.id);
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-table-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button justify-between" onClick={onSwitchHeaderRow}>
            <span className="flex">
              <Sheet width={16} height={16} className="w-4 h-4 mr-2" />
              Header row
            </span>
            {isHeaderRowEnabled && <CheckIcon width={16} height={16} className="w-4 h-4" />}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button justify-between" onClick={onSwitchHeaderColumn}>
            <span className="flex">
              <TableProperties width={16} height={16} className="w-4 h-4 mr-2 rotate-180" />
              Header column
            </span>
            {isHeaderColumnEnabled && <CheckIcon width={16} height={16} className="w-4 h-4" />}
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { TableBlockOptions };

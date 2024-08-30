import { Blocks, Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { Sheet, TableProperties, CheckIcon } from 'lucide-react';
import { TableElementProps } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: TableElementProps;
};

const TableBlockOptions = ({ editor, block, props: tableProps }: Props) => {
  const isHeaderRowEnabled = tableProps?.headerRow;
  const isHeaderColumnEnabled = tableProps?.headerColumn;

  const onSwitchHeaderRow = () => {
    Elements.updateElement<string, TableElementProps>(editor, block.id, {
      type: 'table',
      props: { headerRow: !isHeaderRowEnabled },
    });
  };

  const onSwitchHeaderColumn = () => {
    Elements.updateElement<string, TableElementProps>(editor, block.id, {
      type: 'table',
      props: { headerColumn: !isHeaderColumnEnabled },
    });
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

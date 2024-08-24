import { Elements, SlateElement, UI, YooEditor } from '@yoopta/editor';

import { CSSProperties } from 'react';
import { Path } from 'slate';
import { TrashIcon, ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { TABLE_API } from '../api';

const { BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptions } = UI;

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  refs: any;
  style: CSSProperties;
  children?: React.ReactNode;
  actions?: ['delete', 'duplicate', 'turnInto', 'copy'] | null;
} & {
  editor: YooEditor;
  blockId: string;
  element: SlateElement;
};

const TableRowOptions = ({ editor, blockId, element, onClose, ...props }: Props) => {
  const insertRowBefore = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    TABLE_API.insertRow(editor, blockId, { path: path });
    onClose();
  };

  const insertRowAfter = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    let nextPath;
    if (path) nextPath = Path.next(path);

    TABLE_API.insertRow(editor, blockId, { path: nextPath });
    onClose();
  };

  const deleteRow = () => {
    TABLE_API.deleteRow(editor, blockId, { element });
    onClose();
  };

  return (
    <BlockOptions {...props} onClose={onClose} actions={null}>
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertRowBefore}>
            <ArrowUpIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Insert above
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertRowAfter}>
            <ArrowDownIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Insert below
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={deleteRow}>
            <TrashIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Delete row
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </BlockOptions>
  );
};

export { TableRowOptions };

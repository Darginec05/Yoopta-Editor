import { Elements, SlateElement, UI, YooEditor } from '@yoopta/editor';

import { CSSProperties } from 'react';
import { Path, Transforms } from 'slate';
import { TrashIcon, ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
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

const TableColumnOptions = ({ editor, blockId, element, onClose, ...props }: Props) => {
  const insertColumnBefore = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    console.log('deleteColumnBefore path', path);
    // TABLE_API.deleteColumn(editor, blockId);
    onClose();
  };

  const insertColumnAfter = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    console.log('insertColumnAfter path', path);
    // TABLE_API.deleteColumn(editor, blockId);
    onClose();
  };

  const deleteColumn = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    if (!path) return;

    TABLE_API.deleteColumn(editor, blockId, { index: path[path.length - 1] });

    onClose();
  };

  return (
    <BlockOptions {...props} onClose={onClose} actions={null}>
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertColumnBefore}>
            <ArrowLeftIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Insert column before
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertColumnAfter}>
            <ArrowRightIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Insert column after
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={deleteColumn}>
            <TrashIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Delete column
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </BlockOptions>
  );
};

export { TableColumnOptions };

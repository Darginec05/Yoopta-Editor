import { Elements, SlateElement, UI, YooEditor } from '@yoopta/editor';

import { CSSProperties } from 'react';
import { Editor, Element, Path } from 'slate';
import { TrashIcon, MoveDownIcon, MoveUpIcon, CornerUpRight, CornerDownRight } from 'lucide-react';
import { TableTransforms } from '../transforms';

const { BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptions, BlockOptionsSeparator } = UI;

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
    TableTransforms.insertTableRow(editor, blockId, { path: path });
    onClose();
  };

  const insertRowAfter = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    let nextPath;
    if (path) nextPath = Path.next(path);

    TableTransforms.insertTableRow(editor, blockId, { path: nextPath });
    onClose();
  };

  const deleteTableRow = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    TableTransforms.deleteTableRow(editor, blockId, { path });
    onClose();
  };

  const moveRowDown = () => {
    let path = Elements.getElementPath(editor, blockId, element);

    const slate = editor.blockEditorsMap[blockId];
    const nextElementEntry = Editor.next(slate, {
      at: path,
      match: (n) => Element.isElement(n) && n.type === 'table-row',
    });

    if (!nextElementEntry) return onClose();
    TableTransforms.moveTableRow(editor, blockId, { from: path!, to: nextElementEntry[1] });
  };

  const moveRowUp = () => {
    let path = Elements.getElementPath(editor, blockId, element);

    const slate = editor.blockEditorsMap[blockId];
    const prevElementEntry = Editor.previous(slate, {
      at: path,
      match: (n) => Element.isElement(n) && n.type === 'table-row',
    });

    if (!prevElementEntry) return onClose();
    TableTransforms.moveTableRow(editor, blockId, { from: path!, to: prevElementEntry[1] });
  };

  return (
    <BlockOptions {...props} onClose={onClose} actions={null}>
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertRowBefore}>
            <CornerUpRight className="yoopta-table-icons" />
            Insert above
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertRowAfter}>
            <CornerDownRight className="yoopta-table-icons" />
            Insert below
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={moveRowUp}>
            <MoveUpIcon className="yoopta-table-icons" />
            Move up
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={moveRowDown}>
            <MoveDownIcon className="yoopta-table-icons" />
            Move down
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={deleteTableRow}>
            <TrashIcon className="yoopta-table-icons" />
            Delete row
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </BlockOptions>
  );
};

export { TableRowOptions };

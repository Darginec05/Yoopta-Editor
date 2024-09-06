import { Elements, SlateElement, UI, YooEditor } from '@yoopta/editor';

import { CSSProperties } from 'react';
import { Editor, Element, Path, Transforms } from 'slate';
import { TrashIcon, ArrowRightIcon, ArrowLeftIcon, MoveRightIcon, MoveLeftIcon } from 'lucide-react';
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

const TableColumnOptions = ({ editor, blockId, element, onClose, ...props }: Props) => {
  const insertColumnBefore = () => {
    TableTransforms.insertTableColumn(editor, blockId, { insertMode: 'before' });
    onClose();
  };

  const insertColumnAfter = () => {
    TableTransforms.insertTableColumn(editor, blockId, { insertMode: 'after' });
    onClose();
  };

  const deleteTableColumn = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    if (!path) return;

    TableTransforms.deleteTableColumn(editor, blockId, { path });
    onClose();
  };

  const moveColumnRight = () => {
    const slate = editor.blockEditorsMap[blockId];
    const tdElementEntry = Elements.getElementEntry(editor, blockId, {
      type: 'table-data-cell',
      path: slate.selection,
    });

    if (tdElementEntry) {
      const [, tdPath] = tdElementEntry;

      const nextTdEntry = Editor.next(slate, {
        at: tdPath,
        match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
      });

      if (!nextTdEntry) return;

      const [, nextTdPath] = nextTdEntry;
      TableTransforms.moveTableColumn(editor, blockId, { from: tdPath, to: nextTdPath });
    }
  };

  const moveColumnLeft = () => {
    const slate = editor.blockEditorsMap[blockId];

    const tdElementEntry = Elements.getElementEntry(editor, blockId, {
      type: 'table-data-cell',
      path: slate.selection,
    });

    if (tdElementEntry) {
      const [, tdPath] = tdElementEntry;

      const prevTdEntry = Editor.previous(slate, {
        at: tdPath,
        match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
      });

      if (!prevTdEntry) return;

      const [, prevTdPath] = prevTdEntry;
      TableTransforms.moveTableColumn(editor, blockId, { from: tdPath, to: prevTdPath });
    }
  };

  return (
    <BlockOptions {...props} onClose={onClose} actions={null}>
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertColumnBefore}>
            <ArrowLeftIcon className="yoopta-table-icons" />
            Insert left
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertColumnAfter}>
            <ArrowRightIcon className="yoopta-table-icons" />
            Insert right
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={moveColumnRight}>
            <MoveRightIcon className="yoopta-table-icons" />
            Move right
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={moveColumnLeft}>
            <MoveLeftIcon className="yoopta-table-icons" />
            Move left
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />

        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={deleteTableColumn}>
            <TrashIcon className="yoopta-table-icons" />
            Delete
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </BlockOptions>
  );
};

export { TableColumnOptions };

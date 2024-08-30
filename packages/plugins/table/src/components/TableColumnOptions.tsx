import { Elements, SlateElement, UI, YooEditor } from '@yoopta/editor';

import { CSSProperties } from 'react';
import { Editor, Element, Path, Transforms } from 'slate';
import { TrashIcon, ArrowRightIcon, ArrowLeftIcon, MoveRightIcon, MoveLeftIcon } from 'lucide-react';
import { TABLE_API } from '../api';

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
    const path = Elements.getElementPath(editor, blockId, element);
    if (!path) return;

    const tdElementEntry = Elements.getElementEntry(editor, blockId, {
      type: 'table-data-cell',
    });

    if (!tdElementEntry) return;
    const [, tdPath] = tdElementEntry;

    TABLE_API.insertColumn(editor, blockId, { path: tdPath });
    onClose();
  };

  const insertColumnAfter = () => {
    const path = Elements.getElementPath(editor, blockId, element);
    if (!path) return;

    const tdElementEntry = Elements.getElementEntry(editor, blockId, {
      type: 'table-data-cell',
    });

    if (!tdElementEntry) return;
    const [, tdPath] = tdElementEntry;

    TABLE_API.insertColumn(editor, blockId, { path: Path.next(tdPath) });
    onClose();
  };

  const deleteColumn = () => {
    let path = Elements.getElementPath(editor, blockId, element);
    if (!path) return;

    TABLE_API.deleteColumn(editor, blockId, { path });
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
      TABLE_API.moveColumn(editor, blockId, { from: tdPath, to: nextTdPath });
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
      TABLE_API.moveColumn(editor, blockId, { from: tdPath, to: prevTdPath });
    }
  };

  return (
    <BlockOptions {...props} onClose={onClose} actions={null}>
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertColumnBefore}>
            <ArrowLeftIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Insert left
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={insertColumnAfter}>
            <ArrowRightIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Insert right
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={moveColumnRight}>
            <MoveRightIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Move right
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={moveColumnLeft}>
            <MoveLeftIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Move left
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />

        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button" onClick={deleteColumn}>
            <TrashIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
            Delete
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </BlockOptions>
  );
};

export { TableColumnOptions };

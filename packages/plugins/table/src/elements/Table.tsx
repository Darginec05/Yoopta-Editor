import {
  Elements,
  generateId,
  PluginElementRenderProps,
  SlateElement,
  useYooptaEditor,
  useYooptaReadOnly,
} from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';
import PlusIcon from '../icons/plus.svg';

const PlusRowButton = ({ blockId }) => {
  const editor = useYooptaEditor();

  const onAddRow = (e) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'highest',
      });

      const tableRows = Array.from(tableRowEntries);
      const lastRowPath = tableRows[tableRows.length - 1][1];
      const newRowPath = Path.next(lastRowPath);

      const firstRowElement = tableRows[0][0];

      const newRow: SlateElement = {
        id: generateId(),
        type: 'table-row',
        children: firstRowElement.children.map((cell) => {
          return {
            id: generateId(),
            type: 'table-data-cell',
            children: [{ text: '' }],
          };
        }),
        // children: [
        //   { id: generateId(), type: 'table-data-cell', children: [{ text: '' }], props: { nodeType: 'block' } },
        //   { id: generateId(), type: 'table-data-cell', children: [{ text: '' }], props: { nodeType: 'block' } },
        //   { id: generateId(), type: 'table-data-cell', children: [{ text: '' }], props: { nodeType: 'block' } },
        //   { id: generateId(), type: 'table-data-cell', children: [{ text: '' }], props: { nodeType: 'block' } },
        // ],
        props: {
          nodeType: 'block',
        },
      };

      Transforms.insertNodes(slate, newRow, { at: newRowPath });
    });
  };

  return (
    <div contentEditable={false} className="absolute flex bottom-[-18px] right-0 left-0">
      <div className="flex w-full h-full opacity-100 transition-opacity duration-[150ms] delay-[50ms]">
        <button
          type="button"
          className="yoopta-button cursor-pointer transition-[background] duration-[20ms] ease-in cursor-col-resize flex-[1_1_0%] w-[16px] h-[16px] rounded-[4px] overflow-hidden"
          onClick={onAddRow}
        >
          <div className="h-full w-full flex items-center justify-center bg-[rgba(55,53,47,0.06)]">
            <PlusIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

const PlusColumnButton = ({ blockId }) => {
  const editor = useYooptaEditor();

  const onAddColumn = (e) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const elementEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'lowest',
      });

      for (const [tableRowEl, tableRowPath] of elementEntries) {
        const parent = Elements.getElement(editor, blockId, { type: 'table-head', path: tableRowPath });

        const newDataCell: SlateElement<'table-data-cell' | 'table-head-cell'> = {
          id: generateId(),
          type: parent?.type === 'table-head' ? 'table-head-cell' : 'table-data-cell',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(slate, newDataCell, { at: [...tableRowPath, tableRowEl.children.length] });
      }
    });
  };

  return (
    <div contentEditable={false} className="absolute flex right-[-18px] top-0 bottom-0">
      <div className="flex w-full h-full opacity-100 transition-opacity duration-[150ms] delay-[50ms]">
        <button
          type="button"
          className="yoopta-button cursor-pointer transition-[background] duration-[20ms] ease-in cursor-col-resize flex-[1_1_0%] w-[16px] h-full rounded-[4px] overflow-hidden"
          onClick={onAddColumn}
        >
          <div className="h-full w-full flex items-center justify-center bg-[rgba(55,53,47,0.06)]">
            <PlusIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

const Table = ({ attributes, children, blockId }: PluginElementRenderProps) => {
  const isReadOnly = useYooptaReadOnly();

  return (
    <div className="w-full overflow-auto pb-[30px] pr-[30px]">
      <div className="relative">
        <table className="border-collapse border-spacing-0 w-full caption-bottom text-sm" {...attributes}>
          {children}
        </table>
        {!isReadOnly && (
          <>
            <PlusColumnButton blockId={blockId} />
            <PlusRowButton blockId={blockId} />
          </>
        )}
      </div>
    </div>
  );
};

export { Table };

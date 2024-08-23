import { Elements, generateId, SlateElement, YooEditor } from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';

export const TABLE_API = {
  insertColumn: (editor: YooEditor, blockId: string) => {
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
  },
  insertRow: (editor: YooEditor, blockId: string) => {
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
        props: {
          nodeType: 'block',
        },
      };

      Transforms.insertNodes(slate, newRow, { at: newRowPath });
    });
  },
  deleteRow: (editor: YooEditor, blockId: string) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'highest',
      });

      const tableRows = Array.from(tableRowEntries);

      if (tableRows.length === 2) {
        const firstRowElement = tableRows[0][0];
        const isHeadCells = firstRowElement.children.every(
          (cell) => Element.isElement(cell) && cell.type === 'table-head-cell',
        );

        if (isHeadCells) return;
      }

      if (tableRows.length === 1) return;

      const lastRowPath = tableRows[tableRows.length - 1][1];
      Transforms.removeNodes(slate, { at: lastRowPath });
    });
  },
};

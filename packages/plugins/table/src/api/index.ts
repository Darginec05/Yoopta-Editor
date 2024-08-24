import { Elements, findSlateBySelectionPath, generateId, SlateElement, YooEditor } from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';

type Options = {
  path?: Path;
  element?: SlateElement;
};

type InsertTableOptions = {
  rows: number;
  columns: number;
};

export const TABLE_API = {
  insertTable: (editor: YooEditor, options: InsertTableOptions) => {
    const slate = findSlateBySelectionPath(editor);
    if (!slate) return;

    const { rows, columns } = options;

    const table: SlateElement = {
      id: generateId(),
      type: 'table',
      children: [
        { id: generateId(), type: 'table-head', children: [] },
        { id: generateId(), type: 'tbody', children: [] },
      ],
    };

    for (let i = 0; i < rows; i++) {
      const row: SlateElement = {
        id: generateId(),
        type: 'table-row',
        children: [],
      };

      for (let j = 0; j < columns; j++) {
        const cell: SlateElement = {
          id: generateId(),
          type: 'table-data-cell',
          children: [{ text: '' }],
        };

        row.children.push(cell);
      }

      table.children[1].children.push(row);
    }

    Transforms.insertNodes(slate, table, { at: [0] });
  },
  insertRow: (editor: YooEditor, blockId: string, options?: Options) => {
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
      const newRowPath = options?.path || Path.next(lastRowPath);

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
  deleteRow: (editor: YooEditor, blockId: string, options?: Options) => {
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

      let path;

      if (options && Path.isPath(options?.path)) {
        path = options.path;
      }

      if (options?.element) {
        path = Elements.getElementPath(editor, blockId, options.element);
      }

      // if (options?.path === 'before') {
      // }

      // if (options?.path === 'after') {
      // }

      if (!path) {
        path = tableRows[tableRows.length - 1][1];
      }

      Transforms.removeNodes(slate, { at: path, match: (n) => Element.isElement(n) && n.type === 'table-row' });
    });
  },
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
  deleteColumn: (editor: YooEditor, blockId: string, { index }) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      const dataCellPaths = Array.from(tableRowEntries).map(([row, path]) => {
        return row.children[index] ? [...path, index] : null;
      });

      dataCellPaths.forEach((path) => {
        if (path) {
          Transforms.removeNodes(slate, { at: path });
        }
      });
    });
  },
};

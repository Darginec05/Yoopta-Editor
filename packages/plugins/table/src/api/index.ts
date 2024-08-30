import { Elements, findSlateBySelectionPath, generateId, SlateElement, YooEditor } from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';
import { TableCellElement, TableElement, TableRowElement } from '../types';

type Options = {
  path?: Path;
  element?: SlateElement;
};

type InsertTableOptions = {
  rows: number;
  columns: number;
  headerColumn?: boolean;
  headerRow?: boolean;
};

type MoveTableOptions = {
  from: Path;
  to: Path;
};

export const TableTransforms = {
  insertTable: (editor: YooEditor, options: InsertTableOptions) => {
    const slate = findSlateBySelectionPath(editor);
    if (!slate) return;

    const { rows, columns } = options;

    const table: TableElement = {
      id: generateId(),
      type: 'table',
      children: [],
      props: {
        headerColumn: !!options.headerColumn,
        headerRow: !!options.headerColumn,
      },
    };

    for (let i = 0; i < rows; i++) {
      const row: TableRowElement = {
        id: generateId(),
        type: 'table-row',
        children: [],
      };

      for (let j = 0; j < columns; j++) {
        const cell: TableCellElement = {
          id: generateId(),
          type: 'table-data-cell',
          children: [{ text: '' }],
        };

        row.children.push(cell);
      }

      table.children.push(row);
    }

    // [TODO] - Add table as block
    Transforms.insertNodes(slate, table, { at: [0] });
  },
  insertRow: (editor: YooEditor, blockId: string, options?: Pick<Options, 'path'>) => {
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

      if (!path) {
        path = tableRows[tableRows.length - 1][1];
      }

      Transforms.removeNodes(slate, { at: path, match: (n) => Element.isElement(n) && n.type === 'table-row' });
    });
  },
  moveRow: (editor: YooEditor, blockId: string, { from, to }: MoveTableOptions) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      Transforms.moveNodes(slate, {
        at: from,
        to: to,
        match: (n) => Element.isElement(n) && n.type === 'table-row',
      });
    });
  },
  moveColumn: (editor: YooEditor, blockId: string, { from, to }: MoveTableOptions) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      Array.from(tableRowEntries).forEach(([tableRowElement, tableRowPath]) => {
        Transforms.moveNodes(slate, {
          at: tableRowPath.concat(from[from.length - 1]),
          to: [...tableRowPath, to[to.length - 1]],
          match: (n) => Element.isElement(n),
        });
      });
    });
  },
  insertColumn: (editor: YooEditor, blockId: string, options?: Pick<Options, 'path'>) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const elementEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'lowest',
      });

      for (const [tableRowEl, tableRowPath] of elementEntries) {
        const newDataCell: TableCellElement = {
          id: generateId(),
          type: 'table-data-cell',
          children: [{ text: '' }],
        };

        const columnInsertIndex = options?.path ? options.path[options.path.length - 1] : tableRowEl.children.length;

        console.log('path ', [...tableRowPath, tableRowEl.children.length]);
        console.log('columnInsertIndex ', columnInsertIndex);
        Transforms.insertNodes(slate, newDataCell, { at: [...tableRowPath, columnInsertIndex] });
      }
    });
  },
  deleteColumn: (editor: YooEditor, blockId: string, options?: Pick<Options, 'path'>) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      const rows = Array.from(tableRowEntries);
      if (rows[0][0].children.length <= 1) return;

      const index = options?.path ? options.path[options.path.length - 1] : 0;
      const dataCellPaths = rows.map(([row, path]) => {
        return row.children[index] ? [...path, index] : null;
      });

      // [TODO] - Check if there are other columns

      dataCellPaths.forEach((path) => {
        if (path) {
          Transforms.removeNodes(slate, { at: path });
        }
      });
    });
  },
};

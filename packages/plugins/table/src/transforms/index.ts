import { Blocks, Elements, findSlateBySelectionPath, generateId, SlateElement, YooEditor } from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { TableCellElement, TableColumn, TableElement, TableElementProps, TableRowElement } from '../types';

type Options = {
  path?: Path;
  select?: boolean;
};

type InsertTableOptions = {
  rows: number;
  columns: number;
  columnWidth?: number;
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

    const { rows, columns, columnWidth, headerColumn, headerRow } = options;
    const tableElementProps = editor.blocks.Table.elements.table.props as TableElementProps;
    const defaultColumnWidth = columnWidth || tableElementProps?.defaultColumnWidth || 200;

    const table: TableElement = {
      id: generateId(),
      type: 'table',
      children: [],
      props: {
        headerColumn: headerColumn,
        headerRow: headerRow,
        columns: Array.from({ length: columns }).map((col, i) => ({
          index: i,
          width: defaultColumnWidth,
        })),
        defaultColumnWidth,
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

    // Blocks.insertBlock(editor, table);

    // Insert the table as block
    return table;
  },
  insertTableRow: (editor: YooEditor, blockId: string, options?: Options) => {
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
      if (options?.select) {
        Transforms.select(slate, [...newRowPath, 0]);
      }
    });
  },
  deleteTableRow: (editor: YooEditor, blockId: string, options?: Options) => {
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

      if (!path) {
        path = tableRows[tableRows.length - 1][1];
      }

      Transforms.removeNodes(slate, { at: path, match: (n) => Element.isElement(n) && n.type === 'table-row' });
    });
  },
  moveTableRow: (editor: YooEditor, blockId: string, { from, to }: MoveTableOptions) => {
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
  moveTableColumn: (editor: YooEditor, blockId: string, { from, to }: MoveTableOptions) => {
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
  insertTableColumn: (editor: YooEditor, blockId: string, options?: Options) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const elementEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'lowest',
      });

      const tableElement = Elements.getElement(editor, blockId, { type: 'table', path: [0] }) as TableElement;
      const columns: TableColumn[] = tableElement.props?.columns ? structuredClone(tableElement.props?.columns) : [];
      const columnInsertIndex = options?.path ? options.path[options.path.length - 1] : columns.length;

      for (const [, tableRowPath] of elementEntries) {
        const newDataCell: TableCellElement = {
          id: generateId(),
          type: 'table-data-cell',
          children: [{ text: '' }],
        };

        Transforms.insertNodes(slate, newDataCell, { at: [...tableRowPath, columnInsertIndex] });
      }

      columns.splice(columnInsertIndex, 0, {
        index: columnInsertIndex,
        width: tableElement.props?.defaultColumnWidth || 200,
      });

      columns.forEach((column, index) => (column.index = index));

      Elements.updateElement(editor, blockId, {
        props: { columns },
        type: 'table',
      });

      if (options?.select) {
        Transforms.select(slate, [0, 0, columnInsertIndex, 0]);
      }
    });
  },
  deleteTableColumn: (editor: YooEditor, blockId: string, options?: Options) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      const tableElement = Elements.getElement(editor, blockId, { type: 'table', path: [0] }) as TableElement;
      const columns: TableColumn[] = tableElement.props?.columns ? structuredClone(tableElement.props?.columns) : [];

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

      columns.splice(index, 1);
      columns.forEach((column, index) => (column.index = index));

      Elements.updateElement(editor, blockId, {
        props: { columns },
        type: 'table',
      });
    });
  },
  updateColumnWidth: (editor: YooEditor, blockId: string, columnIndex: number, width: number) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableDataCellsPerColumn = Editor.nodes<TableCellElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
        mode: 'all',
      });

      Array.from(tableDataCellsPerColumn).forEach(([cell, path]) => {
        if (path[path.length - 1] === columnIndex) {
          Transforms.setNodes(
            slate,
            { props: { ...cell.props, width } },
            {
              at: path,
              match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
            },
          );
        }
      });
    });
  },
  toggleHeaderRow: (editor: YooEditor, blockId: string) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const firstTableRowChildren = Editor.nodes<SlateElement>(slate, {
        at: [0, 0],
        match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
        mode: 'all',
      });

      Array.from(firstTableRowChildren).forEach(([cell, path]) => {
        Transforms.setNodes(
          slate,
          { props: { ...cell.props, asHeader: !cell.props.asHeader } },
          {
            at: path,
            match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
          },
        );
      });
    });
  },
  toggleHeaderColumn: (editor: YooEditor, blockId: string) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const tableRows = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      Array.from(tableRows).forEach(([row, path]) => {
        const cell = row.children[0] as TableCellElement;
        const isFirstCell = path[path.length - 1] === 0;

        // if (isFirstCell && cell.props?.asHeader) {
        // } else {
        Transforms.setNodes(
          slate,
          { props: { ...cell.props, asHeader: !cell.props?.asHeader } },
          {
            at: path.concat(0),
            match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
          },
        );
        // }
      });
    });
  },
};

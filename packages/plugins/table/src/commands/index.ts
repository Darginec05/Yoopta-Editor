import {
  Blocks,
  buildBlockData,
  Elements,
  findSlateBySelectionPath,
  generateId,
  SlateElement,
  YooEditor,
} from '@yoopta/editor';
import { Editor, Element, Path, Span, Transforms } from 'slate';
import { InsertTableOptions, TableCellElement, TableElement, TableOptions, TableRowElement } from '../types';

type Options = {
  path?: Location | Span;
  select?: boolean;
  insertMode?: 'before' | 'after';
};

type DeleteOptions = Omit<Options, 'insertMode' | 'select'>;

type MoveTableOptions = {
  from: Path;
  to: Path;
};

type InsertOptions = Partial<
  InsertTableOptions & {
    at: number;
  }
>;

export const TableCommands = {
  insertTable: (editor: YooEditor, options?: InsertOptions) => {
    const slate = findSlateBySelectionPath(editor);
    if (!slate) return;

    const tablePluginOptions = editor.plugins.Table.options as TableOptions;

    const {
      rows = (tablePluginOptions.rows || 3) as number,
      columns = (tablePluginOptions.columns || 3) as number,
      columnWidth = (tablePluginOptions.columnWidth || 200) as number,
      headerColumn = tablePluginOptions.headerColumn,
      headerRow = tablePluginOptions.headerRow,
    } = options || {};

    const table: TableElement = {
      id: generateId(),
      type: 'table',
      children: [],
      props: {
        headerColumn: headerColumn,
        headerRow: headerRow,
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
          props: {
            width: columnWidth || 200,
            asHeader: i === 0 ? !!headerRow : false,
          },
        };

        row.children.push(cell);
      }

      table.children.push(row);
    }

    const insertBlockOptions = typeof options?.at === 'number' ? { at: [options.at] } : {};
    Blocks.insertBlock(editor, buildBlockData({ value: [table], type: 'Table' }), insertBlockOptions);
  },
  deleteTable: (editor: YooEditor, blockId: string) => {
    editor.deleteBlock({ blockId });
  },
  insertTableRow: (editor: YooEditor, blockId: string, options?: Options) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const { insertMode = 'after', path = slate.selection, select = true } = options || {};

      const currentRowElementEntryByPath = Elements.getElementEntry(editor, blockId, {
        path,
        type: 'table-row',
      });

      if (!currentRowElementEntryByPath) return;

      const [currentRowElement, currentRowPath] = currentRowElementEntryByPath;
      const insertPath = insertMode === 'before' ? currentRowPath : Path.next(currentRowPath);

      console.log('currentRowElement', currentRowElement);
      console.log('insertPath', insertPath);

      const newRow: SlateElement = {
        id: generateId(),
        type: 'table-row',
        children: currentRowElement.children.map((cell) => {
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

      Transforms.insertNodes(slate, newRow, { at: insertPath });
      if (select) {
        Transforms.select(slate, [...insertPath, 0]);
      }
    });
  },
  deleteTableRow: (editor: YooEditor, blockId: string, options?: DeleteOptions) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const { path = slate.selection } = options || {};

      const currentRowElementEntryByPath = Elements.getElementEntry(editor, blockId, {
        path,
        type: 'table-row',
      });

      if (!currentRowElementEntryByPath) return;

      const [_, currentRowPath] = currentRowElementEntryByPath;

      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'highest',
      });

      const tableRows = Array.from(tableRowEntries);
      if (tableRows.length === 1) return;

      Transforms.removeNodes(slate, {
        at: currentRowPath,
        match: (n) => Element.isElement(n) && n.type === 'table-row',
      });
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
      const { insertMode = 'after', path = slate.selection, select = true } = options || {};

      const dataCellElementEntryByPath = Elements.getElementEntry(editor, blockId, {
        path,
        type: 'table-data-cell',
      });

      if (!dataCellElementEntryByPath) return;

      const [_, dataCellPath] = dataCellElementEntryByPath;
      const columnIndex = dataCellPath[dataCellPath.length - 1];
      const columnInsertIndex =
        insertMode === 'before' ? columnIndex : Path.next(dataCellPath)[dataCellPath.length - 1];

      const elementEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'lowest',
      });

      for (const [, tableRowPath] of elementEntries) {
        const newDataCell: TableCellElement = {
          id: generateId(),
          type: 'table-data-cell',
          children: [{ text: '' }],
        };

        Transforms.insertNodes(slate, newDataCell, { at: [...tableRowPath, columnInsertIndex] });
      }

      if (select) {
        Transforms.select(slate, [0, 0, columnInsertIndex, 0]);
      }
    });
  },
  deleteTableColumn: (editor: YooEditor, blockId: string, options?: DeleteOptions) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const { path = slate.selection } = options || {};

      const tableRowEntries = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      const rows = Array.from(tableRowEntries);
      if (rows[0][0].children.length <= 1) return;

      const dataCellElementEntryByPath = Elements.getElementEntry(editor, blockId, {
        path,
        type: 'table-data-cell',
      });

      if (!dataCellElementEntryByPath) return;

      const [_, dataCellPath] = dataCellElementEntryByPath;
      const columnIndex = dataCellPath[dataCellPath.length - 1];

      const dataCellPaths = rows.map(([row, path]) => {
        return row.children[columnIndex] ? [...path, columnIndex] : null;
      });

      // [TODO] - Check if there are other columns
      dataCellPaths.forEach((path) => {
        if (path) {
          Transforms.removeNodes(slate, { at: path });
        }
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
      const table = Elements.getElement(editor, blockId, { type: 'table', path: [0] });
      const headerRow = table?.props?.headerRow || false;

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

      Transforms.setNodes(
        slate,
        { props: { ...table?.props, headerRow: !headerRow } },
        {
          at: [0],
          match: (n) => Element.isElement(n) && n.type === 'table',
        },
      );
    });
  },
  toggleHeaderColumn: (editor: YooEditor, blockId: string) => {
    const slate = editor.blockEditorsMap[blockId];
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      const table = Elements.getElement(editor, blockId, { type: 'table', path: [0] });
      const headerColumn = table?.props?.headerColumn || false;

      const tableRows = Editor.nodes<SlateElement>(slate, {
        at: [0],
        match: (n) => Element.isElement(n) && n.type === 'table-row',
        mode: 'all',
      });

      Array.from(tableRows).forEach(([row, path]) => {
        const cell = row.children[0] as TableCellElement;
        const isFirstCell = path[path.length - 1] === 0;

        if (isFirstCell) {
          console.log('cell', cell);
        }

        Transforms.setNodes(
          slate,
          { props: { ...cell.props, asHeader: !cell.props?.asHeader } },
          {
            at: path.concat(0),
            match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
          },
        );
      });

      Transforms.setNodes(
        slate,
        { props: { ...table?.props, headerColumn: !headerColumn } },
        {
          at: [0],
          match: (n) => Element.isElement(n) && n.type === 'table',
        },
      );
    });
  },
};

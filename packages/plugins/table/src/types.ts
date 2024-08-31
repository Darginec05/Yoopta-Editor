import { SlateElement } from '@yoopta/editor';

export type TablePluginElementKeys = 'table' | 'table-row' | 'table-data-cell';

export type TableColumn = {
  id: string;
  width: number;
};

export type TableElementProps = {
  headerRow?: boolean;
  headerColumn?: boolean;
  columns?: TableColumn[];
};

export type TableCellProps = {
  header?: boolean;
  width?: number;
};

export type TableElement = SlateElement<'table', TableElementProps>;
export type TableCellElement = SlateElement<'table-data-cell', TableCellProps>;
export type TableRowElement = SlateElement;

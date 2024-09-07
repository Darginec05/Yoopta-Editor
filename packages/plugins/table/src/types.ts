import { SlateElement } from '@yoopta/editor';

export type TablePluginElementKeys = 'table' | 'table-row' | 'table-data-cell';

export type TableColumn = {
  index: number;
  width: number;
};

export type TableDataCellElementProps = {
  width: number;
  asHeader: boolean;
};

export type TableElementProps = {
  headerRow?: boolean;
  headerColumn?: boolean;
};

export type TableElement = SlateElement<'table', TableElementProps>;
export type TableCellElement = SlateElement<'table-data-cell', TableDataCellElementProps>;
export type TableRowElement = SlateElement;

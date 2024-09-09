import { TableElement, TableRowElement, TableCellElement } from './types';
import './styles.css';
import { Table } from './plugin/Table';
export { TableCommands } from './commands';

declare module 'slate' {
  interface CustomTypes {
    Element: TableElement | TableRowElement | TableCellElement;
  }
}

export default Table;

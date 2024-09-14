import { TableElement, TableRowElement, TableCellElement } from './types';
import './styles.css';
import { Table } from './plugin/Table';

declare module 'slate' {
  interface CustomTypes {
    Element: TableElement | TableRowElement | TableCellElement;
  }
}

export { TableCommands } from './commands';

export default Table;

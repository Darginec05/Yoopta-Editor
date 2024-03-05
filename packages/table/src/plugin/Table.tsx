import { YooptaPlugin } from '@yoopta/editor';
import { TableRender } from '../components/Table';
import { TableCellRender } from '../components/TableCell';
import { TableRowRender } from '../components/TableRow';

export const Table = new YooptaPlugin({
  type: 'Table',
  elements: {
    table: {
      render: TableRender,
      asRoot: true,
      children: ['table-row'],
    },
    'table-row': {
      render: TableRowRender,
      children: ['table-cell'],
    },
    'table-cell': {
      render: TableCellRender,
    },
  },
});

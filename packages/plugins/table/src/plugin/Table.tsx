import { YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { TableElementMap, TableOptions } from '../types';
import { TableCommands } from '../commands';
import { TableIcon } from 'lucide-react';

import { withTable } from '../extenstions/withTable';
import { onKeyDown } from '../events/onKeyDown';

// [TODO] - exports TableElementMap [in every plugin]
const Table = new YooptaPlugin<TableElementMap, TableOptions>({
  type: 'Table',
  elements: {
    table: {
      render: TableRender,
      asRoot: true,
      children: ['table-row'],
      props: {
        headerRow: false,
        headerColumn: false,
      },
    },
    'table-row': {
      render: TableRow,
      children: ['table-data-cell'],
    },
    'table-data-cell': {
      render: TableDataCell,
      props: {
        asHeader: false,
        width: 200,
      },
    },
  },
  events: { onKeyDown },
  extensions: withTable,
  // parsers: {
  //   html: {
  //     serialize: (element, text, meta) => {
  //       console.log('serialize table', element);

  //       return `<table></table>`;
  //     },
  //     deserialize: (editor, element, children) => {
  //       console.log('deserialize table', element);
  //     },
  //   },
  // },
  options: {
    columnWidth: 200,
    rows: 3,
    columns: 3,
    headerRow: true,
    headerColumn: true,
    display: {
      title: 'Table',
      description: 'Add simple table',
      icon: TableIcon,
    },
  },
  commands: TableCommands,
});

export { Table };

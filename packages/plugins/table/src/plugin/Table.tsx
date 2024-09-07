import { YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { TablePluginElementKeys } from '../types';
import { TableTransforms } from '../transforms';

import { withTable } from '../extenstions/withTable';
import { onKeyDown } from '../events/onKeyDown';

const Table = new YooptaPlugin<TablePluginElementKeys, any>({
  type: 'Table',
  defineInitialStructure(editor) {
    return {
      type: 'table',
      children: [
        {
          type: 'table-row',
          children: [{ type: 'table-data-cell' }, { type: 'table-data-cell' }],
        },
        {
          type: 'table-row',
          children: [{ type: 'table-data-cell' }, { type: 'table-data-cell' }],
        },
        {
          type: 'table-row',
          children: [{ type: 'table-data-cell' }, { type: 'table-data-cell' }],
        },
      ],
    };
  },
  elements: {
    table: {
      render: TableRender,
      asRoot: true,
      children: ['table-row'],
      props: {
        nodeType: 'block',
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
        width: 200,
        asHeader: false,
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
  commands: TableTransforms,
});

export { Table };

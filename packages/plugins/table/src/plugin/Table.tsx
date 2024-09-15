import { YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { TableElementMap } from '../types';
import { TableCommands } from '../commands';
import { TableIcon } from 'lucide-react';

import { withTable } from '../extenstions/withTable';
import { onKeyDown } from '../events/onKeyDown';
import { TABLE_SLATE_TO_SELECTION_SET } from '../utils/weakMaps';
import { deserializeTable } from '../parsers/html/deserialize';
import { serializeTable } from '../parsers/html/serialize';

const Table = new YooptaPlugin<TableElementMap>({
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
  events: {
    onKeyDown,
    onBlur: (editor, slate) => () => {
      TABLE_SLATE_TO_SELECTION_SET.delete(slate);
    },
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['TABLE'],
        parse: deserializeTable,
      },
      serialize: serializeTable,
    },
  },
  extensions: withTable,
  options: {
    display: {
      title: 'Table',
      description: 'Add simple table',
      icon: TableIcon,
    },
  },
  commands: TableCommands,
});

export { Table };
